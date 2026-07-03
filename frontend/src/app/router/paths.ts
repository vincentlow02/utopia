export const routes = {
  home: '/',
  utopia: '/utopia',
} as const

export type AppRouteKey = keyof typeof routes
export type AppRoutePath = (typeof routes)[AppRouteKey]
