import { Project } from '@prisma/client'
import { useState, useEffect } from 'react'
import { defaultProjects } from '@/constants/default-data'

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

  return {
    projects,
    isLoading,
    updateProject,
  }
}
