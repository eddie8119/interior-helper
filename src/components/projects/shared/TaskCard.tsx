'use client'

import { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { Task } from '@prisma/client'

interface TaskCardProps {
  task: Task
  index: number
}

export function TaskCard({ task, index }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedTitle, setEditedTitle] = useState<string>(task.title)
  const [editedContent, setEditedContent] = useState<string | undefined>(
    task.content || ''
  )

  const handleSave = () => {
    if (!editedTitle.trim()) {
      return
    }

    const titleChanged = editedTitle !== task.title
    const contentChanged = editedContent !== (task.content || '')

    if (titleChanged || contentChanged) {
      // onUpdate(task.id, {
      //   title: editedTitle,
      //   content: editedContent,
      // })
    }

    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(task.title)
    setEditedContent(task.content || '')
    setIsEditing(false)
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
                <Button
                  className="hover:bg-cancel/90 bg-cancel text-white"
                  onClick={handleCancel}
                >
                  <X className="mr-1 h-4 w-4" />
                  取消
                </Button>
                <Button onClick={handleSave}>
                  <Check className="mr-1 h-4 w-4" />
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
                {task.content || '點擊編輯內容'}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>
                  到期日：
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : '無'}
                </span>
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
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  )
}
