'use server'

import { Container } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ActionResult } from '@/types'
import { getAuthUserId } from './authActions'

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

// 更新專案容器順序
export async function updateContainersOrder(
  projectId: string,
  updates: Partial<Container>[]
): Promise<ActionResult<Container[]>> {
  try {
    const userId = await getAuthUserId()

    // 使用 transaction 確保所有更新都成功或都失敗
    const updatedContainers = await prisma.$transaction(async (tx) => {
      // 批量更新所有容器
      const updatePromises = updates.map((update) =>
        tx.container.update({
          where: {
            id: update.id,
            projectId, // 確保容器屬於正確的專案
            project: {
              userId,
            },
          },
          data: {
            order: update.order,
          },
        })
      )

      return await Promise.all(updatePromises)
    })

    return { status: 'success', data: updatedContainers }
  } catch (error) {
    console.error('Error updating containers order:', error)
    return { status: 'error', error: 'Failed to update container order' }
  }
}
// 更新容器
export async function updateContainer(
  containerId: string,
  updates: Partial<Container>
): Promise<ActionResult<Container>> {
  try {
    const userId = await getAuthUserId()

    // 更新容器
    const updatedContainer = await prisma.container.update({
      where: {
        id: containerId,
        project: {
          userId,
        },
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
  containerId: string
): Promise<ActionResult<Container>> {
  try {
    const userId = await getAuthUserId()

    // 刪除容器（因為設置了 onDelete: Cascade，相關的 tasks 會自動刪除）
    const deletedContainer = await prisma.container.delete({
      where: {
        id: containerId,
        project: {
          userId,
        },
      },
    })

    return { status: 'success', data: deletedContainer }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Failed to delete container' }
  }
}

// where 索引提供越多越好嗎 ?
// 額外的條件不會提高查詢效率 反而可能讓資料庫做額外的檢查
