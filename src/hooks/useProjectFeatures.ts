import {
  PROJECT_LIMITS,
  UserTier,
} from '../components/projects/constants/projectLimits'

export function useProjectFeatures(userTier: UserTier) {
  return {
    ...PROJECT_LIMITS[userTier].features,
    maxProjects: PROJECT_LIMITS[userTier].maxProjects,
    deleteMethod: PROJECT_LIMITS[userTier].deleteMethod,
  }
}
