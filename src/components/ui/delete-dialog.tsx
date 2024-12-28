import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

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
            className="hover:bg-[var(--cancel)]/90 mr-1 bg-[var(--cancel)]"
          >
            刪除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
