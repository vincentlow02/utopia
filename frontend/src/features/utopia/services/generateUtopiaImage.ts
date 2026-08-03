import type { UtopiaGenerateImageResponse, UtopiaGenerationPayload } from '../types'

const utopiaApiBaseUrl = import.meta.env.VITE_UTOPIA_API_BASE_URL || ''

export function isUtopiaImageApiConfigured() {
  return utopiaApiBaseUrl.length > 0
}

export async function generateUtopiaImage(payload: UtopiaGenerationPayload): Promise<UtopiaGenerateImageResponse> {
  const response = await fetch(`${utopiaApiBaseUrl}/api/generate-utopia-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const responseBody = (await response.json()) as Partial<UtopiaGenerateImageResponse> & { error?: string }

  if (!response.ok) {
    throw new Error(responseBody.error || `Utopia image generation request failed with status ${response.status}.`)
  }

  if (typeof responseBody.promptText !== 'string') {
    throw new Error('Utopia image generation response is missing promptText.')
  }

  return responseBody as UtopiaGenerateImageResponse
}
