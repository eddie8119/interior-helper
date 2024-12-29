'use server'

import { ProjectBasic } from '@/types/project'
import {
  defaultProjects,
  constructionContainer,
} from '@/constants/default-data'

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'projects',
}

// 獲取所有專案
function getProjects(): Promise<{
  projects: ProjectBasic[]
  isError: boolean
}> {
  return new Promise((resolve) => {
    try {
      if (typeof window === 'undefined') {
        resolve({ projects: [], isError: false })
      } else {
        const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS)
        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects)
          // 將字串日期轉換為 Date 物件
          const projectsWithDates = parsedProjects.map(
            (project: ProjectBasic) => ({
              ...project,
              createdAt: new Date(project.createdAt),
              editedAt: new Date(project.editedAt),
            })
          )
          resolve({ projects: projectsWithDates, isError: false })
        } else {
          resolve({ projects: defaultProjects, isError: false })
        }
      }
    } catch (error) {
      console.error('Error parsing projects:', error)
      resolve({ projects: defaultProjects, isError: true })
    }
  })
}

// 保存專案到本地存儲
function saveProjects(projects: ProjectBasic[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
}

// 添加專案
function addProject(
  project: Omit<ProjectBasic, 'id' | 'createdAt' | 'editedAt' | 'containers'>
): Promise<ProjectBasic> {
  return new Promise((resolve) => {
    getProjects().then(({ projects }) => {
      const newProject: ProjectBasic = {
        ...project,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        editedAt: new Date(),
        containers: constructionContainer,
      }

      const updatedProjects = [...projects, newProject]
      saveProjects(updatedProjects)
      resolve(newProject)
    })
  })
}

// 更新專案
function updateProject(
  projectId: string,
  updates: Partial<ProjectBasic>
): Promise<void> {
  return new Promise((resolve) => {
    getProjects().then(({ projects }) => {
      const updatedProjects = projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              ...updates,
              editedAt: new Date(),
            }
          : project
      )

      saveProjects(updatedProjects)
      resolve()
    })
  })
}

// 刪除專案
function deleteProject(projectId: string): Promise<void> {
  return new Promise((resolve) => {
    getProjects().then(({ projects }) => {
      const updatedProjects = projects.filter(
        (project) => project.id !== projectId
      )

      saveProjects(updatedProjects)
      resolve()
    })
  })
}

// 獲取單個專案
function getProjectById(projectId: string): Promise<ProjectBasic | null> {
  return new Promise((resolve) => {
    getProjects().then(({ projects }) => {
      resolve(projects.find((project) => project.id === projectId) || null)
    })
  })
}
