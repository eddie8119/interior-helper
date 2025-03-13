'use client'

import { ProjectDisplay } from '@/components/projects/shared/ProjectDisplay'
import { getProjects } from '@/actions/projectActions'
import { AddProjectDialogServer } from '@/components/projects/dialog/add-project-dialog-server'

export default async function PremiumProjectDisplayWrapper() {
  const projectsResponse = await getProjects()
  if (projectsResponse.status !== 'success') {
    return <div>Error loading projects</div>
  }

  return (
    <ProjectDisplay
      projects={projectsResponse.data}
      userTier="premium"
      url="projects"
      title="專案列表"
      description="這裡是您的所有專案，點擊可查看詳細資訊"
      AddProjectDialog={AddProjectDialogServer}
      showAddButton={true}
    />
  )
}
