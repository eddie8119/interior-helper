'use server'

import { prisma } from '@/lib/prisma'
import {
  createProjectInputSchema,
  CreateProjectInputSchema,
} from '@/lib/schemas/createProjectSchema'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { constructionContainer } from '@/constants/default-data'

// 獲取當前用戶的所有專案
export async function getProjects() {
  try {
    const session = await auth()
    console.log(5555, session)
    if (!session?.user) {
      return null
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
    return { data: projects }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { error: 'Failed to fetch projects' }
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
export async function createProject(data: CreateProjectInputSchema) {
  try {
    const validated = createProjectInputSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    const { title, type } = validated.data

    const session = await auth()
    if (!session?.user?.id) {
      return { error: 'Unauthorized' }
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
        containers: JSON.stringify( constructionContainer),
        team: JSON.stringify([]),
        userId: session.user.id,
      },
    })

    revalidatePath('/projects')
    return { status: 'success', data: project }
  } catch (error) {
    console.error( error)
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
