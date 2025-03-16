export const PROJECT_LIMITS = {
  trial: {
    maxProjects: 2,
    features: {
      export: false,
      share: false,
      templates: false,
      realTimeCollaboration: false,
      advancedAnalytics: false,
    },
    deleteMethod: 'client',
  },
  free: {
    maxProjects: 3,
    features: {
      export: false,
      share: false,
      templates: false,
      realTimeCollaboration: false,
      advancedAnalytics: false,
    },
    deleteMethod: 'server',
  },
  premium: {
    maxProjects: Infinity,
    features: {
      export: true,
      share: true,
      templates: true,
      realTimeCollaboration: true,
      advancedAnalytics: true,
    },
    deleteMethod: 'server',
  },
} as const

export type UserTier = keyof typeof PROJECT_LIMITS
export type ProjectFeature = keyof typeof PROJECT_LIMITS.free.features
