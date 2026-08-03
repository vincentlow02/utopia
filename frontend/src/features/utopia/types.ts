export type UtopiaThemeId = 'function' | 'material' | 'atmosphere' | 'furniture' | 'nature'

export type UtopiaThemeCardId = 'function' | 'material' | 'mood' | 'furniture' | 'natural'

export type MaterialId = 'oak-wood' | 'andesite-pebble' | 'sphere' | 'linen-fabric' | 'paper-lantern'

export type LibraryCategoryId = 'all' | 'material' | 'nature' | 'form' | 'texture' | 'other'

export type MaterialCategoryId = Exclude<LibraryCategoryId, 'all'>

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

export type UtopiaThemeDefinition = {
  id: UtopiaThemeId
  cardId: UtopiaThemeCardId
  promptRole: string
}

export type UtopiaThemeAssignments = Partial<Record<UtopiaThemeId, MaterialId>>

export type ThemeAssignment = {
  themeId: UtopiaThemeId
  materialId: MaterialId
}

export type PromptBuildResult = {
  promptText: string
  themeSections: Array<{
    themeId: UtopiaThemeId
    materialId: MaterialId
    text: string
  }>
  selectedMaterials: MaterialMetadata[]
}

export type UtopiaGenerationPayload = {
  baseImageDataUrl: string
  promptText: string
  assignments: UtopiaThemeAssignments
  materialsSnapshot: MaterialMetadata[]
}

export type UtopiaGenerationPayloadDebugSummary = {
  promptLength: number
  selectedMaterialCount: number
  hasBaseImageDataUrl: boolean
  baseImageMimeType: string
}

export type UtopiaGenerateImageResponse = {
  imageUrl?: string
  imageDataUrl?: string
  promptText: string
  providerRequestId?: string
  debug?: {
    provider?: string
    model?: string
    promptLength: number
    selectedMaterialCount: number
    baseImageMimeType?: string
  }
}
