import type { IncomingMessage, ServerResponse } from 'node:http'
import { QwenConfigError, QwenProviderError, generateWithQwen } from '../services/qwenImageClient.js'
import type { ApiErrorResponse, GenerateUtopiaImageRequest, GenerateUtopiaImageResponse } from '../types.js'

const MAX_REQUEST_BYTES = 15 * 1024 * 1024

function sendJson<T>(response: ServerResponse, statusCode: number, body: T) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  })
  response.end(JSON.stringify(body))
}

function getDataUrlMimeType(dataUrl: string) {
  const match = /^data:([^;,]+)[;,]/.exec(dataUrl)
  return match?.[1]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readJsonBody(request: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let rawBody = ''

    request.setEncoding('utf8')

    request.on('data', (chunk: string) => {
      rawBody += chunk

      if (Buffer.byteLength(rawBody, 'utf8') > MAX_REQUEST_BYTES) {
        reject(new Error('Request body is too large.'))
        request.destroy()
      }
    })

    request.on('end', () => {
      try {
        resolve(rawBody ? JSON.parse(rawBody) : {})
      } catch {
        reject(new Error('Request body must be valid JSON.'))
      }
    })

    request.on('error', () => {
      reject(new Error('Unable to read request body.'))
    })
  })
}

function validatePayload(payload: unknown): GenerateUtopiaImageRequest | string {
  if (!isRecord(payload)) {
    return 'Request body must be a JSON object.'
  }

  if (typeof payload.promptText !== 'string' || !payload.promptText.trim()) {
    return 'promptText is required.'
  }

  if (typeof payload.baseImageDataUrl !== 'string' || !payload.baseImageDataUrl.startsWith('data:image/')) {
    return 'baseImageDataUrl must be an image data URL.'
  }

  if (!Array.isArray(payload.materialsSnapshot)) {
    return 'materialsSnapshot must be an array.'
  }

  if (!isRecord(payload.assignments)) {
    return 'assignments must be an object.'
  }

  return payload as GenerateUtopiaImageRequest
}

async function handleMockProvider(
  validatedPayload: GenerateUtopiaImageRequest,
): Promise<GenerateUtopiaImageResponse> {
  return {
    promptText: validatedPayload.promptText,
    providerRequestId: 'mock-utopia-local',
    debug: {
      provider: 'mock',
      model: 'mock',
      promptLength: validatedPayload.promptText.length,
      selectedMaterialCount: validatedPayload.materialsSnapshot.length,
      baseImageMimeType: getDataUrlMimeType(validatedPayload.baseImageDataUrl),
    },
  }
}

async function handleQwenProvider(
  validatedPayload: GenerateUtopiaImageRequest,
): Promise<GenerateUtopiaImageResponse> {
  const result = await generateWithQwen(validatedPayload)

  return {
    imageUrl: result.imageUrl,
    promptText: validatedPayload.promptText,
    providerRequestId: result.providerRequestId,
    debug: {
      provider: 'qwen',
      model: result.model,
      promptLength: validatedPayload.promptText.length,
      selectedMaterialCount: validatedPayload.materialsSnapshot.length,
      baseImageMimeType: getDataUrlMimeType(validatedPayload.baseImageDataUrl),
    },
  }
}

export async function handleGenerateUtopiaImage(request: IncomingMessage, response: ServerResponse) {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {})
    return
  }

  if (request.method !== 'POST') {
    sendJson<ApiErrorResponse>(response, 405, { error: 'Method not allowed. Use POST.' })
    return
  }

  try {
    const payload = await readJsonBody(request)
    const validationResult = validatePayload(payload)

    if (typeof validationResult === 'string') {
      sendJson<ApiErrorResponse>(response, 400, { error: validationResult })
      return
    }

    const provider = process.env.UTOPIA_IMAGE_PROVIDER || 'mock'
    let responseBody: GenerateUtopiaImageResponse

    switch (provider) {
      case 'mock':
        responseBody = await handleMockProvider(validationResult)
        break

      case 'qwen':
        responseBody = await handleQwenProvider(validationResult)
        break

      default:
        sendJson<ApiErrorResponse>(response, 500, {
          error: `Unknown image provider: ${provider}. Set UTOPIA_IMAGE_PROVIDER to "mock" or "qwen".`,
        })
        return
    }

    sendJson(response, 200, responseBody)
  } catch (error) {
    if (error instanceof QwenConfigError) {
      sendJson<ApiErrorResponse>(response, 500, {
        error: `Server configuration error: ${error.message}`,
      })
      return
    }

    if (error instanceof QwenProviderError) {
      sendJson<ApiErrorResponse>(response, 502, {
        error: `Image provider error (${error.code}): ${error.message}`,
      })
      return
    }

    sendJson<ApiErrorResponse>(response, 400, {
      error: error instanceof Error ? error.message : 'Invalid request.',
    })
  }
}
