import { ProjectBasic, Task } from '@/types/project'

export const defaultProjects: ProjectBasic[] = [
  {
    id: '0',
    title: '示範案例',
    type: '住宅',
    progress: 85,
    daysLeft: 2,
    createdAt: new Date(),
  },
]

export const defaultTasks: Task[] = [
  {
    id: '0',
    type:'拆除',
    projectId: '0',
    title: "示範標題",
    content: "示範資訊",
    status: 'todo',
    priority: 'low',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // 7天後到期
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]
