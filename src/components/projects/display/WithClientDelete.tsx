'use client'

import { BaseProjectsDisplay } from './BaseProjectsDisplay'
import { Project } from '@prisma/client'
import { useProjects } from '@/hooks/useProjects'
import { AddProjectDialogClient } from '../features/CreateProjectDialogClient'

interface WithClientDeleteProps {
  projects: Project[]
  url: string
  title?: string
  description?: string
  showAddButton?: boolean
}

export function WithClientDelete(WrappedComponent: typeof BaseProjectsDisplay) {
  return function ClientDeleteProjectsDisplay({
    url,
    title,
    description,
    showAddButton,
  }: WithClientDeleteProps) {
    const { projects, deleteProject } = useProjects()

    const handleDelete = async (id: string) => {
      await deleteProject(id)
    }

    return (
      <WrappedComponent
        projects={projects}
        url={url}
        onDeleteProject={handleDelete}
        title={title}
        description={description}
        showAddButton={showAddButton}
        AddProjectDialog={AddProjectDialogClient}
      />
    )
  }
}
