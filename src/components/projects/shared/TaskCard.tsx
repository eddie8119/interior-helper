'use client'

import { Draggable } from '@hello-pangea/dnd'
import { Task } from '@prisma/client'
import { useState } from 'react'
import { Button } from '@/components/core/Button'
import { DeleteButtonWithDialog } from '@/components/core/DeleteButtonWithDialog'
import { Input } from '@/components/core/Input'
import { Textarea } from '@/components/core/Textarea'
import { ActionResult } from '@/types'

interface TaskCardProps {
  task: Task
  index: number
  onCancelTask: (taskId: string) => Promise<ActionResult<Task>>
  onUpdateTask: (
    taskId: string,
    updates: Partial<Task>
  ) => Promise<ActionResult<Task>>
}

export function TaskCard({
  task,
  index,
  onCancelTask,
  onUpdateTask,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedTitle, setEditedTitle] = useState<string>(task.title)
  const [editedContent, setEditedContent] = useState<string | undefined>(
    task.description || ''
  )

  const handleSave = async () => {
    if (!editedTitle.trim()) {
      return
    }

    const titleChanged = editedTitle !== task.title
    const contentChanged = editedContent !== (task.description || '')

    if (titleChanged || contentChanged) {
      await onUpdateTask(task.id, {
        title: editedTitle,
        description: editedContent,
      })
    }

    setIsEditing(false)
  }

  const handleCancel = async () => {
    await onCancelTask(task.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`cursor-pointer rounded-lg bg-white p-3 dark:bg-gray-700 ${
            snapshot.isDragging
              ? 'shadow-lg dark:bg-gray-700'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
          onClick={() => !isEditing && setIsEditing(true)}
        >
          {isEditing ? (
            <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="任務標題"
                className="w-full"
                autoFocus
              />
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="任務內容"
                className="min-h-[60px] w-full"
              />

              <div className="flex justify-end gap-2">
                <DeleteButtonWithDialog
                  deleteItem={handleCancel}
                  title="確認刪除"
                  description={`您確定要刪除任務 "${task.title}" 嗎？此操作無法復原。`}
                  className="!relative !right-0 !top-0 !block !opacity-100"
                />
                <Button
                  onClick={handleSave}
                  className="h-8 rounded-md bg-blue-300 text-black hover:bg-[var(--main-light)]"
                >
                  儲存
                </Button>
              </div>
            </div>
          ) : (
            <>
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
                {task.description || '點擊編輯內容'}
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
            </>
          )}
        </div>
      )}
    </Draggable>
  )
}
