import { useState, useEffect } from 'react'
import { useProjects } from './use-projects'
import { Container } from '@/types/project'

export function useContainers(projectId?: string) {
  const [containers, setContainers] = useState<Container[]>([])

  // 更新容器順序
  const updateContainerOrder = (newContainers: Container[]) => {
    // 更新 order
    const updatedContainers = newContainers.map((container, index) => ({
      ...container,
      order: index,
    }))
    setContainers(updatedContainers)
  }

  // 刪除容器
  const deleteContainer = (containerId: string) => {
    const updatedContainers = containers.filter(
      (container) => container.id !== containerId
    )
    setContainers(updatedContainers)
  }

  return {
    containers,
    updateContainerOrder,
    deleteContainer,
  }
}
