export const routes = {
  home: '/',
  capture: '/capture',
  promptReview: '/prompt-review',
  result: '/result',
  gallery: '/gallery',
} as const

export type AppRouteKey = keyof typeof routes
export type AppRoutePath = (typeof routes)[AppRouteKey]
