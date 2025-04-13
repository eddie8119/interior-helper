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
      // console.log('Moving task destination', destination)
      // console.log('Moving task source', source)
      // console.log('Moving task draggableId', draggableId)
      // console.log('Moving task type', type)

      try {
        // 1. 找到目標容器
        const targetContainer = projectContainers.find(
          (container) => container.type === destination.droppableId
        )
        // console.log('Target container:', targetContainer)
        if (!targetContainer) {
          console.error('Target container not found:', destination.droppableId)
          return
        }

        // 3. 準備更新數據
        const updatedTasks = projectTasks.map((task) => {
          // 如果是被移動的任務
          if (task.id === draggableId) {
            return {
              ...task,
              // order: destination.index,
              constructionType: destination.droppableId,
              containerId: targetContainer.id,
            }
          }

          // 如果是目標容器中的其他任務，需要調整順序
          // if (task.constructionType === destination.droppableId) {
          //   if (task.order >= destination.index) {
          //     return { ...task, order: task.order + 1 }
          //   }
          // }

          return task
        })

        console.log('Updated tasks:', updatedTasks)
        // 4. 執行更新
        await onUpdateTasksOrder(updatedTasks)
        return
      } catch (error) {
        console.error('Error in drag end handler:', error)
      }
    }
  }

  return handleDragEnd
}
