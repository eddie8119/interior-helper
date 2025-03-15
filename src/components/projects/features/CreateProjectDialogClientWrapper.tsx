import { useProjects } from '@/hooks/use-projects'
import { CreateProjectInputSchema } from '@/lib/schemas/createProjectSchema'
import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'

export function CreateProjectDialogClientWrapper(WrappedComponent: typeof BaseCreateProjectDialog) {
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
