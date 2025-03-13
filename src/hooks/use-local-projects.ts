'use client'

import { Project } from '@prisma/client'
import { useState, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'free_user_projects'

export function useLocalProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  // 載入本地存儲的專案
  useEffect(() => {
    const savedProjects = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  // 保存專案到本地存儲
  const saveProject = (
    project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newProject = {
      ...project,
      id: `local_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setProjects((prev) => {
      const updated = [...prev, newProject]
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  // 刪除本地專案
  const deleteProject = (id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  // 更新本地專案
  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
      )
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  // 當用戶註冊時，遷移本地專案到資料庫
  const migrateProjectsToDatabase = async (userId: string) => {
    try {
      const response = await fetch('/api/projects/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projects: projects,
          userId: userId,
        }),
      })

      if (response.ok) {
        // 清除本地存儲
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        setProjects([])
        return true
      }
      return false
    } catch (error) {
      console.error('Error migrating projects:', error)
      return false
    }
  }

  return {
    projects,
    saveProject,
    deleteProject,
    updateProject,
    migrateProjectsToDatabase,
  }
}
