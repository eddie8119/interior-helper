import { useProjects } from '@/hooks/use-projects'
import { BaseProjectsDisplay } from './base-projects-display'

export function withClientDelete(WrappedComponent: typeof BaseProjectsDisplay) {
  return function ClientDeleteProjectsDisplay(
    props: Omit<Parameters<typeof BaseProjectsDisplay>[0], 'onDeleteProject'>
  ) {
    const { deleteProject } = useProjects()

    const handleDelete = async (id: string) => {
      await deleteProject(id)
    }

    return <WrappedComponent {...props} onDeleteProject={handleDelete} />
  }
}
