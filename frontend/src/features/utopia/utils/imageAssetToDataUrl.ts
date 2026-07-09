function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }

      reject(new Error('Image asset conversion did not produce a data URL.'))
    })

    reader.addEventListener('error', () => {
      reject(new Error('Unable to read image asset as a data URL.'))
    })

    reader.readAsDataURL(blob)
  })
}

export async function imageAssetToDataUrl(imageUrl: string): Promise<string> {
  if (!imageUrl) {
    throw new Error('Image asset URL is required.')
  }

  try {
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw new Error(`Image asset request failed with status ${response.status}.`)
    }

    const blob = await response.blob()

    if (!blob.type.startsWith('image/')) {
      throw new Error(`Expected an image asset, received ${blob.type || 'unknown content type'}.`)
    }

    return await blobToDataUrl(blob)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to convert image asset to data URL: ${error.message}`)
    }

    throw new Error('Unable to convert image asset to data URL.')
  }
}
