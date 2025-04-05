import { Project } from '@prisma/client'
import {
  constructionContainer,
  defaultProjects,
} from '@/constants/default-data'

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'projects',
}

// 從本地存儲加載專案
export async function loadProjects(): Promise<Project[]> {
  try {
    const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS)
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects)
      // 將字串日期轉換為 Date 物件
      return parsedProjects.map((project: Project) => ({
        ...project,
        createdAt: new Date(project.createdAt),
      }))
    }
    return defaultProjects
  } catch (error) {
    console.error('Error parsing projects:', error)
    return defaultProjects
  }
}

// 保存專案到本地存儲
export function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
}

// 添加專案
export function addProject(
  projects: Project[],
  project: Omit<Project, 'id' | 'createdAt'>
): Project[] {
  const newProject: Project = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    ...project,
  }
  const updatedProjects = [...projects, newProject]
  saveProjects(updatedProjects)
  return updatedProjects
}

// 刪除專案
export function deleteProject(projects: Project[], id: string): Project[] {
  const updatedProjects = projects.filter((project) => project.id !== id)
  saveProjects(updatedProjects)
  return updatedProjects
}

// 更新專案
export function updateProject(
  projects: Project[],
  id: string,
  updates: Partial<Project>
): Project[] {
  const updatedProjects = projects.map((project) =>
    project.id === id ? { ...project, ...updates } : project
  )
  saveProjects(updatedProjects)
  return updatedProjects
}

// 獲取單個專案
export function getProject(
  projects: Project[],
  id: string
): Project | undefined {
  return projects.find((project) => project.id === id)
}
