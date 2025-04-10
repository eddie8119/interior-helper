import { Container, Task } from '@prisma/client'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { MaterialSchema, TaskSchema } from '@/lib/schemas/createTaskSchema'
import { ActionResult } from '@/types/project'

interface UseContainersProps {
  project: {
    id: string
    containers: Container[]
  }
  onUpdateProject: (
    updates: Partial<Container[]>
  ) => Promise<ActionResult<Container[]>>
}

export function useContainers({
  project,
  onUpdateProject,
}: UseContainersProps) {
  const createContainer = useCallback(
    async (data: { type: string }): Promise<ActionResult<Container>> => {
      try {
        const newContainer: Container = {
          id: Math.random().toString(36).substring(2, 15),
          type: data.type,
          order: project.containers.length,
          projectId: project.id,
          sellingPriceTotal: 0,
          costPriceTotal: 0,
          created: new Date(),
          updated: new Date(),
        }

        const updatedContainers = [...project.containers, newContainer]
        const result = await onUpdateProject(updatedContainers)

        if (result.status === 'error') {
          return { status: 'error', error: result.error }
        }

        return { status: 'success', data: newContainer }
      } catch (error) {
        console.error('Error creating container:', error)
        return { status: 'error', error: 'Failed to create container' }
      }
    },
    [project.containers, project.id, onUpdateProject]
  )

  const updateContainers = useCallback(
    async (
      containerId: string,
      updates: Partial<Container>
    ): Promise<ActionResult<Container>> => {
      try {
        const containerIndex = project.containers.findIndex(
          (c) => c.id === containerId
        )

        if (containerIndex === -1) {
          return {
            status: 'error',
            error: 'Container not found',
          }
        }

        const updatedContainer = {
          ...project.containers[containerIndex],
          ...updates,
          updated: new Date(),
        }

        const updatedContainers = [...project.containers]
        updatedContainers[containerIndex] = updatedContainer

        const result = await onUpdateProject(updatedContainers)

        if (result.status === 'error') {
          return { status: 'error', error: result.error }
        }

        return { status: 'success', data: updatedContainer }
      } catch (error) {
        console.error('Error updating container:', error)
        return { status: 'error', error: 'Failed to update container' }
      }
    },
    [project.containers, onUpdateProject]
  )

  const deleteContainer = useCallback(
    async (containerId: string): Promise<ActionResult<Container>> => {
      try {
        const containerToDelete = project.containers.find(
          (c) => c.id === containerId
        )

        if (!containerToDelete) {
          return {
            status: 'error',
            error: 'Container not found',
          }
        }

        const updatedContainers = project.containers.filter(
          (c) => c.id !== containerId
        )

        const result = await onUpdateProject(updatedContainers)

        if (result.status === 'error') {
          return { status: 'error', error: result.error }
        }

        return { status: 'success', data: containerToDelete }
      } catch (error) {
        console.error('Error deleting container:', error)
        return { status: 'error', error: 'Failed to delete container' }
      }
    },
    [project.containers, onUpdateProject]
  )

  return {
    createContainer,
    updateContainers,
    deleteContainer,
  }
}
