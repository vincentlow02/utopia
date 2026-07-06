import { materialsById } from '../data/materials'
import { themeDefinitionById, utopiaThemeDefinitions } from '../data/themes'
import type { MaterialMetadata, PromptBuildResult, UtopiaThemeAssignments, UtopiaThemeId } from '../types'

const basePromptInstructions = [
  'Transform the base room image into a personalized utopian interior space.',
  'Preserve the room structure, realistic perspective, coherent lighting, and architectural plausibility.',
  'Do not paste objects as stickers; translate the selected physical materials into spatial design qualities.',
] as const

function joinList(items: string[]) {
  if (items.length <= 1) {
    return items[0] ?? ''
  }

  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`
}

function lowerName(material: MaterialMetadata) {
  return material.name.toLowerCase()
}

function buildThemeInstruction(themeId: UtopiaThemeId, material: MaterialMetadata) {
  const materialName = lowerName(material)
  const keywords = joinList(material.keywords)
  const impressions = joinList(material.spaceImpression)
  const applications = joinList(material.typicalApplications)
  const themeRole = themeDefinitionById[themeId].promptRole

  if (themeId === 'material' && material.id === 'andesite-pebble') {
    return 'Use andesite pebble as a natural stone material in the interior, especially for floor edges, wall accents, entry area, or decorative surfaces.'
  }

  if (themeId === 'atmosphere' && material.id === 'andesite-pebble') {
    return 'Create a calm, stable, organic, zen-like atmosphere inspired by andesite pebble.'
  }

  if (themeId === 'furniture' && material.id === 'linen-fabric') {
    return 'Use linen fabric on sofa, cushions, curtains, or soft furniture elements.'
  }

  switch (themeId) {
    case 'function':
      return `Use ${materialName} as inspiration for the room purpose and spatial activities. Suggest use cases connected to ${applications}, while keeping the space coherent and usable.`
    case 'material':
      return `Use ${materialName} as an interior material, applying its ${keywords} qualities to surfaces, finishes, floors, walls, furniture surfaces, and soft furnishings.`
    case 'atmosphere':
      return `Create a ${impressions} atmosphere inspired by ${materialName}, using its ${keywords} qualities to shape the mood, light, and ambience.`
    case 'furniture':
      return `Use ${materialName} to guide furniture and soft furnishing choices, especially ${applications}, while keeping the layout natural and practical.`
    case 'nature':
      return `Introduce natural elements inspired by ${materialName}, translating its ${keywords} qualities into daylight, courtyard feeling, organic texture, and calm natural details.`
    default:
      return themeRole
  }
}

export function buildUtopiaPrompt(assignments: UtopiaThemeAssignments): PromptBuildResult {
  const themeSections = utopiaThemeDefinitions.flatMap((theme) => {
    const materialId = assignments[theme.id]

    if (!materialId) {
      return []
    }

    return [
      {
        themeId: theme.id,
        materialId,
        text: buildThemeInstruction(theme.id, materialsById[materialId]),
      },
    ]
  })

  const selectedMaterials = Array.from(
    new Set(themeSections.map((section) => section.materialId)),
    (materialId) => materialsById[materialId],
  )

  const assignmentPrompt = themeSections.length
    ? themeSections.map((section) => section.text).join(' ')
    : 'No physical materials are selected yet; generate a clean, minimal, calm utopian interior based only on the base room image.'

  return {
    promptText: `${basePromptInstructions.join(' ')} ${assignmentPrompt}`,
    themeSections,
    selectedMaterials,
  }
}
