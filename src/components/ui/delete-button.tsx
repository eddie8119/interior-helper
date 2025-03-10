import { Trash2 } from 'lucide-react'

interface DeleteButtonProps {
  onDelete: () => void
  className?: string
}

export function DeleteButton({ onDelete, className }: DeleteButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete()
  }

  return (
    <button
      onClick={handleClick}
      className={`absolute right-4 top-4 z-50 hidden rounded-full p-2 opacity-0 transition-opacity hover:bg-red-50 group-hover:block group-hover:opacity-100 dark:bg-gray-700/80 dark:hover:bg-red-900/80 ${className || ''}`}
    >
      <Trash2 className="h-5 w-5 text-red-500" />
    </button>
  )
}
