import {
  PROJECT_LIMITS,
  ProjectFeature,
  UserTier,
} from '../components/projects/constants/projectLimits'

export function useProjectPermissions(userTier: UserTier) {
  return {
    canCreateProject: (currentCount: number) => {
      const maxProjects = PROJECT_LIMITS[userTier].maxProjects
      return maxProjects === Infinity || currentCount < maxProjects
    },
    canAccessFeature: (feature: ProjectFeature) => {
      return PROJECT_LIMITS[userTier].features[feature]
    },
    isFreeUser: userTier === 'free',
    isPremiumUser: userTier === 'premium',
  }
}
