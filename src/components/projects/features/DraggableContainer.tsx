import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Project, Task } from '@prisma/client'
import { Container } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AddContainer } from '@/components/projects/shared/AddContainer'
import { ContainerCard } from '@/components/projects/shared/ContainerCard'
import { dragEnd } from '@/lib/dragEnd'
import { TaskSchema, MaterialSchema } from '@/lib/schemas/createTaskSchema'
import { ActionResult } from '@/types'

const DROPPABLE_TYPE = {
  CONTAINER: 'container',
  TASK: 'task',
}

interface DraggableContainersProps {
  project: Project
  projectContainers: Container[]
  projectTasks: Task[]
  containerActions: {
    createContainer: (
      projectId: string,
      data: { type: string }
    ) => Promise<ActionResult<Container>>
    updateContainer: (
      containerId: string,
      updates: Partial<Container>
    ) => Promise<ActionResult<Container>>
    updateContainersOrder: (
      projectId: string,
      updates: Partial<Container>[]
    ) => Promise<ActionResult<Container[]>>
    deleteContainer: (containerId: string) => Promise<ActionResult<Container>>
  }
  taskActions: {
    createTask: (
      containerId: string,
      data: TaskSchema & Partial<MaterialSchema>,
      constructionType: string
    ) => Promise<ActionResult<Task>>
    updateTask: (
      taskId: string,
      updates: Partial<Task> & Partial<MaterialSchema>
    ) => Promise<ActionResult<Task>>
    deleteTask: (taskId: string) => Promise<ActionResult<Task>>
  }
}

export function DraggableContainer({
  project,
  projectContainers,
  projectTasks,
  containerActions,
  taskActions,
}: DraggableContainersProps) {
  const router = useRouter()

  // 根據 order 排序容器，由小到大
  const sortContainers = useCallback(
    (containers: Container[]) =>
      [...containers].sort((a, b) => a.order - b.order),
    []
  )

  const [containers, setContainers] = useState<Container[]>(() =>
    sortContainers(projectContainers)
  )

  useEffect(() => {
    setContainers(sortContainers(projectContainers))
  }, [projectContainers, sortContainers])

  const handleUpdateContainersOrder = useCallback(
    async (updates: Container[]) => {
      try {
        // 樂觀更新：立即更新本地 state
        setContainers(updates)
        const result = await containerActions.updateContainersOrder(
          project.id,
          updates
        )
        if (result.status === 'error') {
          setContainers(sortContainers(projectContainers))
          toast.error(result.error as string)
        }
      } catch (error) {
        setContainers(sortContainers(projectContainers))
        toast.error('Failed to update containers order')
      }
    },
    [containerActions, projectContainers, containerActions, project.id]
  )

  const handleCreateContainer = useCallback(
    async (data: { type: string }) => {
      try {
        // 這裡可以訪問到外層作用域的 project.id
        // project.id 的處理被封裝在 DraggableContainer 中
        const result = await containerActions.createContainer(project.id, data)
        if (result.status === 'success') {
          toast.success('工程創建成功')
          setContainers((prev) => [...prev, result.data])
        } else {
          toast.error(result.error as string)
        }
      } catch (error) {
        const errorMessage = '發生意外錯誤，請稍後再試'
        toast.error(errorMessage)
        return { status: 'error', error: errorMessage }
      }
    },
    [containerActions, project.id, router]
  )

  const handleDeleteContainer = useCallback(
    async (containerId: string) => {
      try {
        const result = await containerActions.deleteContainer(containerId)
        if (result.status === 'success') {
          toast.success('工程刪除成功')
          setContainers((prev) => prev.filter((c) => c.id !== containerId))
        } else {
          toast.error(result.error as string)
        }
      } catch (error) {
        const errorMessage = '發生意外錯誤，請稍後再試'
        toast.error(errorMessage)
        return { status: 'error', error: errorMessage }
      }
    },
    [containerActions, project.id, router]
  )

  const handleUpdateContainer = useCallback(
    async (containerId: string, updates: Partial<Container>) => {
      try {
        const result = await containerActions.updateContainer(
          containerId,
          updates
        )
        if (result.status === 'success') {
          setContainers((prevContainers) =>
            prevContainers.map((container) =>
              container.id === containerId
                ? { ...container, ...updates }
                : container
            )
          )
        } else {
          toast.error(result.error as string)
        }
      } catch (error) {
        const errorMessage = '發生意外錯誤，請稍後再試'
        toast.error(errorMessage)
        return { status: 'error', error: errorMessage }
      }
    },
    [containerActions, project.id, router]
  )

  const onDragEnd = dragEnd({
    projectContainers: containers,
    projectTasks,
    onUpdateContainersOrder: handleUpdateContainersOrder,
    onUpdateTask: taskActions.updateTask,
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
            className="flex gap-4 overflow-x-auto"
          >
            {containers.map((container, index) => {
              // 可以減少發送 API 請求
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
                      container={container}
                      tasks={containerTasks}
                      onUpdateContainer={(updates: Partial<Container>) => {
                        handleUpdateContainer(container.id, updates)
                      }}
                      onDeleteContainer={() =>
                        handleDeleteContainer(container.id)
                      }
                      dragProvided={provided}
                      dragSnapshot={snapshot}
                      taskActions={taskActions}
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

// containerTasks寫法
// 在父層級一次性獲取所有任務，然後在前端過濾 vs 每個 container 都發送一次 API 請求

// 更快的響應時間：資料已經在前端，過濾操作非常快
// 更好的用戶體驗：不會有多次載入的延遲
// 減輕伺服器負擔：避免多次資料庫查詢
