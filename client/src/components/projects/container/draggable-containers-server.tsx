'use client'

import { Project, Task } from '@prisma/client'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { getProjects } from '@/actions/projectActions'
import { useDragEnd } from '@/hooks/use-drag-end'
import { AddContainer } from '@/components/projects/add-container'
import { ContainerCard } from '@/components/projects/drag/container-card'

const DROPPABLE_TYPE = {
  CONTAINER: 'container',
  TASK: 'task',
}

interface DraggableContainersServerProps {
  project: Project
  projectTasks: Task[]
  onUpdateTask?: (taskId: string, data: Partial<Task>) => void
  onUpdateProject?: (projectId: string, data: Partial<Project>) => void
}

export function DraggableContainersServer({
  project,
  projectTasks,
  onUpdateTask,
  onUpdateProject,
}: DraggableContainersServerProps) {
  // const { updateContainers, deleteContainer, createContainer } = useContainers(
  //   project,
  //   onUpdateProject
  // )

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
                    <ContainerCard
                      type={container.type}
                      tasks={containerTasks}
                      onDelete={() => deleteContainer(container.id)}
                      dragProvided={provided}
                      dragSnapshot={snapshot}
                    />
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
