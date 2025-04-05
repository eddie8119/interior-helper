'use client'

import { Droppable } from '@hello-pangea/dnd'
import { TaskCard } from '@/components/projects/shared/TaskCard'
import { Task } from '@prisma/client'
import { ActionResult } from '@/types'

interface TaskListProps {
  droppableId: string
  tasks: Task[]
  onCancelTask: (taskId: string) => Promise<ActionResult<Task>>
  onUpdateTask: (
    taskId: string,
    updates: Partial<Task>
  ) => Promise<ActionResult<Task>>
}

export function TaskList({
  droppableId,
  tasks,
  onCancelTask,
  onUpdateTask,
}: TaskListProps) {
  return (
    <Droppable droppableId={droppableId} type="task">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`space-y-3 rounded-lg transition-colors ${
            snapshot.isDraggingOver ? 'bg-gray-50 dark:bg-gray-800' : ''
          }`}
        >
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onCancelTask={onCancelTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
