'use server'

import { prisma } from '@/lib/prisma'
import {
  CreateProjectSchema,
  createProjectSchema,
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
export async function createProject(data: CreateProjectSchema) {
  try {
    const validated = createProjectSchema.safeParse(data)

    if (!validated.success) return
    const { title, type } = validated.data

    const session = await auth()
    if (!session?.user) {
      return { error: 'Unauthorized' }
    }

    const project = await prisma.project.create({
      data: {
        title,
        type,
        userId: session.user.id,
        containers: JSON.stringify(constructionContainer),
        team: JSON.stringify([]),
      },
    })

    revalidatePath('/projects')
    return { data: project }
  } catch (error) {
    console.error('Error creating project:', error)
    return { error: 'Failed to create project' }
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
