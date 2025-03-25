import { ProjectType, Container } from '../project'

export interface CreateProjectData {
  title: string
  type: ProjectType
}

export interface CreateProjectData {
  title: string
  type: ProjectType
}

export interface UpdateProjectData {
  title?: string
  type?: ProjectType
  startDate?: string | null
  dueDate?: string | null
  budgetTotal?: number | null
  costTotal?: number | null
  progress?: number
  containers?: Container
}
