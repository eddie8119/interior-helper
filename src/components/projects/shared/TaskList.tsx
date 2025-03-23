'use client'

import { Droppable } from '@hello-pangea/dnd'
import { TaskCard } from '@/components/projects/shared/TaskCard'
import { Task } from '@prisma/client'

interface TaskListProps {
  droppableId: string
  tasks: Task[]
}

export function TaskList({ droppableId, tasks }: TaskListProps) {
  return (
    <Droppable droppableId={droppableId} type="task">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`min-h-[200px] space-y-3 rounded-lg transition-colors ${
            snapshot.isDraggingOver ? 'bg-gray-50 dark:bg-gray-800' : ''
          }`}
        >
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
