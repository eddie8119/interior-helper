'use client'

import { useRouter } from 'next/navigation'
import { BaseProjectDisplay } from '../shared/BaseProjectDisplay'
import { toast } from 'react-toastify'
import { Project } from '@prisma/client'
import { UserTier } from '../constants/projectLimits'

interface TrialProjectDisplayProps {
  projects: Project[]
  title?: string
  description?: string
  url: string
  userTier: UserTier
  showAddButton: boolean
  AddProjectDialog?: React.ComponentType
}

export default function TrialProjectDisplay({
  projects,
  title = '試用版專案列表',
  description = '這裡是您的專案列表，試用版本最多可以創建 2 個專案',
  url,
  userTier,
  showAddButton,
  AddProjectDialog,
}: TrialProjectDisplayProps) {
  const router = useRouter()

  const handleDeleteProject = async (id: string) => {
    try {
      router.refresh()
      toast.success('專案已刪除')
    } catch (error) {
      toast.error('刪除專案時發生錯誤')
    }
  }

  return (
    <BaseProjectDisplay
      projects={projects}
      title={title}
      description={description}
      url={url}
      userTier={userTier}
      showAddButton={showAddButton}
      deleteProject={handleDeleteProject}
      AddProjectDialog={AddProjectDialog}
    />
  )
}
