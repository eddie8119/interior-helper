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
  task,
  index,
  onCancelTask,
  onUpdateTask,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

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

  const handleSubmit = async (
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
              onSubmit={handleSubmit}
              onClose={() => setIsEditing(false)}
              defaultValues={{
                title: task.title,
                description: task.description || '',
                material: task.material || '',
                amount: task.amount || undefined,
                unit: task.unit || '',
                costPrice: task.costPrice || undefined,
                sellingPrice: task.sellingPrice || undefined,
              }}
              onDelete={handleCancel}
            />
          ) : (
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{task.title}</h4>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    task.status === 'todo'
                      ? 'bg-yellow-100 text-yellow-800'
                      : task.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                  }`}
                >
                  {task.status === 'todo'
                    ? '待辦'
                    : task.status === 'in-progress'
                      ? '進行中'
                      : '完成'}
                </span>
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
                <span>
                  優先級:
                  <span
                    className={`rounded px-2 py-1 ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'medium'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {task.priority === 'high'
                      ? '高'
                      : task.priority === 'medium'
                        ? '中'
                        : '低'}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}
