import { useProjects } from '@/hooks/use-projects'
import { CreateProjectInputSchema } from '@/lib/schemas/createProjectSchema'
import { BaseProjectDialog } from './base-project-dialog'

export function withClientHook(WrappedComponent: typeof BaseProjectDialog) {
  return function ClientHookProjectDialog() {
    const { addProject } = useProjects()

    const handleSubmit = async (data: CreateProjectInputSchema) => {
      try {
        await addProject(data)
        return { status: 'success' }
      } catch (error) {
        return { status: 'error', error }
      }
    }

    return <WrappedComponent onSubmit={handleSubmit} />
  }
}
