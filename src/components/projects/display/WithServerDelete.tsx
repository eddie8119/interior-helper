'use client'

import { Project } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { deleteProject } from '@/actions/projectActions'
import { AddProjectDialogServer } from '../features/CreateProjectDialogServer'
import { BaseProjectsDisplay } from './BaseProjectsDisplay'

interface WithServerDeleteProps {
  projects: Project[]
  url: string
  title?: string
  description?: string
  showAddButton?: boolean
}

export function WithServerDelete(WrappedComponent: typeof BaseProjectsDisplay) {
  return function ServerDeleteProjectsDisplay({
    projects,
    url,
    title,
    description,
    showAddButton,
  }: WithServerDeleteProps) {
    const router = useRouter()

    const handleDelete = async (id: string) => {
      const result = await deleteProject(id)
      // if (result.status === 'success') {
      //   router.refresh()
      // }
    }

    return (
      <WrappedComponent
        projects={projects}
        url={url}
        onDeleteProject={handleDelete}
        title={title}
        description={description}
        showAddButton={showAddButton}
        AddProjectDialog={AddProjectDialogServer}
      />
    )
  }
}
