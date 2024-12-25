'use client'

import { Task } from '@/types/project'
import { cn } from '@/lib/utils'
import { Droppable, Draggable } from '@hello-pangea/dnd'

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
          className={cn(
            'min-h-[200px] space-y-3 rounded-lg transition-colors',
            snapshot.isDraggingOver ? 'bg-gray-50 dark:bg-gray-800' : ''
          )}
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={cn(
                    'rounded-lg bg-white p-3 dark:bg-gray-700',
                    snapshot.isDragging
                      ? 'shadow-lg dark:bg-gray-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{task.title}</h4>
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-xs',
                        task.status === 'todo'
                          ? 'bg-yellow-100 text-yellow-800'
                          : task.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                      )}
                    >
                      {task.status === 'todo'
                        ? '待辦'
                        : task.status === 'in-progress'
                          ? '進行中'
                          : '完成'}
                    </span>
                  </div>
                  {task.content && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {task.content}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>
                      到期日：
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : '無'}
                    </span>
                    <span
                      className={cn(
                        'rounded px-2 py-1',
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                      )}
                    >
                      {task.priority === 'high'
                        ? '高'
                        : task.priority === 'medium'
                          ? '中'
                          : '低'}
                    </span>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
