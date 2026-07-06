import andesitePebbleImageUrl from '../../../assets/images/utopia-library/andesite-pebble.png'
import linenFabricImageUrl from '../../../assets/images/utopia-library/linen-fabric.png'
import oakWoodImageUrl from '../../../assets/images/utopia-library/oak-wood.png'
import paperLanternImageUrl from '../../../assets/images/utopia-library/paper-lantern.png'
import sphereImageUrl from '../../../assets/images/utopia-library/sphere.png'
import type { LibraryCategoryId, MaterialId, MaterialMetadata } from '../types'

export const libraryCategories = ['all', 'material', 'nature', 'form', 'texture', 'other'] as const satisfies readonly LibraryCategoryId[]

export const utopiaMaterials = [
  {
    id: 'oak-wood',
    name: 'Oak Wood',
    category: 'material',
    imageUrl: oakWoodImageUrl,
    keywords: ['natural', 'warm', 'organic'],
    spaceImpression: ['calm', 'comfort', 'minimal'],
    typicalApplications: ['floor', 'furniture', 'wall', 'ceiling'],
    description: 'With distinct grain and warm tones, oak wood is suited for creating natural and calm spaces.',
  },
  {
    id: 'andesite-pebble',
    name: 'Andesite Pebble',
    category: 'nature',
    imageUrl: andesitePebbleImageUrl,
    keywords: ['natural', 'solid', 'organic'],
    spaceImpression: ['calm', 'stable', 'zen'],
    typicalApplications: ['garden', 'furniture', 'entrance', 'decoration'],
    description:
      'With natural roundness and a weighted texture, andesite pebbles are suited for quiet, stable spaces.',
  },
  {
    id: 'sphere',
    name: 'Sphere',
    category: 'form',
    imageUrl: sphereImageUrl,
    keywords: ['round', 'soft', 'balanced'],
    spaceImpression: ['harmony', 'flow', 'friendly'],
    typicalApplications: ['lighting', 'furniture', 'sculpture', 'decoration'],
    description:
      'A rounded form suggests softness, balance, and harmony. When placed in a space, it creates a calm and approachable atmosphere.',
  },
  {
    id: 'linen-fabric',
    name: 'Linen Fabric',
    category: 'texture',
    imageUrl: linenFabricImageUrl,
    keywords: ['natural', 'soft', 'woven'],
    spaceImpression: ['cozy', 'relaxing', 'warm'],
    typicalApplications: ['sofa', 'curtain', 'cushion', 'bedding'],
    description:
      'With a natural woven texture and a soft touch, linen fabric creates a warm, calm, and comfortable space.',
  },
  {
    id: 'paper-lantern',
    name: 'Paper Lantern',
    category: 'other',
    imageUrl: paperLanternImageUrl,
    keywords: ['Japan', 'warm light', 'traditional'],
    spaceImpression: ['soft', 'calm', 'intimate'],
    typicalApplications: ['lighting', 'decoration', 'corner', 'entrance'],
    description:
      'Paper lanterns cast a soft glow through washi paper, creating a quiet and warm space. They add a Japanese impression and a calm atmosphere.',
  },
] as const satisfies readonly MaterialMetadata[]

export const materialsById = utopiaMaterials.reduce(
  (indexedMaterials, material) => {
    indexedMaterials[material.id] = material
    return indexedMaterials
  },
  {} as Record<MaterialId, MaterialMetadata>,
)
