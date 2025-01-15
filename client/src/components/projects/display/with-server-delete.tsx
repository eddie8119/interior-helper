import { useRouter } from 'next/navigation'
import { deleteProject } from '@/actions/projectActions'
import { BaseProjectsDisplay } from './base-projects-display'

export function withServerDelete(WrappedComponent: typeof BaseProjectsDisplay) {
  return function ServerDeleteProjectsDisplay(
    props: Omit<Parameters<typeof BaseProjectsDisplay>[0], 'onDeleteProject'>
  ) {
    const router = useRouter()

    const handleDelete = async (id: string) => {
      const result = await deleteProject(id)
      router.refresh()
    }

    return <WrappedComponent {...props} onDeleteProject={handleDelete} />
  }
}
