import { Task, ProjectBasic, Container } from '@/types/project'

export const constructionContainer: Container[] = [
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
  {
    id: '水電',
    type: '水電',
    order: 2,
  },
  {
    id: '地坪',
    type: '地坪',
    order: 3,
  },
  {
    id: '泥做',
    type: '泥做',
    order: 4,
  },
  {
    id: '門框',
    type: '門框',
    order: 5,
  },
  {
    id: '輕隔間',
    type: '輕隔間',
    order: 6,
  },
  {
    id: '木做',
    type: '木做',
    order: 7,
  },
  {
    id: '油漆',
    type: '油漆',
    order: 8,
  },
  {
    id: '石材',
    type: '石材',
    order: 9,
  },
  {
    id: '玻璃',
    type: '玻璃',
    order: 10,
  },
  {
    id: '收尾',
    type: '收尾',
    order: 11,
  },
]

export const defaultProjects: ProjectBasic[] = [
  {
    id: '1',
    title: '示範-台北市大安案',
    type: 'residential',
    progress: 30,
    daysLeft: 45,
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
