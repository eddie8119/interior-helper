'use server'

import { prisma } from '@/lib/prisma'
import { Container } from '@prisma/client'
import { ActionResult } from '@/types'
import { getAuthUserId } from './authActions'
import defaultData from '@/constants/default-data.json'
const { constructionContainer } = defaultData

// 獲取當前專案的容器
export async function getContainer(
  projectId: string
): Promise<ActionResult<Container[]>> {
  try {
    const userId = await getAuthUserId()

    const containers = await prisma.container.findMany({
      where: {
        projectId,
        project: {
          userId, // JOIN 查詢，效率很高
        },
      },
      include: {
        tasks: true,
      },
    })

    return { status: 'success', data: containers }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Failed to get containers' }
  }
}

// 添加容器到專案
export async function createContainer(
  projectId: string,
  data: { type: string }
): Promise<ActionResult<Container>> {
  try {
    const userId = await getAuthUserId()

    // 驗證專案存在且屬於當前用戶
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    })

    if (!project) {
      return { status: 'error', error: 'Project not found' }
    }

    // 獲取當前專案的容器數量
    const containersCount = await prisma.container.count({
      where: {
        projectId,
      },
    })

    // 創建新容器
    const container = await prisma.container.create({
      data: {
        type: data.type,
        order: containersCount, // 使用現有容器數量作為順序
        projectId,
      },
      include: {
        tasks: true,
      },
    })

    return { status: 'success', data: container }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Failed to create container' }
  }
}

// 更新容器
export async function updateContainer(
  projectId: string,
  containerId: string,
  updates: Partial<Container>
): Promise<ActionResult<Container>> {
  try {
    const userId = await getAuthUserId()

    // 驗證專案存在且屬於當前用戶
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
      include: {
        containers: true,
      },
    })

    if (!project) {
      return { status: 'error', error: 'Project not found' }
    }

    // 更新容器
    const updatedContainer = await prisma.container.update({
      where: {
        id: containerId,
        projectId: project.id, // 確保容器屬於正確的專案
      },
      data: updates,
    })

    return { status: 'success', data: updatedContainer }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Failed to update container' }
  }
}

// 刪除容器
export async function deleteContainer(
  projectId: string,
  containerId: string
): Promise<ActionResult<Container>> {
  try {
    const userId = await getAuthUserId()

    // 驗證專案存在且屬於當前用戶
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    })

    if (!project) {
      return { status: 'error', error: 'Project not found' }
    }

    // 刪除容器（因為設置了 onDelete: Cascade，相關的 tasks 會自動刪除）
    const deletedContainer = await prisma.container.delete({
      where: {
        id: containerId,
        projectId: project.id,
      },
    })

    return { status: 'success', data: deletedContainer }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Failed to delete container' }
  }
}
