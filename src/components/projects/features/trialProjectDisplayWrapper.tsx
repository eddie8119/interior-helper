'use client'

import { TrialProjectDisplay } from './TrialProjectDisplay'
import { projectStorage } from '@/lib/projectStorage'
import { CreateProjectDialogClient } from './CreateProjectDialogClient'

export default function TrialProjectDisplayWrapper() {
  const projectsResponse = projectStorage.getProjects()

  if (projectsResponse.status !== 'success') {
    return <div>Error loading projects</div>
  }

  return (
    <TrialProjectDisplay
      projects={projectsResponse.data}
      title="試用版專案列表"
      description="這裡是您的試用版專案，精選核心功能，讓您先睹為快"
      url="trial-projects"
      userTier="trial"
      showAddButton={true}
      AddProjectDialog={CreateProjectDialogClient}
    />
  )
}
