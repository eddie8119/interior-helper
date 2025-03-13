import { ProjectDisplay } from '@/components/projects/shared/ProjectDisplay'

export default function TrialProjectDisplayWrapper() {
  return (
    <ProjectDisplay
      projects={[]}
      title="試用版專案列表"
      description="這裡是您的試用版專案，功能受限但可以體驗基本操作"
      url="trial-projects"
      userTier="free"
      showAddButton={false}
    />
  )
}
