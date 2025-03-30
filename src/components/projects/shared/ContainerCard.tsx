import { Card } from '@/components/ui/card'
import { Container, Task } from '@prisma/client'
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'
import { TaskList } from '@/components/projects/shared/TaskList'
import { DeleteButtonWithDialog } from '@/components/ui/delete-button-with-dialog'
import { ActionResult } from '@/types'
import { useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { useEditableInput } from '@/hooks/useEditableInput'

interface ContainerCardProps {
  tasks: Task[]
  container: Container
  onUpdateContainer: (
    updates: Partial<Container>
  ) => Promise<ActionResult<Container>>
  onDeleteContainer: () => Promise<ActionResult<Container>>
  dragProvided: DraggableProvided
  dragSnapshot: DraggableStateSnapshot
}

export function ContainerCard({
  tasks,
  container,
  onUpdateContainer,
  onDeleteContainer,
  dragProvided,
  dragSnapshot,
}: ContainerCardProps) {
  const handleDeleteContainer = useCallback(() => {
    return onDeleteContainer() // 已經封裝了所需參數
  }, [onDeleteContainer])

  const {
    isEditing,
    editedValue,
    setEditedValue,
    handleStartEdit,
    handleBlur,
    handleSave,
    handleKeyDown,
  } = useEditableInput({
    initialValue: container.type,
    onSave: async (value) => {
      return onUpdateContainer({ type: value })
    },
  })

  return (
    <div
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      className={`min-h-[350px] min-w-[300px] max-w-[300px] ${dragSnapshot.isDragging ? 'z-10' : ''}`}
    >
      <Card
        {...dragProvided.dragHandleProps}
        className={`h-full w-full p-4 transition-all duration-200 ${
          dragSnapshot.isDragging
            ? 'shadow-lg ring-2 ring-[#D4763B] ring-opacity-50'
            : ''
        }`}
      >
        <div className="group relative mb-4 flex items-center justify-between">
          {isEditing ? (
            <Input
              type="text"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="h-[36px]"
            />
          ) : (
            <h3 className="text-lg font-semibold" onClick={handleStartEdit}>
              {container.type}({tasks.length})
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
        <TaskList droppableId={container.type} tasks={tasks} />

        {/* 添加任務按鈕 */}
        <button className="mt-4 w-full rounded-md border border-[var(--main)] p-2 text-center text-sm hover:bg-[var(--main)]">
          + 添加任務
        </button>
      </Card>
    </div>
  )
}
