import { Prisma, Project } from '@prisma/client'
import { CreateContainerInputSchema } from '@/lib/schemas/createContainerSchema'
import { Container } from '@/types/project'

export const containerStorage = {
  // 建立容器
  createContainer: (
    data: CreateContainerInputSchema,
    project: Project,
    onUpdateProject: (projectId: string, data: Partial<Project>) => void
  ) => {
    if (!project) return

    const projectContainers = project.containers as any[] as Container[]
    const newContainer: Container = {
      id: data.type,
      type: data.type,
      order: projectContainers.length || 0,
    }

    const updatedContainers = [...projectContainers, newContainer]

    onUpdateProject(project.id, {
      containers: updatedContainers as unknown as Prisma.JsonValue, // 因為prisma中 型別為Json
      updated: new Date(),
    })
  },

  // 更新容器
  updateContainers: (
    containers: Container[],
    project: Project,
    onUpdateProject: (projectId: string, data: Partial<Project>) => void
  ) => {
    if (!project) return

    onUpdateProject(project.id, {
      containers: containers as unknown as Prisma.JsonValue,
      updated: new Date(),
    })
  },

  // 刪除容器
  deleteContainer: (
    containerId: string,
    project: Project,
    onUpdateProject: (projectId: string, data: Partial<Project>) => void
  ) => {
    if (!project) return

    const projectContainers = project.containers as any[] as Container[]
    const updatedContainers = projectContainers.filter(
      (container) => container.id !== containerId
    )

    onUpdateProject(project.id, {
      containers: updatedContainers as unknown as Prisma.JsonValue,
      updated: new Date(),
    })
  },
}
