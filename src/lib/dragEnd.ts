import { DropResult } from '@hello-pangea/dnd'
import { Container, Task } from '@prisma/client'

const DROPPABLE_TYPE = {
  CONTAINER: 'container',
  TASK: 'task',
}

interface DragEndProps {
  projectContainers: Container[]
  projectTasks: Task[]
  onUpdateContainersOrder: (updates: Container[]) => Promise<void>
  onUpdateTasksOrder: (updates: Task[]) => Promise<void>
}

export function dragEnd({
  projectContainers,
  projectTasks,
  onUpdateContainersOrder,
  onUpdateTasksOrder,
}: DragEndProps) {
  const handleDragEnd = async (result: DropResult) => {
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
      const newContainers = [...projectContainers]
      const [removed] = newContainers.splice(source.index, 1)
      newContainers.splice(destination.index, 0, removed)

      // 準備更新數據，只包含 id 和新的 order
      const updates = newContainers.map((container, index) => ({
        ...container,
        order: index,
      }))

      await onUpdateContainersOrder(updates)
      return
    }

    // 處理任務拖拽
    if (type === DROPPABLE_TYPE.TASK) {
      const newTasks = [...projectTasks]
      const [removed] = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, removed)

      // 準備更新數據，只包含 id 和新的 order, constructionType
      const updates = newTasks.map((task, index) => ({
        ...task,
        order: index,
      }))

      await onUpdateTasksOrder(updates)
      return
    }
    const task = projectTasks.find((t) => t.id === draggableId)
    if (!task) return

    // if (destination.droppableId !== source.droppableId) {
    //   onUpdateTaskOrder()
    // }
  }

  return handleDragEnd
}
