import { DeleteButton } from './delete-button'
import { DeleteDialog } from './delete-dialog'
import { useState } from 'react'

interface DeleteButtonWithDialogProps {
  deleteItem: () => void
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

  const handleDeleteItem = () => {
    deleteItem()
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
