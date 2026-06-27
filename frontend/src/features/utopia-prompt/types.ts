export type UtopiaElementKey =
  | 'preference'
  | 'material'
  | 'space'
  | 'relationship'
  | 'atmosphere'

export type UtopiaElements = Record<UtopiaElementKey, string>

export type UtopiaPromptDraft = {
  elements: UtopiaElements
  promptText: string
}

export type UtopiaResult = {
  id: string
  imageUrl: string
  prompt: UtopiaPromptDraft
  createdAt: string
}
