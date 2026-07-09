import { materialsById } from '../data/materials'
import type { MaterialId, UtopiaGenerationPayload, UtopiaGenerationPayloadDebugSummary, UtopiaThemeAssignments } from '../types'

type PrepareUtopiaGenerationPayloadInput = {
  baseImageDataUrl: string
  promptText: string
  assignments: UtopiaThemeAssignments
}

function getAssignedMaterialIds(assignments: UtopiaThemeAssignments) {
  return Object.values(assignments).filter((materialId): materialId is MaterialId => Boolean(materialId))
}

function getDataUrlMimeType(dataUrl: string) {
  const match = /^data:([^;,]+)[;,]/.exec(dataUrl)
  return match?.[1] ?? 'unknown'
}

export function prepareUtopiaGenerationPayload({
  assignments,
  baseImageDataUrl,
  promptText,
}: PrepareUtopiaGenerationPayloadInput): UtopiaGenerationPayload {
  if (!baseImageDataUrl.startsWith('data:image/')) {
    throw new Error('Base image data URL is required before preparing a generation payload.')
  }

  if (!promptText.trim()) {
    throw new Error('Prompt text is required before preparing a generation payload.')
  }

  const materialIds = getAssignedMaterialIds(assignments)
  const materialsSnapshot = Array.from(new Set(materialIds), (materialId) => materialsById[materialId])

  return {
    baseImageDataUrl,
    promptText,
    assignments: { ...assignments },
    materialsSnapshot,
  }
}

export function summarizeUtopiaGenerationPayload(payload: UtopiaGenerationPayload): UtopiaGenerationPayloadDebugSummary {
  return {
    promptLength: payload.promptText.length,
    selectedMaterialCount: getAssignedMaterialIds(payload.assignments).length,
    hasBaseImageDataUrl: payload.baseImageDataUrl.length > 0,
    baseImageMimeType: getDataUrlMimeType(payload.baseImageDataUrl),
  }
}
