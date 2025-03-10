'use server'

import { ProjectBasic } from '@/types/project'
import { defaultProjects } from '@/constants/default-data'

const STORAGE_KEYS = {
  PROJECTS: 'projects',
}

export async function getProjects(): Promise<ProjectBasic[]> {
  try {
    if (typeof window === 'undefined') {
      return defaultProjects
    }

    const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS)
    if (!savedProjects) {
      return defaultProjects
    }

    const parsedProjects = JSON.parse(savedProjects)
    return parsedProjects.map((project: ProjectBasic) => ({
      ...project,
      createdAt: new Date(project.createdAt),
      editedAt: new Date(project.editedAt),
    }))
  } catch (error) {
    console.error('Error getting projects:', error)
    return defaultProjects
  }
}

export async function getProjectById(id: string): Promise<ProjectBasic | null> {
  try {
    const projects = await getProjects()
    const project = projects.find((p) => p.id === id)
    return project || null
  } catch (error) {
    console.error('Error getting project:', error)
    return null
  }
}
