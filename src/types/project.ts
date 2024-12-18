import { FC, SVGProps } from 'react'

export interface Menu {
  id: string
  title: string
  link: string
  icon: FC<SVGProps<SVGElement>>
}

export interface Project {
  id: string
  title: string
  type: string
  progress: number
  daysLeft?: number
  createdAt: Date
}

export interface TeamMember {
  id: string
  name: string
  avatar: string
}
