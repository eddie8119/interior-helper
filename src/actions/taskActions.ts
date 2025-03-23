'use server'

import { prisma } from '@/lib/prisma'
import {
  createTaskInputSchema,
  CreateTaskInputSchema,
} from '@/lib/schemas/createTaskSchema'
import { ActionResult } from '@/types'
import { Task } from '@prisma/client'

// 創建任務
export async function createTask(
  data: CreateTaskInputSchema,
  constructionType: string,
  projectId: string
): Promise<ActionResult<Task>> {
  try {
    const validated = createTaskInputSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    const {
      title,
      content,
      material,
      unit,
      amount,
      budget,
      cost,
      priority,
      dueDate,
    } = validated.data

    const task = await prisma.task.create({
      data: {
        title,
        constructionType,
        projectId,
        content: content || null,
        material: material || null,
        unit: unit || null,
        amount: amount || null,
        budget: budget || null,
        cost: cost || null,
        priority: priority || 'low',
        dueDate: dueDate || null,
      },
    })

    return { status: 'success', data: task }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

// 更新任務
export async function updateTask(
  taskId: string,
  updates: Partial<Task>,
  projectId: string
): Promise<ActionResult<Task>> {
  try {
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId, projectId },
    })

    if (!existingTask) {
      return { status: 'error', error: 'Task not found' }
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId, projectId },
      data: updates,
    })
    return { status: 'success', data: updatedTask }
  } catch (error) {
    console.error('Error updating task:', error)
    return { status: 'error', error: 'Failed to update task' }
  }
}

// 刪除任務
export async function deleteTask(
  taskId: string,
  projectId: string
): Promise<ActionResult<Task>> {
  try {
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId, projectId },
    })

    if (!existingTask) {
      return { status: 'error', error: 'Task not found' }
    }

    await prisma.task.delete({
      where: { id: taskId, projectId },
    })

    return { status: 'success', data: null }
  } catch (error) {
    console.error('Error deleting task:', error)
    return { status: 'error', error: 'Failed to delete task' }
  }
}
