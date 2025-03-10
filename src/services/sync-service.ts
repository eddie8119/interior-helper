import { ProjectBasic, Task } from '@/types/project'
import { firebaseService } from './firebase'

const STORAGE_KEYS = {
  PROJECTS: 'ih_projects',
  TASKS: 'ih_tasks',
  LAST_SYNC: 'ih_last_sync',
} as const

export const syncService = {
  // 存儲操作
  storage: {
    get: <T>(key: string, defaultValue: T): T => {
      if (typeof window === 'undefined') return defaultValue
      const item = localStorage.getItem(key)
      if (!item) return defaultValue
      try {
        return JSON.parse(item, (key, value) => {
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
  },

  // 同步操作
  sync: {
    // 同步所有數據
    all: async () => {
      await Promise.all([syncService.sync.projects(), syncService.sync.tasks()])
      syncService.storage.set(STORAGE_KEYS.LAST_SYNC, new Date().toISOString())
    },

    // 同步專案
    projects: async () => {
      // 從 Firebase 獲取數據
      const projects = await firebaseService.projects.getAll()

      // 更新本地存儲
      syncService.storage.set(STORAGE_KEYS.PROJECTS, projects)

      return projects
    },

    // 同步任務
    tasks: async () => {
      // 從 Firebase 獲取數據
      const tasks = await firebaseService.tasks.getAll()

      // 更新本地存儲
      syncService.storage.set(STORAGE_KEYS.TASKS, tasks)

      return tasks
    },
  },

  // 數據操作（同時更新 Firebase 和本地存儲）
  data: {
    // 專案操作
    projects: {
      add: async (project: ProjectBasic) => {
        // 更新 Firebase
        await firebaseService.projects.add(project)

        // 更新本地存儲
        const projects = syncService.storage.get<ProjectBasic[]>(
          STORAGE_KEYS.PROJECTS,
          []
        )
        syncService.storage.set(STORAGE_KEYS.PROJECTS, [...projects, project])

        return project
      },

      update: async (projectId: string, data: Partial<ProjectBasic>) => {
        // 更新 Firebase
        await firebaseService.projects.update(projectId, data)

        // 更新本地存儲
        const projects = syncService.storage.get<ProjectBasic[]>(
          STORAGE_KEYS.PROJECTS,
          []
        )
        const updated = projects.map((p) =>
          p.id === projectId ? { ...p, ...data } : p
        )
        syncService.storage.set(STORAGE_KEYS.PROJECTS, updated)
      },

      delete: async (projectId: string) => {
        // 更新 Firebase
        await Promise.all([
          firebaseService.projects.delete(projectId),
          firebaseService.projectDetails.delete(projectId),
        ])

        // 更新本地存儲
        const projects = syncService.storage.get<ProjectBasic[]>(
          STORAGE_KEYS.PROJECTS,
          []
        )
        syncService.storage.set(
          STORAGE_KEYS.PROJECTS,
          projects.filter((p) => p.id !== projectId)
        )
      },
    },

    // 任務操作
    tasks: {
      add: async (task: Task) => {
        // 更新 Firebase
        await firebaseService.tasks.add(task)

        // 更新本地存儲
        const tasks = syncService.storage.get<Task[]>(STORAGE_KEYS.TASKS, [])
        syncService.storage.set(STORAGE_KEYS.TASKS, [...tasks, task])

        return task
      },

      update: async (taskId: string, data: Partial<Task>) => {
        // 更新 Firebase
        await firebaseService.tasks.update(taskId, data)

        // 更新本地存儲
        const tasks = syncService.storage.get<Task[]>(STORAGE_KEYS.TASKS, [])
        const updated = tasks.map((t) =>
          t.id === taskId ? { ...t, ...data, updatedAt: new Date() } : t
        )
        syncService.storage.set(STORAGE_KEYS.TASKS, updated)
      },

      delete: async (taskId: string) => {
        // 更新 Firebase
        await firebaseService.tasks.delete(taskId)

        // 更新本地存儲
        const tasks = syncService.storage.get<Task[]>(STORAGE_KEYS.TASKS, [])
        syncService.storage.set(
          STORAGE_KEYS.TASKS,
          tasks.filter((t) => t.id !== taskId)
        )
      },
    },
  },
}
