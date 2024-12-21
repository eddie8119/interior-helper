'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { useProjects } from '@/hooks/use-projects'
import { useTasks } from '@/hooks/use-tasks'
import { cn } from '@/lib/utils'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import { Trash2 } from 'lucide-react'

const DROPPABLE_TYPE = {
  CONTAINER: 'container',
  TASK: 'task',
}

export default function ProjectDetailsPage() {
  const params = useParams()
  const { projects, updateProject } = useProjects()
  const { getProjectTasks, updateTask } = useTasks()
  const projectId = params.id as string
  const project = projects.find((p) => p.id === projectId)
  const projectTasks = getProjectTasks(projectId)

  if (!project) {
    return <div>Loading...</div>
  }
  const onDragEnd = (result: DropResult) => {
    if (!project) return

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

      updateProject(project.id, {
        containers: updatedContainers,
      })
      return
    }

    // 處理任務拖拽
    const task = projectTasks.find((t) => t.id === draggableId)
    if (!task) return

    if (destination.droppableId !== source.droppableId) {
      updateTask(task.id, {
        constructionType: destination.droppableId,
      })
    }
  }

  // 刪除容器
  const handleDeleteContainer = (containerId: string) => {
    if (!project) return

    const updatedContainers = project.containers.filter(
      (container) => container.id !== containerId
    )

    updateProject(project.id, {
      containers: updatedContainers,
    })
  }

  return (
    <main className="container mx-auto py-8">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* 容器列表 */}
        <Droppable
          droppableId="containers"
          direction="horizontal"
          type={DROPPABLE_TYPE.CONTAINER}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 overflow-auto pb-4"
            >
              {project.containers.map((container, index) => {
                const containerTasks = projectTasks.filter(
                  (task) => task.constructionType === container.type
                )

                return (
                  <Draggable
                    key={container.id}
                    draggableId={container.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          'min-w-[300px]',
                          snapshot.isDragging && 'z-10'
                        )}
                      >
                        <Card
                          {...provided.dragHandleProps}
                          className={cn(
                            'p-4 transition-all duration-200',
                            snapshot.isDragging &&
                              'shadow-lg ring-2 ring-[#D4763B] ring-opacity-50'
                          )}
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                              {container.title}({containerTasks.length})
                            </h3>
                            <button
                              onClick={() =>
                                handleDeleteContainer(container.id)
                              }
                              className="text-gray-400 transition-colors hover:text-red-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          {/* 任務列表 */}
                          <Droppable
                            droppableId={container.type}
                            type={DROPPABLE_TYPE.TASK}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={cn(
                                  'min-h-[200px] space-y-3 rounded-lg transition-colors',
                                  snapshot.isDraggingOver
                                    ? 'bg-gray-50 dark:bg-gray-800'
                                    : ''
                                )}
                              >
                                {containerTasks.map((task, index) => (
                                  <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={cn(
                                          'rounded-lg bg-white p-3 dark:bg-gray-700',
                                          snapshot.isDragging
                                            ? 'shadow-lg dark:bg-gray-700'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                        )}
                                      >
                                        <div className="flex items-center justify-between">
                                          <h4 className="font-medium">
                                            {task.title}
                                          </h4>
                                          <span
                                            className={cn(
                                              'rounded-full px-2 py-1 text-xs',
                                              task.status === 'todo'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : task.status === 'in-progress'
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : 'bg-green-100 text-green-800'
                                            )}
                                          >
                                            {task.status === 'todo'
                                              ? '待辦'
                                              : task.status === 'in-progress'
                                                ? '進行中'
                                                : '完成'}
                                          </span>
                                        </div>
                                        {task.content && (
                                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            {task.content}
                                          </p>
                                        )}
                                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                          <span>
                                            到期日：
                                            {task.dueDate
                                              ? new Date(
                                                  task.dueDate
                                                ).toLocaleDateString()
                                              : '無'}
                                          </span>
                                          <span
                                            className={cn(
                                              'rounded px-2 py-1',
                                              task.priority === 'high'
                                                ? 'bg-red-100 text-red-800'
                                                : task.priority === 'medium'
                                                  ? 'bg-orange-100 text-orange-800'
                                                  : 'bg-gray-100 text-gray-800'
                                            )}
                                          >
                                            {task.priority === 'high'
                                              ? '高'
                                              : task.priority === 'medium'
                                                ? '中'
                                                : '低'}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>

                          {/* 添加任務按鈕 */}
                          <button className="mt-4 w-full rounded-lg border border-dashed border-gray-300 p-2 text-center text-sm text-gray-500 hover:border-[#D4763B] hover:text-[#D4763B] dark:border-gray-600 dark:hover:border-[#D4763B]">
                            + 添加任務
                          </button>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  )
}
