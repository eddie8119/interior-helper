import { useState, useEffect } from 'react'
import { defaultTasks } from '@/constants/default-data'
import { Task } from '@/types/project'

// Storage keys
const STORAGE_KEYS = {
  TASKS: 'tasks',
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  // 初始化任務
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS)
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks)
        // 將字串日期轉換為 Date 物件
        const tasksWithDates = parsedTasks.map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }))
        setTasks(tasksWithDates)
      } catch (error) {
        console.error('Error parsing tasks:', error)
        setTasks(defaultTasks)
      }
    } else {
      setTasks(defaultTasks)
    }
  }, [])

  // 保存任務到本地存儲
  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks))
    setTasks(tasks)
  }

  // 獲取專案的任務
  const getProjectTasks = (projectId: string) => {
    return tasks.filter((task) => task.projectId === projectId)
  }

  // 添加任務
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const updatedTasks = [...tasks, newTask]
    saveTasks(updatedTasks)
    return newTask
  }

  // 更新任務
  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            ...updates,
            updatedAt: new Date(),
          }
        : task
    )
    saveTasks(updatedTasks)
  }

  // 刪除任務
  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    saveTasks(updatedTasks)
  }

  return {
    tasks,
    getProjectTasks,
    addTask,
    updateTask,
    deleteTask,
  }
}
