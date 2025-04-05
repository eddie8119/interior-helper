import { Project } from '@prisma/client'
import { constructionContainer } from '@/constants/default-data'
import { ActionResult } from '@/types'
import { CreateProjectInputSchema } from './schemas/createProjectSchema'

const STORAGE_KEYS = {
  TRIAL_PROJECTS: 'trial_projects',
  PROJECTS: 'projects',
}
const MAX_TRIAL_PROJECTS = 3

export const projectStorage = {
  // 獲取所有專案
  getProjects(): ActionResult<Project[]> {
    try {
      const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS)
      const projects: Project[] = savedProjects
        ? (JSON.parse(savedProjects) as Project[])
        : []
      return { status: 'success', data: projects }
    } catch (error) {
      return { status: 'error', error: '獲取專案失敗' }
    }
  },

  // 創建專案
  createProject(data: CreateProjectInputSchema): ActionResult<Project> {
    try {
      // 檢查是否超出試用版限制
      const result = this.getProjects()
      if (result.status === 'error') return result

      const projects = result.data || []
      if (projects.length >= MAX_TRIAL_PROJECTS) {
        return {
          status: 'error',
          error: `試用版最多只能創建 ${MAX_TRIAL_PROJECTS} 個專案`,
        }
      }

      const { title, type } = data
      const now = new Date()

      const newProject = {
        id: crypto.randomUUID(),
        title,
        type,
        startDate: now,
        dueDate: now,
        budgetTotal: 0,
        costTotal: 0,
        progress: 0,
        containers: constructionContainer,
        team: '[]',
        userId: 'local',
        created: now,
        updated: now,
      }

      const updatedProjects = [...projects, newProject]
      localStorage.setItem(
        STORAGE_KEYS.PROJECTS,
        JSON.stringify(updatedProjects)
      )
      return { status: 'success', data: newProject }
    } catch (error) {
      return { status: 'error', error: '創建專案失敗' }
    }
  },

  // 刪除專案
  deleteProject(id: string): ActionResult<null> {
    try {
      const result = this.getProjects()
      if (result.status === 'error') {
        return result
      }
      const projects = result.data || []
      const filteredProjects = projects.filter((p) => p.id !== id)
      localStorage.setItem(
        STORAGE_KEYS.PROJECTS,
        JSON.stringify(filteredProjects)
      )
      return { status: 'success', data: null }
    } catch (error) {
      return { status: 'error', error: '刪除專案失敗' }
    }
  },

  // 更新專案
  updateProject(id: string, data: Partial<Project>): ActionResult<Project> {
    try {
      const projects = this.getProjects().data
      const projectIndex = projects.findIndex((p) => p.id === id)
      if (projectIndex === -1) {
        return { status: 'error', error: '專案不存在' }
      }

      const updatedProject = {
        ...projects[projectIndex],
        ...data,
        updatedAt: new Date(),
      }
      projects[projectIndex] = updatedProject
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
      return { status: 'success', data: updatedProject }
    } catch (error) {
      return { status: 'error', error: '更新專案失敗' }
    }
  },

  // 獲取當前專案數量
  getProjectCount(): number {
    const result = this.getProjects()
    return result.status === 'success' ? result.data?.length || 0 : 0
  },

  // 檢查是否可以創建新專案
  canCreateProject(): boolean {
    return this.getProjectCount() < MAX_TRIAL_PROJECTS
  },
}
