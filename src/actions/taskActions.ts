'use server'

import { Task } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import {
  materialSchema,
  MaterialSchema,
  taskSchema,
  TaskSchema,
  moreTaskSchema,
  MoreTaskSchema,
} from '@/lib/schemas/createTaskSchema'
import { ActionResult } from '@/types'
import { getAuthUserId } from './authActions'

// 創建任務
export async function createTask(
  containerId: string,
  data: TaskSchema & Partial<MaterialSchema>,
  constructionType: string
): Promise<ActionResult<Task>> {
  try {
    const {
      title,
      description,
      material,
      amount,
      unit,
      costPrice,
      sellingPrice,
    } = data

    const taskValidation = taskSchema.safeParse(data)

    if (!taskValidation.success) {
      return { status: 'error', error: taskValidation.error.errors }
    }

    // 如果有材料相關資料
    if (material || amount || unit || costPrice || sellingPrice) {
      const materialValidation = materialSchema.safeParse({
        material,
        amount,
        unit,
        costPrice,
        sellingPrice,
      })
      if (!materialValidation.success) {
        return { status: 'error', error: materialValidation.error.errors }
      }
    }

    const task = await prisma.task.create({
      data: {
        title,
        constructionType,
        containerId,
        description,
        material,
        unit,
        amount,
        sellingPrice,
        costPrice,
      },
    })

    return { status: 'success', data: task }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

// 更新任務順序
export async function updateTasksOrder(
  updates: Partial<Task>[]
): Promise<ActionResult<Task[]>> {
  try {
    const userId = await getAuthUserId()

    // 使用 transaction 確保所有更新都成功或都失敗
    const updatedTasks = await prisma.$transaction(async (tx) => {
      // 批量更新所有任務
      const updatePromises = updates.map((update) =>
        tx.task.update({
          where: {
            id: update.id,
            container: {
              project: {
                userId,
              },
            },
          },
          data: {
            constructionType: update.constructionType,
          },
        })
      )

      return await Promise.all(updatePromises)
    })

    return { status: 'success', data: updatedTasks }
  } catch (error) {
    console.error('Error updating tasks order:', error)
    return { status: 'error', error: 'Failed to update tasks order' }
  }
}

// 更新任務
export async function updateTask(
  taskId: string,
  updates: Partial<TaskSchema> &
    Partial<MaterialSchema> &
    Partial<MoreTaskSchema>
): Promise<ActionResult<Task>> {
  try {
    const userId = await getAuthUserId()

    const validationSchema = taskSchema
      .partial()
      .and(materialSchema.partial())
      .and(moreTaskSchema.partial())
    const resultValidation = validationSchema.safeParse(updates)

    if (!resultValidation.success) {
      console.error('Validation error:', resultValidation.error)
      return { status: 'error', error: 'Invalid task data' }
    }

    // 單一原子操作
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
        container: {
          project: {
            userId, // 同時檢查權限
          },
        },
      },
      data: resultValidation.data,
    })
    return { status: 'success', data: updatedTask }
  } catch (error) {
    console.error('Error updating task:', error)
    return { status: 'error', error: 'Failed to update task' }
  }
}

// 刪除任務
export async function deleteTask(taskId: string): Promise<ActionResult<Task>> {
  try {
    const userId = await getAuthUserId()

    // 使用單一查詢同時處理權限和刪除 避免時序問題
    const deletedTask = await prisma.task.delete({
      where: {
        id: taskId,
        container: {
          project: {
            userId,
          },
        },
      },
    })

    return { status: 'success', data: deletedTask }
  } catch (error) {
    console.error('Error deleting task:', error)
    return { status: 'error', error: 'Failed to delete task' }
  }
}

// 獲取當前容器的任務
export async function getContainerTasks(
  containerId: string
): Promise<ActionResult<Task[]>> {
  try {
    const userId = await getAuthUserId()

    const tasks = await prisma.task.findMany({
      where: {
        containerId,
        container: {
          project: {
            userId,
          },
        },
      },
    })

    if (!tasks) {
      return { status: 'error', error: 'Task not found or unauthorized' }
    }
    return { status: 'success', data: tasks }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

// 獲取當前專案的任務
export async function getProjectTasks(
  projectId: string
): Promise<ActionResult<Task[]>> {
  try {
    const userId = await getAuthUserId()

    const tasks = await prisma.task.findMany({
      where: {
        container: {
          projectId,
          project: {
            userId,
          },
        },
      },
    })

    if (!tasks) {
      return { status: 'error', error: 'Task not found or unauthorized' }
    }
    return { status: 'success', data: tasks }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

// 是不是有關連到model User 的 model 都會需要先驗證 userId?
// 並利用userId 做查詢 效率會更快
// 同時實現權限控制和查詢優化

// 原因：
// User ID 通常有索引
// 可以快速過濾掉不相關的數據
// 減少不必要的資料庫查詢
