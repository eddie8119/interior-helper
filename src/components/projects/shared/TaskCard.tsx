'use client'

import { Draggable } from '@hello-pangea/dnd'
import { Task } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { MaterialSchema, TaskSchema } from '@/lib/schemas/createTaskSchema'
import { ActionResult } from '@/types'
import { TaskForm } from './TaskForm'
interface TaskCardProps {
  task: Task
  index: number
  onCancelTask: (taskId: string) => Promise<ActionResult<Task>>
  onUpdateTask: (
    taskId: string,
    updates: Partial<TaskSchema> & Partial<MaterialSchema>
  ) => Promise<ActionResult<Task>>
}

export function TaskCard({
  task: initialTask,
  index,
  onCancelTask,
  onUpdateTask,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [task, setTask] = useState<Task>(initialTask)

  const handleCancel = async () => {
    try {
      const result = await onCancelTask(task.id)
      if (result.status === 'success') {
        setIsEditing(false)
        toast.success('任務已刪除')
      }
    } catch (error) {
      console.error('Error canceling task:', error)
      toast.error('刪除任務時發生錯誤')
    }
  }

  const handleEditTask = async (
    data: Partial<TaskSchema> & Partial<MaterialSchema>
  ) => {
    try {
      // 修復了空字串無法保存的問題
      // 為空 ''  會無法成功存入 永遠會存1個字
      const { description, material, amount, unit } = data
      const updates = {
        ...data,
        description: description === '' ? null : description,
        material: material === '' ? null : material,
        amount,
        unit: unit === '' ? null : unit,
      }

      const result = await onUpdateTask(task.id, updates)
      if (result.status === 'success') {
        setTask(result.data)
        setIsEditing(false)
        toast.success('任務已更新')
      }
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('更新任務時發生錯誤')
    }
  }

  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault()
  //     handleSave()
  //   } else if (e.key === 'Escape') {
  //     handleCancel()
  //   }
  // }

  const {
    title,
    description,
    material,
    amount,
    unit,
    costPrice,
    sellingPrice,
    priority,
    status,
    dueDate,
  } = task
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`cursor-pointer rounded-lg bg-white  dark:bg-gray-700 ${
            snapshot.isDragging
              ? 'shadow-lg dark:bg-gray-700'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
          onClick={() => !isEditing && setIsEditing(true)}
        >
          {isEditing ? (
            <TaskForm
              onSubmit={handleEditTask}
              onClose={() => setIsEditing(false)}
              defaultValues={{
                title,
                description,
                material,
                amount,
                unit,
                costPrice,
                sellingPrice,
                priority,
                status,
                dueDate,
              }}
              onDelete={handleCancel}
              type="edit"
            />
          ) : (
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{task.title}</h4>
                {task.status === 'reviewing' ||
                  (task.status === 'done' && (
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        task.status === 'reviewing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {task.status === 'reviewing' ? 'reviewing' : 'done'}
                    </span>
                  ))}
              </div>
              <p className="mt-2 min-h-[24px] text-sm text-gray-600 dark:text-gray-400">
                {task.description || '(點擊編輯內容)'}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>
                  到期日：
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : '無'}
                </span>
                {task.priority !== 'high' && (
                  <span>
                    優先級:
                    <span
                      className={
                        'rounded px-2 ml-1 py-1 bg-red-100 text-red-800'
                      }
                    >
                      高
                    </span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}
