'use server'

import { prisma } from '@/lib/prisma'
import {
  createProjectInputSchema,
  CreateProjectInputSchema,
} from '@/lib/schemas/createProjectSchema'
import { ActionResult } from '@/types'
import { Project } from '@prisma/client'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import defaultData from '@/constants/default-data.json'
const { constructionContainer } = defaultData

// 獲取當前用戶的所有專案
export async function getProjects(): Promise<ActionResult<Project[]>> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { status: 'success', data: projects }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

// 獲取單個專案詳情
export async function getProject(id: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: 'Unauthorized' }
    }

    const project = await prisma.project.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        tasks: true,
      },
    })

    if (!project) {
      return { error: 'Project not found' }
    }

    return { data: project }
  } catch (error) {
    console.error('Error fetching project:', error)
    return { error: 'Failed to fetch project' }
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

    const session = await auth()
    if (!session?.user?.id) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const project = await prisma.project.create({
      data: {
        title,
        type,
        startDate: null,
        endDate: null,
        budgetTotal: 0,
        costTotal: 0,
        progress: 0,
        daysLeft: null,
        containers: constructionContainer,
        // team: JSON.stringify([]),
        userId: session.user.id,
      },
    })

    return { status: 'success', data: project }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

// 刪除專案
export async function deleteProject(id: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: 'Unauthorized' }
    }

    // 確認專案屬於當前用戶
    const existingProject = await prisma.project.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingProject) {
      return { error: 'Project not found or unauthorized' }
    }

    await prisma.project.delete({
      where: { id },
    })

    revalidatePath('/projects')
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { error: 'Failed to delete project' }
  }
}
