'use client'

import { BaseProjectDisplay } from '../shared/BaseProjectDisplay'
import { useProjects } from '@/hooks/use-projects'
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
}

export function TrialProjectDisplay({
  title = '免費版專案列表',
  description = '這裡是您的專案列表，免費版本最多可以創建 3 個專案',
  showAddButton,
  url,
}: TrialProjectDisplayProps) {
  const { projects, deleteProject } = useProjects()

  const handleDelete = async (id: string) => {
    try {
      deleteProject(id)
      toast.success('專案已刪除')
    } catch (error) {
      toast.error('刪除專案時發生錯誤')
    }
  }

  return (
    <BaseProjectDisplay
      projects={projects}
      onDeleteProject={handleDelete}
      title={title}
      description={description}
      showAddButton={showAddButton}
      url={url}
      userTier="free"
    />
  )
}