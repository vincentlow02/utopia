import type { GenerateUtopiaImageRequest } from '../types.js'

// ---------------------------------------------------------------------------
// Config helpers
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new QwenConfigError(`Missing required environment variable: ${name}`)
  }

  return value
}

function envBoolean(name: string, fallback: boolean): boolean {
  const raw = process.env[name]

  if (raw === undefined || raw === '') {
    return fallback
  }

  return raw === 'true' || raw === '1'
}

// ---------------------------------------------------------------------------
// Error types
// ---------------------------------------------------------------------------

export class QwenConfigError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'QwenConfigError'
  }
}

export class QwenProviderError extends Error {
  readonly code: 'auth' | 'request' | 'response'
  readonly statusCode: number | undefined

  constructor(message: string, code: 'auth' | 'request' | 'response', statusCode?: number) {
    super(message)
    this.name = 'QwenProviderError'
    this.code = code
    this.statusCode = statusCode
  }
}

// ---------------------------------------------------------------------------
// Response types (DashScope multimodal-generation shape)
// ---------------------------------------------------------------------------

type QwenContentItem = {
  image?: string
  text?: string
}

type QwenChoice = {
  message: {
    role: string
    content: QwenContentItem[]
  }
}

type QwenApiResponse = {
  request_id?: string
  output?: {
    choices?: QwenChoice[]
  }
}

// ---------------------------------------------------------------------------
// Public result type
// ---------------------------------------------------------------------------

export type QwenGenerateResult = {
  imageUrl: string
  providerRequestId?: string
  model: string
}

// ---------------------------------------------------------------------------
// Main function
// ---------------------------------------------------------------------------

export async function generateWithQwen(
  payload: GenerateUtopiaImageRequest,
): Promise<QwenGenerateResult> {
  const apiKey = requireEnv('QWEN_API_KEY')
  const apiUrl = requireEnv('QWEN_API_URL')
  const model = process.env.QWEN_IMAGE_MODEL || 'qwen-image-2.0-pro'
  const watermark = envBoolean('QWEN_WATERMARK', false)
  const promptExtend = envBoolean('QWEN_PROMPT_EXTEND', true)

  const requestBody = {
    model,
    input: {
      messages: [
        {
          role: 'user',
          content: [
            { image: payload.baseImageDataUrl },
            { text: payload.promptText },
          ],
        },
      ],
    },
    parameters: {
      n: 1,
      watermark,
      prompt_extend: promptExtend,
    },
  }

  // Do not log apiKey — only log the URL (without query params) and model
  console.log(`[qwen] Calling ${apiUrl} with model=${model}`)

  let httpResponse: Response

  try {
    httpResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    })
  } catch (error) {
    throw new QwenProviderError(
      `Network error calling Qwen API: ${error instanceof Error ? error.message : 'unknown'}`,
      'request',
    )
  }

  // Auth errors
  if (httpResponse.status === 401 || httpResponse.status === 403) {
    throw new QwenProviderError(
      `Qwen API authentication failed (HTTP ${httpResponse.status}). Check QWEN_API_KEY.`,
      'auth',
      httpResponse.status,
    )
  }

  // Request validation errors
  if (httpResponse.status === 400) {
    let detail = ''

    try {
      const errorBody = (await httpResponse.json()) as Record<string, unknown>
      detail = typeof errorBody.message === 'string' ? errorBody.message : JSON.stringify(errorBody)
    } catch {
      detail = await httpResponse.text().catch(() => '')
    }

    throw new QwenProviderError(
      `Qwen API rejected the request (HTTP 400): ${detail}`,
      'request',
      400,
    )
  }

  // Other non-2xx errors
  if (!httpResponse.ok) {
    throw new QwenProviderError(
      `Qwen API returned HTTP ${httpResponse.status}`,
      'response',
      httpResponse.status,
    )
  }

  // Parse response
  let body: QwenApiResponse

  try {
    body = (await httpResponse.json()) as QwenApiResponse
  } catch {
    throw new QwenProviderError('Qwen API returned non-JSON response.', 'response')
  }

  const choices = body.output?.choices

  if (!choices || choices.length === 0) {
    throw new QwenProviderError(
      'Qwen API response has no output choices.',
      'response',
    )
  }

  const contentItems = choices[0].message?.content

  if (!Array.isArray(contentItems)) {
    throw new QwenProviderError(
      'Qwen API response choice has no content array.',
      'response',
    )
  }

  const imageItem = contentItems.find((item) => typeof item.image === 'string')

  if (!imageItem?.image) {
    throw new QwenProviderError(
      'Qwen API response contains no image content item.',
      'response',
    )
  }

  console.log(`[qwen] Success — request_id=${body.request_id ?? 'unknown'}`)

  return {
    imageUrl: imageItem.image,
    providerRequestId: body.request_id,
    model,
  }
}
