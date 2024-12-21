import { useState, useEffect } from 'react'
import { ProjectBasic } from '@/types/project'
import {
  defaultProjects,
  constructionContainer,
} from '@/constants/default-data'

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'projects',
}

export function useProjects() {
  const [projects, setProjects] = useState<ProjectBasic[]>([])

  // 初始化專案
  useEffect(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS)
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects)
        // 將字串日期轉換為 Date 物件
        const projectsWithDates = parsedProjects.map(
          (project: ProjectBasic) => ({
            ...project,
            createdAt: new Date(project.createdAt),
          })
        )
        setProjects(projectsWithDates)
      } catch (error) {
        console.error('Error parsing projects:', error)
        setProjects(defaultProjects)
      }
    } else {
      setProjects(defaultProjects)
    }
  }, [])

  // 保存專案到本地存儲
  const saveProjects = (projects: ProjectBasic[]) => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
    setProjects(projects)
  }

  // 添加專案
  const addProject = (project: Omit<ProjectBasic, 'id' | 'createdAt'>) => {
    const newProject: ProjectBasic = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      containers: constructionContainer,
    }

    const updatedProjects = [...projects, newProject]
    saveProjects(updatedProjects)
    return newProject
  }

  // 更新專案
  const updateProject = (projectId: string, updates: Partial<ProjectBasic>) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? {
            ...project,
            ...updates,
          }
        : project
    )
    saveProjects(updatedProjects)
  }

  // 刪除專案
  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    )
    saveProjects(updatedProjects)
  }

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
  }
}
