import { Task, ProjectBasic, Container } from '@/types/project'

export const constructionContainer: Container[] = [
  {
    id: 'demolition',
    title: '拆除',
    type: 'demolition',
    order: 0,
  },
  {
    id: 'mechanical',
    title: '機電',
    type: 'mechanical',
    order: 1,
  },
  {
    id: 'plumbing',
    title: '水電',
    type: 'plumbing',
    order: 2,
  },
  {
    id: 'flooring',
    title: '地坪',
    type: 'flooring',
    order: 3,
  },
  {
    id: 'masonry',
    title: '泥做',
    type: 'masonry',
    order: 4,
  },
  {
    id: 'door-frame',
    title: '門框',
    type: 'door-frame',
    order: 5,
  },
  {
    id: 'partition',
    title: '輕隔間',
    type: 'partition',
    order: 6,
  },
  {
    id: 'woodwork',
    title: '木做',
    type: 'woodwork',
    order: 7,
  },
  {
    id: 'painting',
    title: '油漆',
    type: 'painting',
    order: 8,
  },
]

export const defaultProjects: ProjectBasic[] = [
  {
    id: '1',
    title: '示範-台北市大安案',
    type: 'residential',
    progress: 30,
    daysLeft: 45,
    createdAt: new Date('2024-01-01'),
    containers: [
      {
        id: 'demolition',
        title: '拆除',
        type: 'demolition',
        order: 0,
      },
      {
        id: 'mechanical',
        title: '機電',
        type: 'mechanical',
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
    constructionType: 'demolition',
    status: 'done',
    priority: 'high',
    dueDate: new Date('2024-12-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]
