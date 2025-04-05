'use client'

import { Project } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { projectStorage } from '@/lib/projectStorage'
import { UserTier } from '../constants/projectLimits'
import { BaseProjectDisplay } from '../shared/BaseProjectDisplay'

interface TrialProjectDisplayProps {
  projects: Project[]
  title?: string
  description?: string
  url: string
  userTier: UserTier
  showAddButton: boolean
  AddProjectDialog?: React.ComponentType
}

export function TrialProjectDisplay({
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
      const result = projectStorage.deleteProject(id)
      if (result.status === 'success') {
        router.refresh()
        toast.success('專案已刪除')
      } else {
        throw new Error(result.error as string)
      }
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
