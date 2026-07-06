import type { UtopiaThemeCardId, UtopiaThemeDefinition, UtopiaThemeId } from '../types'

export const utopiaThemeDefinitions = [
  {
    id: 'function',
    cardId: 'function',
    promptRole:
      'Interpret the selected material as a cue for spatial use, activities, and the purpose of the room.',
  },
  {
    id: 'material',
    cardId: 'material',
    promptRole:
      'Apply the selected material to interior surfaces, finishes, walls, floors, furniture surfaces, and soft furnishings.',
  },
  {
    id: 'atmosphere',
    cardId: 'mood',
    promptRole:
      'Use the selected material keywords and spatial impressions to define the mood, feeling, light, and ambience.',
  },
  {
    id: 'furniture',
    cardId: 'furniture',
    promptRole:
      'Use the selected material applications to guide furniture types, upholstery, cushions, lamps, tables, shelves, and layout.',
  },
  {
    id: 'nature',
    cardId: 'natural',
    promptRole:
      'Translate the selected material into natural elements such as stone, plants, wood, daylight, courtyard feeling, water, soil, and organic texture.',
  },
] as const satisfies readonly UtopiaThemeDefinition[]

export const themeDefinitionById = Object.fromEntries(
  utopiaThemeDefinitions.map((theme) => [theme.id, theme]),
) as Record<UtopiaThemeId, UtopiaThemeDefinition>

export const themeDefinitionByCardId = Object.fromEntries(
  utopiaThemeDefinitions.map((theme) => [theme.cardId, theme]),
) as Record<UtopiaThemeCardId, UtopiaThemeDefinition>
