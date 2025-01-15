'use client'

import { useProjects } from '@/hooks/use-projects'
import { BaseProjectsDisplay } from './base-projects-display'

interface WithClientDeleteProps {
  url: string
  title: string
  description?: string
  showAddButton?: boolean
}

export function withClientDelete(WrappedComponent: typeof BaseProjectsDisplay) {
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
      />
    )
  }
}
