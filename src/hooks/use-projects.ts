'use client'

import { useState, useEffect } from 'react'
import { ProjectBasic, Task } from '@/types/project'
import {
  defaultProjects,
  defaultTasks,
  constructionContainer,
} from '@/constants/default-data'

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'ih_projects',
  TASKS: 'ih_tasks',
} as const

// Storage utility functions
const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    const item = localStorage.getItem(key)
    if (!item) return defaultValue
    try {
      return JSON.parse(item, (key, value) => {
        // Convert date strings back to Date objects
        if (key === 'createdAt' || key === 'updatedAt') {
          return new Date(value)
        }
        return value
      })
    } catch {
      return defaultValue
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },
}

export function useProjects() {
  const [projects, setProjects] = useState<ProjectBasic[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 初始加載數據
  useEffect(() => {
    setIsLoading(true)
    try {
      const storedProjects = storage.get<ProjectBasic[]>(
        STORAGE_KEYS.PROJECTS,
        defaultProjects
      )
      const storedTasks = storage.get<Task[]>(STORAGE_KEYS.TASKS, defaultTasks)
      setProjects(storedProjects)
      setTasks(storedTasks)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 添加專案
  const addProject = (project: Omit<ProjectBasic, 'id' | 'createdAt'>) => {
    try {
      const newProject: ProjectBasic = {
        ...project,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        containers: constructionContainer,
      }

      const updatedProjects = [...projects, newProject]
      setProjects(updatedProjects)
      storage.set(STORAGE_KEYS.PROJECTS, updatedProjects)
    } catch (error) {
      console.error('Failed to add project:', error)
      throw error
    }
  }

  // 更新專案
  const updateProject = (updatedProject: ProjectBasic) => {
    try {
      const updatedProjects = projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
      setProjects(updatedProjects)
      storage.set(STORAGE_KEYS.PROJECTS, updatedProjects)
    } catch (error) {
      console.error('Failed to update project:', error)
      throw error
    }
  }

  // 刪除專案
  const deleteProject = (projectId: string) => {
    try {
      // 刪除專案基本信息
      const updatedProjects = projects.filter(
        (project) => project.id !== projectId
      )
      setProjects(updatedProjects)
      storage.set(STORAGE_KEYS.PROJECTS, updatedProjects)

      // 刪除相關任務
      const updatedTasks = tasks.filter((task) => task.projectId !== projectId)
      setTasks(updatedTasks)
      storage.set(STORAGE_KEYS.TASKS, updatedTasks)
    } catch (error) {
      console.error('Failed to delete project:', error)
      throw error
    }
  }

  // 添加任務
  const addTask = (
    projectId: string,
    task: Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      const newTask: Task = {
        ...task,
        id: crypto.randomUUID(),
        projectId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const updatedTasks = [...tasks, newTask]
      setTasks(updatedTasks)
      storage.set(STORAGE_KEYS.TASKS, updatedTasks)
      return newTask
    } catch (error) {
      console.error('Failed to add task:', error)
      throw error
    }
  }

  // 更新任務
  const updateTask = (
    taskId: string,
    updates: Partial<Omit<Task, 'id' | 'projectId'>>
  ) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
      setTasks(updatedTasks)
      storage.set(STORAGE_KEYS.TASKS, updatedTasks)
    } catch (error) {
      console.error('Failed to update task:', error)
      throw error
    }
  }

  // 刪除任務
  const deleteTask = (taskId: string) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(updatedTasks)
      storage.set(STORAGE_KEYS.TASKS, updatedTasks)
    } catch (error) {
      console.error('Failed to delete task:', error)
      throw error
    }
  }

  // 獲取專案任務
  const getProjectTasks = (projectId: string) => {
    return tasks.filter((task) => task.projectId === projectId)
  }

  // 獲取所有任務（可選過濾）
  const getAllTasks = (filter?: {
    status?: Task['status']
    priority?: Task['priority']
    projectId?: string
  }) => {
    let filteredTasks = tasks

    if (filter) {
      filteredTasks = tasks.filter((task) => {
        if (filter.status && task.status !== filter.status) return false
        if (filter.priority && task.priority !== filter.priority) return false
        if (filter.projectId && task.projectId !== filter.projectId)
          return false
        return true
      })
    }

    return filteredTasks
  }

  return {
    projects,
    tasks,
    isLoading,
    addProject,
    updateProject,
    deleteProject,
    getProjectTasks,
    addTask,
    updateTask,
    deleteTask,
    getAllTasks,
  }
}
