'use client'

import { Project } from '@prisma/client'
import { useState } from 'react'
import { ActionResult } from '@/types'
import { DeleteButton } from './DeleteButton'
import { DeleteDialog } from './DeleteDialog'

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
