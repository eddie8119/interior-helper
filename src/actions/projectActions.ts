'use server'

import { prisma } from '@/lib/prisma'
import {
  createProjectInputSchema,
  CreateProjectInputSchema,
} from '@/lib/schemas/createProjectSchema'
import { ActionResult } from '@/types'
import { Project } from '@prisma/client'
import defaultData from '@/constants/default-data.json'
import { getAuthUserId } from './authActions'
const { constructionContainer } = defaultData

// 獲取當前用戶的所有專案
export async function getProjects(): Promise<ActionResult<Project[]>> {
  try {
    const userId = await getAuthUserId()

    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
      include: {
        tasks: true,
      },
      orderBy: {
        created: 'desc',
      },
    })
    return { status: 'success', data: projects }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

// 獲取單個專案詳情
export async function getProject(
  projectId: string
): Promise<ActionResult<Project & { tasks: any[] }>> {
  try {
    const userId = await getAuthUserId()

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
      include: {
        tasks: true,
      },
    })

    if (!project) {
      return { status: 'error', error: 'Project not found' }
    }

    return { status: 'success', data: project }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

// 創建新專案
export async function createProject(
  data: CreateProjectInputSchema
): Promise<ActionResult<Project>> {
  try {
    const validated = createProjectInputSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    const { title, type } = validated.data

    const userId = await getAuthUserId()

    const project = await prisma.project.create({
      data: {
        title,
        type,
        startDate: new Date(),
        endDate: new Date(),
        containers: constructionContainer,
        team: JSON.stringify([]),
        userId,
      },
    })

    return { status: 'success', data: project }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

// 更新專案
export async function updateProject(
  projectId: string,
  updates: Partial<Project>
): Promise<ActionResult<Project>> {
  try {
    const userId = await getAuthUserId()

    const existingProject = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    })

    if (!existingProject) {
      return { status: 'error', error: 'Project not found or unauthorized' }
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updates,
    })

    return { status: 'success', data: updatedProject }
  } catch (error) {
    console.error('Error updating project:', error)
    return { status: 'error', error: 'Failed to update project' }
  }
}

// 刪除專案
export async function deleteProject(projectId: string) {
  try {
    const userId = await getAuthUserId()

    // 確認專案屬於當前用戶
    const existingProject = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    })

    if (!existingProject) {
      return { status: 'error', error: 'Project not found or unauthorized' }
    }

    await prisma.project.delete({
      where: { id: projectId },
    })

    return { status: 'success', data: null }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { status: 'error', error: 'Failed to delete project' }
  }
}
