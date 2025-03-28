import { ActionResult } from '@/types'
import { DropResult } from '@hello-pangea/dnd'
import { Project, Container, Task } from '@prisma/client'

const DROPPABLE_TYPE = {
  CONTAINER: 'container',
  TASK: 'task',
}

interface DragEndProps {
  project: Project
  projectContainers: Container[]
  projectTasks: Task[]
  onUpdateContainer: (containerId: string, updates: Partial<Container>) => void
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
}

export function dragEnd({
  projectContainers,
  projectTasks,
  onUpdateContainer,
  onUpdateTask,
}: DragEndProps) {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // 處理容器拖拽
    if (type === DROPPABLE_TYPE.CONTAINER) {
      const newContainers = Array.from(projectContainers)
      const [removed] = newContainers.splice(source.index, 1)
      newContainers.splice(destination.index, 0, removed)

      // 更新容器順序
      const updatedContainers = newContainers.map((container, index) => ({
        ...container,
        order: index,
      }))

      onUpdateContainer(draggableId, updatedContainers)
      return
    }

    // 處理任務拖拽
    const task = projectTasks.find((t) => t.id === draggableId)
    if (!task) return

    if (destination.droppableId !== source.droppableId) {
      onUpdateTask(task.id, {
        constructionType: destination.droppableId,
      })
    }
  }

  return handleDragEnd
}
