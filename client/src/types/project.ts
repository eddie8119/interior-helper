import { FC, SVGProps } from 'react'
import { ProjectMenu } from './navigation'
import { ProjectType } from '@prisma/client'

export interface Menu {
  id: string
  title: string
  link: string
  icon: FC<SVGProps<SVGElement>>
  subMenu?: ProjectMenu[]
}

export interface Container {
  id: string
  type: string
  order: number
}

export interface ProjectBasic {
  id: string
  title: string
  type: ProjectType
  startDate?: Date | null
  endDate?: Date | null
  budgetTotal?: number | null
  costTotal?: number | null
  progress: number
  daysLeft?: number | null
  containers: any[]
  team: any[]
  createdAt: Date
  updatedAt: Date
  userId: string
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
