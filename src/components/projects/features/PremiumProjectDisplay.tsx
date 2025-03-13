'use client'

import { Project } from '@prisma/client'
import { useState } from 'react'
import { deleteProject } from '@/actions/projectActions'
import { toast } from 'react-toastify'
import { BaseProjectDisplay } from '../shared/BaseProjectDisplay'
import { UserTier } from '../constants/projectLimits'

interface PremiumProjectDisplayProps {
  projects: Project[]
  title?: string
  description?: string
  url: string
  userTier: UserTier
  showAddButton?: boolean
  AddProjectDialog?: React.ComponentType
  
}

export function PremiumProjectDisplay({
  projects: initialProjects,
  title = '付費版專案列表',
  description = '這裡是您的所有專案，您可以無限制地創建專案',
  url,
  userTier,
  AddProjectDialog,
  showAddButton,
}: PremiumProjectDisplayProps) {
  const [projects, setProjects] = useState(initialProjects)

  const handleDeleteProject = async (id: string) => {
    try {
      const result = await deleteProject(id)
      if (result.status === 'success') {
        setProjects(prev => prev.filter(p => p.id !== id))
        toast.success('專案已刪除')
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error('刪除專案時發生錯誤')
    }
  }

  return (
    <BaseProjectDisplay
      projects={projects}
      onDeleteProject={handleDeleteProject}
      title={title}
      description={description}
      url={url}
      userTier={userTier}
      AddProjectDialog={AddProjectDialog}
      showAddButton={showAddButton}
    />
  )
}