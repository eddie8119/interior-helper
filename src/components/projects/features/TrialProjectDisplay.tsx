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
  title,
  description,
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
