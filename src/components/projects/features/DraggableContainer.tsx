import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { dragEnd } from '@/lib/dragEnd'
import { AddContainer } from '@/components/projects/AddContainer'
import { ContainerCard } from '@/components/projects/shared/ContainerCard'
import { Project, Task } from '@prisma/client'
import { Container } from '@/types/project'
import { ActionResult } from '@/types'
import { CreateTaskInputSchema } from '@/lib/schemas/createTaskSchema'
import { toast } from 'react-toastify'

const DROPPABLE_TYPE = {
  CONTAINER: 'container',
  TASK: 'task',
}

interface DraggableContainersProps {
  project: Project
  projectTasks: Task[]
  onUpdateProject: (projectId: string, data: Partial<Project>) => void
  containerActions: {
    createContainer: (
      projectId: string,
      data: { type: string }
    ) => Promise<ActionResult<Project>>
    updateContainer: (
      projectId: string,
      containerId: string,
      updates: Partial<Container>
    ) => Promise<ActionResult<Project>>
    deleteContainer: (
      projectId: string,
      containerId: string
    ) => Promise<ActionResult<Project>>
  }
  taskActions: {
    createTask: (
      projectId: string,
      data: CreateTaskInputSchema,
      constructionType: string
    ) => Promise<ActionResult<Task>>
    updateTask: (
      projectId: string,
      taskId: string,
      updates: Partial<Task>
    ) => Promise<ActionResult<Task>>
    deleteTask: (
      projectId: string,
      taskId: string
    ) => Promise<ActionResult<Task>>
  }
}

export function DraggableContainer({
  project,
  projectTasks,
  onUpdateProject,
  containerActions,
  taskActions,
}: DraggableContainersProps) {
  const router = useRouter()

  const onDragEnd = dragEnd({
    project,
    projectTasks,
    onUpdateContainers: containerActions.updateContainer,
    onUpdateTask: taskActions.updateTask,
  })

  const projectContainers = project.containers as any[] as Container[]

  const handleCreateContainer = useCallback(
    async (data: { type: string }) => {
      try {
        // 這裡可以訪問到外層作用域的 project.id
        // project.id 的處理被封裝在 DraggableContainer 中
        const result = await containerActions.createContainer(project.id, data)
        if (result.status === 'success') {
          // toast.success('專案創建成功')
          router.refresh()
        } else {
          toast.error(result.error as string)
        }
      } catch (error) {
        const errorMessage = '發生意外錯誤，請稍後再試'
        toast.error(errorMessage)
        return { status: 'error', error: errorMessage }
      }
    },
    [containerActions, project.id]
  )

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
            {projectContainers.map((container, index) => {
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
                      onDeleteContainer={() =>
                        containerActions.deleteContainer(
                          project.id,
                          container.id
                        )
                      }
                      dragProvided={provided}
                      dragSnapshot={snapshot}
                    />
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}

            {/* 添加容器按鈕 */}
            <AddContainer onCreateContainer={handleCreateContainer} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
