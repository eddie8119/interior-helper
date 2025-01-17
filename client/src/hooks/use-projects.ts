import { useState, useEffect } from 'react'
import { Project } from '@prisma/client'
import { defaultProjects } from '@/constants/default-data'
import defaultData from '@/constants/default-data.json'
const { constructionContainer } = defaultData

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'projects',
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // 初始化專案
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS)
        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects)
          // 將字串日期轉換為 Date 物件
          const projectsWithDates = parsedProjects.map((project: Project) => ({
            ...project,
            createdAt: new Date(project.createdAt),
          }))
          setProjects(projectsWithDates)
        } else {
          setProjects(defaultProjects)
        }
      } catch (error) {
        console.error('Error parsing projects:', error)
        setProjects(defaultProjects)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  // 保存專案到本地存儲
  const saveProjects = (projects: Project[]) => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
    setProjects(projects)
  }

  // 添加專案
  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      containers: constructionContainer,
    }

    const updatedProjects = [...projects, newProject]
    saveProjects(updatedProjects)
  }

  // 更新專案
  const updateProject = (projectId: string, updates: Partial<Project>) => {
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
    isLoading,
    addProject,
    updateProject,
    deleteProject,
  }
}
