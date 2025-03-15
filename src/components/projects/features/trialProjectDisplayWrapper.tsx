import { FreeProjectDisplay } from '@/components/projects/features/TrialProjectDisplay'

export default function TrialProjectDisplayWrapper() {
  return (
    <FreeProjectDisplay
      projects={[]}
      title="試用版專案列表"
      description="這裡是您的試用版專案，功能受限但可以體驗基本操作"
      url="trial-projects"
      userTier="free"
      showAddButton={false}
    />
  )
}
