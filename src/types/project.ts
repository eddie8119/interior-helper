export interface Menu {
  id: string
  title: string
  link: string
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
