'use server'

import { prisma } from '@/lib/prisma'
import { ProjectBasic } from '@/types/project'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'


// 獲取當前用戶的所有專案
export async function getProjects() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return { error: 'Unauthorized' }
        }

        const projects = await prisma.project.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                tasks: true
            },
            orderBy: {
                createdAt: 'desc'
            }
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
        if (!session?.user?.id) {
            return { error: 'Unauthorized' }
        }

        const project = await prisma.project.findUnique({
            where: {
                id,
                userId: session.user.id
            },
            include: {
                tasks: true
            }
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
export async function createProject(data: Omit<ProjectBasic, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return { error: 'Unauthorized' }
        }

        const project = await prisma.project.create({
            data: {
                ...data,
                userId: session.user.id,
                containers: data.containers || [],
                team: data.team || []
            }
        })

        revalidatePath('/projects')
        return { data: project }
    } catch (error) {
        console.error('Error creating project:', error)
        return { error: 'Failed to create project' }
    }
}

// 更新專案
export async function updateProject(id: string, data: Partial<ProjectBasic>) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return { error: 'Unauthorized' }
        }

        // 確認專案屬於當前用戶
        const existingProject = await prisma.project.findUnique({
            where: {
                id,
                userId: session.user.id
            }
        })

        if (!existingProject) {
            return { error: 'Project not found or unauthorized' }
        }

        const project = await prisma.project.update({
            where: { id },
            data: {
                ...data,
                containers: data.containers || undefined,
                team: data.team || undefined
            }
        })

        revalidatePath(`/projects/${id}`)
        return { data: project }
    } catch (error) {
        console.error('Error updating project:', error)
        return { error: 'Failed to update project' }
    }
}

// 刪除專案
export async function deleteProject(id: string) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return { error: 'Unauthorized' }
        }

        // 確認專案屬於當前用戶
        const existingProject = await prisma.project.findUnique({
            where: {
                id,
                userId: session.user.id
            }
        })

        if (!existingProject) {
            return { error: 'Project not found or unauthorized' }
        }

        await prisma.project.delete({
            where: { id }
        })

        revalidatePath('/projects')
        return { success: true }
    } catch (error) {
        console.error('Error deleting project:', error)
        return { error: 'Failed to delete project' }
    }
}

// 更新專案進度
export async function updateProjectProgress(id: string, progress: number) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return { error: 'Unauthorized' }
        }

        const project = await prisma.project.update({
            where: {
                id,
                userId: session.user.id
            },
            data: { progress }
        })

        revalidatePath(`/projects/${id}`)
        return { data: project }
    } catch (error) {
        console.error('Error updating project progress:', error)
        return { error: 'Failed to update project progress' }
    }
}

// 更新專案預算
export async function updateProjectBudget(id: string, budgetTotal: number) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return { error: 'Unauthorized' }
        }

        const project = await prisma.project.update({
            where: {
                id,
                userId: session.user.id
            },
            data: { budgetTotal }
        })

        revalidatePath(`/projects/${id}`)
        return { data: project }
    } catch (error) {
        console.error('Error updating project budget:', error)
        return { error: 'Failed to update project budget' }
    }
}