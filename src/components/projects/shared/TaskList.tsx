'use client'

import { Droppable } from '@hello-pangea/dnd'
import { TaskCard } from '@/components/projects/shared/TaskCard'
import { Task } from '@prisma/client'
import { ActionResult } from '@/types'
import { MaterialSchema, TaskSchema } from '@/lib/schemas/createTaskSchema'

interface TaskListProps {
  droppableId: string
  tasks: Task[]
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

export function TaskList({ droppableId, tasks }: TaskListProps) {
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
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
