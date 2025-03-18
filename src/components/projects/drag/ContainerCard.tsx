import { Card } from '@/components/ui/card'
import { Task } from '@/types/project'
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'
import { TaskList } from '@/components/projects/drag/TaskList'
import { DeleteButtonWithDialog } from '@/components/ui/delete-button-with-dialog'

interface ContainerCardProps {
  type: string
  tasks: Task[]
  onDelete: () => void
  dragProvided: DraggableProvided
  dragSnapshot: DraggableStateSnapshot
}

export function ContainerCard({
  type,
  tasks,
  onDelete,
  dragProvided,
  dragSnapshot,
}: ContainerCardProps) {
  return (
    <div
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      className={`min-w-[300px] ${dragSnapshot.isDragging ? 'z-10' : ''}`}
    >
      <Card
        {...dragProvided.dragHandleProps}
        className={`p-4 transition-all duration-200 ${
          dragSnapshot.isDragging
            ? 'shadow-lg ring-2 ring-[#D4763B] ring-opacity-50'
            : ''
        }`}
      >
        <div className="group relative mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {type}({tasks.length})
          </h3>
          <DeleteButtonWithDialog
            deleteItem={onDelete}
            title="確認刪除"
            description={`您確定要刪除此容器嗎？此操作無法復原。`}
            className="!relative !right-0 !top-0 !block !opacity-100"
          />
        </div>

        {/* 任務列表 */}
        <TaskList droppableId={type} tasks={tasks} />

        {/* 添加任務按鈕 */}
        <button className="mt-4 w-full rounded-lg border border-dashed border-gray-300 p-2 text-center text-sm text-gray-500 hover:border-[#D4763B] hover:text-[#D4763B] dark:border-gray-600 dark:hover:border-[#D4763B]">
          + 添加任務
        </button>
      </Card>
    </div>
  )
}
