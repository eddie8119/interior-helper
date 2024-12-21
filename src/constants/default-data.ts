import { Task, ProjectBasic } from '@/types/project'

export const constructionContainer:string[] = [
  '拆除',
  '機電',
  '水電',
  '地坪',
  '泥做',
  '門框',
  '輕隔間',
  '木做',
  '油漆',
]

export const defaultProjects: ProjectBasic[] = [
  {
    id: '1',
    title: '示範-台北市大安案案',
    type: 'residential',
    progress: 30,
    daysLeft: 45,
    createdAt: new Date('2024-01-01'),
    containers: [
      '拆除',
      '機電',
      '水電',
      '地坪',
      '泥做',
      '門框',
      '輕隔間',
      '木做',
      '油漆',
    ],
  },
]

export const defaultTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: '現場丈量',
    content: '確認現場尺寸與圖面相符',
    type: 'site-preparation',
    status: 'done',
    priority: 'high',
    dueDate: new Date('2024-12-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]
