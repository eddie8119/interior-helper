'use client'

import { Project } from '@prisma/client'
import { FreeProjectDisplay } from '../features/FreeProjectDisplay'
import { PremiumProjectDisplay } from '../features/PremiumProjectDisplay'
import { UserTier } from '../constants/projectLimits'

interface ProjectDisplayProps {
  userTier: UserTier
  projects: Project[]
  title?: string
  description?: string
  url: string
  showAddButton: boolean
  AddProjectDialog?: React.ComponentType
}

export function ProjectDisplay({ userTier, ...props }: ProjectDisplayProps) {
  if (userTier === 'premium') {
    return <PremiumProjectDisplay {...props} userTier={userTier} />
  }

  return <FreeProjectDisplay {...props} userTier={userTier} />
}
