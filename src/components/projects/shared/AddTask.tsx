import { Task } from '@prisma/client'
import { useState } from 'react'
import { MaterialSchema, TaskSchema } from '@/lib/schemas/createTaskSchema'
import { ActionResult } from '@/types'
import { TaskForm } from './TaskForm'

interface AddTaskProps {
  onCreateTask: (updates: Partial<Task>) => Promise<ActionResult<Task>>
}

export function AddTask({ onCreateTask }: AddTaskProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleClose = () => {
    setIsEditing(false)
  }

  const handleSubmit = async (data: TaskSchema & MaterialSchema) => {
    try {
      const result = await onCreateTask(data)
      if (result.status === 'success') {
        handleClose()
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      {isEditing && <TaskForm onSubmit={handleSubmit} onClose={handleClose} />}

      {/* 添加任務 */}
      <button
        onClick={() => setIsEditing(true)}
        className="w-full rounded-md border border-[var(--main)] p-2 text-center text-sm hover:bg-[var(--main)]"
      >
        + 添加任務
      </button>
    </div>
  )
}
