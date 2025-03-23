'use server'

import { prisma } from '@/lib/prisma'
import { Prisma, Project } from '@prisma/client'
import { Container } from '@/types/project'
import { ActionResult } from '@/types'
import { getAuthUserId } from './authActions'

// 添加容器到專案
export async function createContainer(
  projectId: string,
  data: { type: string }
): Promise<ActionResult<Project>> {
  try {
    const userId = await getAuthUserId()

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    })

    if (!project) {
      return { status: 'error', error: 'Project not found' }
    }

    const projectContainers = project.containers as any[] as Container[]
    const newContainer: Container = {
      id: crypto.randomUUID(),
      type: data.type,
      order: Number(projectContainers.length),
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        containers: [
          ...projectContainers,
          newContainer,
        ] as unknown as Prisma.JsonValue,
      },
    })

    return { status: 'success', data: updatedProject }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Failed to add container' }
  }
}

// 更新容器
export async function updateContainer(
  projectId: string,
  containerId: string,
  updates: Partial<Container>
): Promise<ActionResult<Project>> {
  try {
    const userId = await getAuthUserId()

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    })

    if (!project) {
      return { status: 'error', error: 'Project not found' }
    }

    const projectContainers = project.containers as any[] as Container[]
    const updatedContainers = projectContainers.map((container) =>
      container.id === containerId ? { ...container, ...updates } : container
    )

    const updatedProject = await prisma.project.update({
      where: { id: projectId, userId },
      data: {
        containers: updatedContainers,
      },
    })

    return { status: 'success', data: updatedProject }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Failed to update container' }
  }
}

// 刪除容器
export async function deleteContainer(
  projectId: string,
  containerId: string
): Promise<ActionResult<Project>> {
  try {
    const userId = await getAuthUserId()
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    })

    if (!project) {
      return { status: 'error', error: 'Project not found' }
    }

    const projectContainers = project.containers as any[] as Container[]
    const updatedContainers = projectContainers.filter(
      (container) => container.id !== containerId
    )

    const updatedProject = await prisma.project.update({
      where: { id: projectId, userId },
      data: {
        containers: updatedContainers as unknown as Prisma.JsonValue,
      },
    })
    return { status: 'success', data: updatedProject }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Failed to delete container' }
  }
}
