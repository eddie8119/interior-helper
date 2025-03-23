'use client'

import { ActionResult } from '@/types'
import { DeleteButton } from './delete-button'
import { DeleteDialog } from './delete-dialog'
import { useState } from 'react'
import { Project } from '@prisma/client'

interface DeleteButtonWithDialogProps {
  // 刪除project / container 共用 deleteItem
  deleteItem: () => Promise<ActionResult<Project>>
  title: string
  description: string
  className?: string
}

export function DeleteButtonWithDialog({
  deleteItem,
  title,
  description,
  className,
}: DeleteButtonWithDialogProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDeleteItem = async () => {
    await deleteItem()
    setIsDeleteDialogOpen(false)
  }

  return (
    <>
      <DeleteButton
        onDelete={() => setIsDeleteDialogOpen(true)}
        className={className}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        handleDeleteItem={handleDeleteItem}
        title={title}
        description={description}
      />
    </>
  )
}
