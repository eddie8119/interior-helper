import { FC, SVGProps } from 'react'
import { ProjectMenu } from './navigation'

export interface Menu {
  id: string
  title: string
  link: string
  icon: FC<SVGProps<SVGElement>>
  subMenu?: ProjectMenu[]
}

export interface ProjectBasic {
  id: string
  title: string
  type: string
  progress: number
  daysLeft: number
  createdAt: Date
}

export interface Task {
  id: string
  type:string
  projectId: string
  title: string
  content?: string
  status: 'todo' | 'in-progress' | 'done'
  priority?: 'low' | 'medium' | 'high'
  dueDate?: string
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
