import { FC, SVGProps } from 'react'
import { ProjectMenu } from './navigation'

export interface Menu {
  id: string
  title: string
  link: string
  icon: FC<SVGProps<SVGElement>>
  subMenu?: ProjectMenu[]
}

export interface ProjectType {
  value: string
  label: string
}

export interface Container {
  id: string
  type: string
  order: number
}

export interface ProjectBasic {
  id: string
  title: string
  type: 'residential' | 'luxury' | 'commercial' | 'office'
  startDate?: string
  endDate?: string
  budgetTotal?: number
  costTotal?: number
  progress: number
  daysLeft?: number
  createdAt: Date
  updatedAt: Date
  containers: Container[]
  team?: TeamMember[]
  tasks?: Task[]
}

export interface Task {
  id: string
  constructionType: string
  projectId: string
  title: string
  content?: string
  status: 'todo' | 'progress' | 'done'
  priority?: 'low' | 'high'
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
}
