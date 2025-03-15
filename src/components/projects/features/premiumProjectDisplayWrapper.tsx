'use client'

import { PremiumProjectDisplay } from '@/components/projects/features/PremiumProjectDisplay'
import { getProjects } from '@/actions/projectActions'
import { CreateProjectDialogServer } from '@/components/projects/features/CreateProjectDialogServer'

export default async function PremiumProjectDisplayWrapper() {
  const projectsResponse = await getProjects()
  if (projectsResponse.status !== 'success') {
    return <div>Error loading projects</div>
  }

  return (
    <PremiumProjectDisplay
      projects={projectsResponse.data}
      userTier="premium"
      url="projects"
      title="專案列表"
      description="這裡是您的所有專案，點擊可查看詳細資訊"
      AddProjectDialog={CreateProjectDialogServer}
      showAddButton={true}
    />
  )
}
