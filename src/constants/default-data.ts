import { Project, Task } from '@prisma/client'

export const defaultProjects: Project[] = [
  {
    id: '1',
    title: '示範-台北市大安案',
    type: 'residential',
    progress: 30,
    updatedAt: new Date(),
    createdAt: new Date('2024-01-01'),
    containers: [
      {
        id: '拆除',
        type: '拆除',
        order: 0,
      },
      {
        id: '機電',
        type: '機電',
        order: 1,
      },
    ],
  },
]

export const defaultTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: '現場丈量',
    content: '確認現場尺寸與圖面相符',
    constructionType: '拆除',
    status: 'done',
    priority: 'high',
    dueDate: new Date('2024-12-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]
