import { Container, Project } from '@prisma/client'
import { ProjectWithContainers } from '@/types/project'
interface CreateContainerData {
  type: string
}

export function useContainers(
  project: ProjectWithContainers,
  onUpdateProject: (
    projectId: string,
    data: Partial<ProjectWithContainers>
  ) => void
) {
  // 建立容器
  const createContainer = (data: CreateContainerData) => {
    if (!project) return

    const newContainer: Partial<Container> = {
      id: data.type,
      type: data.type,
      order: project.containers.length,
    }

    const updatedContainers = [...project.containers, newContainer]

    onUpdateProject(project.id, {
      containers: updatedContainers,
    })

    return newContainer
  }

  // 更新容器
  const updateContainers = (containers: Container[]) => {
    if (!project) return

    onUpdateProject(project.id, {
      containers,
    })
  }

  // 刪除容器
  const deleteContainer = (containerId: string) => {
    if (!project) return

    const updatedContainers = project.containers.filter(
      (container) => container.id !== containerId
    )

    onUpdateProject(project.id, {
      containers: updatedContainers,
    })
  }

  return {
    createContainer,
    updateContainers,
    deleteContainer,
  }
}
