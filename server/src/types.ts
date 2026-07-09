export type UtopiaThemeId = 'function' | 'material' | 'atmosphere' | 'furniture' | 'nature'

export type MaterialId = 'oak-wood' | 'andesite-pebble' | 'sphere' | 'linen-fabric' | 'paper-lantern'

export type MaterialCategoryId = 'material' | 'nature' | 'form' | 'texture' | 'other'

export type MaterialMetadata = {
  id: MaterialId
  name: string
  category: MaterialCategoryId
  imageUrl: string
  keywords: string[]
  spaceImpression: string[]
  typicalApplications: string[]
  description: string
}

export type UtopiaThemeAssignments = Partial<Record<UtopiaThemeId, MaterialId>>

export type GenerateUtopiaImageRequest = {
  baseImageDataUrl: string
  promptText: string
  assignments: UtopiaThemeAssignments
  materialsSnapshot: MaterialMetadata[]
}

export type GenerateUtopiaImageResponse = {
  imageUrl?: string
  imageDataUrl?: string
  promptText: string
  providerRequestId?: string
  debug?: {
    provider: string
    model: string
    promptLength: number
    selectedMaterialCount: number
    baseImageMimeType?: string
  }
}

export type ApiErrorResponse = {
  error: string
}
