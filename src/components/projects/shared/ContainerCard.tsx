import { Card } from '@/components/core/Card'
import { Container, Task } from '@prisma/client'
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'
import { TaskList } from '@/components/projects/shared/TaskList'
import { DeleteButtonWithDialog } from '@/components/core/DeleteButtonWithDialog'
import { ActionResult } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { Input } from '@/components/core/Input'
import { useEditableInput } from '@/hooks/useEditableInput'
import { AddTask } from './AddTask'
import { toast } from 'react-toastify'

interface ContainerCardProps {
  tasks: Task[]
  container: Container
  onUpdateContainer: (
    updates: Partial<Container>
  ) => Promise<ActionResult<Container>>
  onDeleteContainer: () => Promise<ActionResult<Container>>
  dragProvided: DraggableProvided
  dragSnapshot: DraggableStateSnapshot
  taskActions: {
    createTask: (
      containerId: string,
      data: Partial<Task>,
      constructionType: string
    ) => Promise<ActionResult<Task>>
    updateTask: (
      taskId: string,
      updates: Partial<Task>
    ) => Promise<ActionResult<Task>>
    deleteTask: (taskId: string) => Promise<ActionResult<Task>>
  }
}

export function ContainerCard({
  tasks,
  container,
  onUpdateContainer,
  onDeleteContainer,
  dragProvided,
  dragSnapshot,
  taskActions,
}: ContainerCardProps) {
  // handle container
  const handleDeleteContainer = useCallback(() => {
    return onDeleteContainer() // 已經封裝了所需參數
  }, [onDeleteContainer])

  const handleSave = useCallback(
    async (value: string) => {
      const result = await onUpdateContainer({ type: value })
      if (result.status === 'success') {
        setValueShow(value)
      }
      return result
    },
    [onUpdateContainer]
  )

  // handle task
  const handleCreateTask = useCallback(
    async (updates: Partial<Task>): Promise<ActionResult<Task>> => {
      try {
        const result = await taskActions.createTask(
          container.id,
          updates,
          container.type
        )
        if (result.status === 'error') {
          toast.error(result.error as string)
        }
        return result
      } catch (error) {
        console.error('Error creating task:', error)
        return { status: 'error', error: 'Failed to create task' }
      }
    },
    [taskActions.createTask, container.id, container.type]
  )

  const {
    isEditing,
    editedValue,
    setEditedValue,
    handleStartEdit,
    handleBlur,
    handleKeyDown,
  } = useEditableInput({
    initialValue: container.type,
    onSave: handleSave,
  })

  // 此變數用於樂觀更新
  const [valueShow, setValueShow] = useState<string>(editedValue)

  useEffect(() => {
    setValueShow(editedValue)
  }, [editedValue])

  return (
    <div
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      className={`min-w-[300px] max-w-[300px] ${dragSnapshot.isDragging ? 'z-10' : ''}`}
    >
      <Card
        {...dragProvided.dragHandleProps}
        className={`h-full w-full p-4 transition-all duration-200 ${
          dragSnapshot.isDragging
            ? 'shadow-lg ring-2 ring-[#D4763B] ring-opacity-50'
            : ''
        }`}
      >
        {/* 容器header區域 */}
        <div className="group relative mb-4 flex items-center justify-between">
          {isEditing ? (
            <Input
              type="text"
              value={valueShow}
              onChange={(e) => setEditedValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="h-[36px]"
            />
          ) : (
            <h3 className="text-lg font-semibold" onClick={handleStartEdit}>
              {valueShow}({tasks.length})
            </h3>
          )}
          {!isEditing && (
            <DeleteButtonWithDialog
              deleteItem={handleDeleteContainer} //deleteItem: project /container 共用
              title="確認刪除"
              description={`您確定要刪除此容器嗎？此操作無法復原。`}
              className="!relative !right-0 !top-0 !block !opacity-100"
            />
          )}
        </div>

        {/* 任務列表 */}
        <TaskList
          droppableId={container.type}
          tasks={tasks}
          taskActions={taskActions}
        />

        {/* 添加任務按鈕 */}
        <AddTask
          onCreateTask={(updates: Partial<Task>) => handleCreateTask(updates)}
        />
      </Card>
    </div>
  )
}
