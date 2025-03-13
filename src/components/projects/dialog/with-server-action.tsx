'use client'

import { useRouter } from 'next/navigation'
import { createProject } from '@/actions/projectActions'
import { CreateProjectInputSchema } from '@/lib/schemas/createProjectSchema'
import { BaseProjectDialog } from './base-project-dialog'

export function withServerAction(WrappedComponent: typeof BaseProjectDialog) {
  return function ServerActionProjectDialog() {
    const router = useRouter()

    const handleSubmit = async (data: CreateProjectInputSchema) => {
      const result = await createProject(data)
      if (result.status === 'success') {
        router.refresh()
      }
      return result
    }

    return <WrappedComponent onSubmit={handleSubmit} />
  }
}
