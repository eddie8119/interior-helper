import { TrialProjectDisplay } from './TrialProjectDisplay'
import { projectStorage } from '@/lib/projectStorage'
import { CreateProjectDialogClient } from './CreateProjectDialogClient'

export default function TrialProjectDisplayWrapper() {
  const projectsResponse = projectStorage.getProjects()
  console.log(projectsResponse)
  if (projectsResponse.status !== 'success') {
    return <div>Error loading projects</div>
  }

  return (
    <TrialProjectDisplay
      projects={projectsResponse.data}
      title="試用版專案列表"
      description="這裡是您的試用版專案，功能受限但可以體驗基本操作"
      url="trial-projects"
      userTier="trial"
      showAddButton={false}
      AddProjectDialog={CreateProjectDialogClient}
    />
  )
}
