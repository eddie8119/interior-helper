import { ProjectBasic, Task } from '@/types/project'
import { DropResult } from '@hello-pangea/dnd'

const DROPPABLE_TYPE = {
  CONTAINER: 'container',
  TASK: 'task',
}

interface UseDragEndProps {
  project: ProjectBasic
  projectTasks: Task[]
  updateContainers: (containers: ProjectBasic['containers']) => void
  onUpdateTask: (taskId: string, data: Partial<Task>) => void
}

export function useDragEnd({
  project,
  projectTasks,
  updateContainers,
  onUpdateTask,
}: UseDragEndProps) {
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
      const newContainers = Array.from(project.containers)
      const [removed] = newContainers.splice(source.index, 1)
      newContainers.splice(destination.index, 0, removed)

      // 更新容器順序
      const updatedContainers = newContainers.map((container, index) => ({
        ...container,
        order: index,
      }))

      updateContainers(updatedContainers)
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
