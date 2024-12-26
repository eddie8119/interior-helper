import { ProjectBasic, Task } from '@/types/project'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useContainers } from '@/hooks/use-containers'
import { useDragEnd } from '@/hooks/use-drag-end'
import { AddContainer } from './add-container'
import { ContainerCard } from './container-card'

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
