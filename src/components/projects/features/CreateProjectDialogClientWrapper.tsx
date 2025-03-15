'use client'

import { useProjects } from '@/hooks/use-projects'
import { CreateProjectInputSchema } from '@/lib/schemas/createProjectSchema'
import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'

export function withClientHook(
  WrappedComponent: typeof BaseCreateProjectDialog
) {
  return function ClientHookProjectDialog() {
    const { addProject } = useProjects()

    const handleSubmit = async (data: CreateProjectInputSchema) => {
      try {
        const now = new Date()
        await addProject({
          ...data,
          startDate: now,
          endDate: now,
          budgetTotal: null,
          costTotal: null,
          progress: 0,
          containers: '[]',
          team: '[]',
          userId: 'local',
          daysLeft: null,
          created: now,
          updated: now,
        })
        return { status: 'success' }
      } catch (error) {
        return { status: 'error', error }
      }
    }

    return <WrappedComponent onSubmit={handleSubmit} />
  }
}
