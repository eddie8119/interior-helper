'use client'

import { ProjectBasic, Task } from '@/types/project'
import { cn } from '@/lib/utils'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useContainers } from '@/hooks/use-containers'
import { useDragEnd } from '@/hooks/use-drag-end'
import { AddContainer } from './add-container'
import { TaskList } from './task-list'
import { DeleteButtonWithDialog } from '@/components/ui/delete-button-with-dialog'
import { Card } from '@/components/ui/card'

const DROPPABLE_TYPE = {
  CONTAINER: 'container',
  TASK: 'task',
}

interface DraggableContainersProps {
  project: ProjectBasic
  projectTasks: Task[]
  onUpdateTask: (taskId: string, data: Partial<Task>) => void
  onUpdateProject: (projectId: string, data: Partial<ProjectBasic>) => void
}

export function DraggableContainers({
  project,
  projectTasks,
  onUpdateTask,
  onUpdateProject,
}: DraggableContainersProps) {
  const { updateContainers, deleteContainer, createContainer } = useContainers(
    project,
    onUpdateProject
  )

  const onDragEnd = useDragEnd({
    project,
    projectTasks,
    updateContainers,
    onUpdateTask,
  })

  return (
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
                        <div className="group relative mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {container.type}({containerTasks.length})
                          </h3>
                          <DeleteButtonWithDialog
                            deleteItem={() => deleteContainer(container.id)}
                            title="確認刪除"
                            description={`您確定要刪除此容器嗎？此操作無法復原。`}
                            className="!relative !right-0 !top-0 !block !opacity-100"
                          />
                        </div>

                        {/* 任務列表 */}
                        <TaskList
                          droppableId={container.type}
                          tasks={containerTasks}
                        />

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

            {/* 添加容器按鈕 */}
            <AddContainer onCreateContainer={createContainer} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
