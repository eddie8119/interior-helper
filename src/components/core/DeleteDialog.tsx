import { Button } from '@/components/core/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/core/Dialog'

interface DeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  handleDeleteItem: () => void
  title: string
  description: string
}

export function DeleteDialog({
  isOpen,
  onClose,
  handleDeleteItem,
  title,
  description,
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} className="mr-2">
            取消
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteItem}
            className="mr-1 bg-cancel"
          >
            刪除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
