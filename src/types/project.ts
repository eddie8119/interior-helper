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
  progress?: number
  daysLeft?: number
  createdAt: Date
  editedAt: Date
  containers: Container[]
}

export interface Task {
  id: string
  constructionType: string
  projectId: string
  title: string
  content?: string
  status: 'todo' | 'in-progress' | 'done'
  priority?: 'low' | 'medium' | 'high'
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface ProjectDetail extends ProjectBasic {
  description?: string
  startDate?: string
  endDate?: string
  budget?: number
  team?: TeamMember[]
  tasks?: Task[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
}
