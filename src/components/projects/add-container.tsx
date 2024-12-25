'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface AddContainerProps {
  onCreateContainer: (data: { type: string }) => void
}

export function AddContainer({ onCreateContainer }: AddContainerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newContainerType, setNewContainerType] = useState('')

  const handleCreateContainer = () => {
    if (!newContainerType.trim()) return

    onCreateContainer({
      type: newContainerType,
    })

    setNewContainerType('')
    setIsCreating(false)
  }

  return (
    <div className="min-w-[300px]">
      {isCreating ? (
        <Card className="p-4">
          <Input
            value={newContainerType}
            onChange={(e) => setNewContainerType(e.target.value)}
            placeholder="輸入容器類型"
            className="mb-2"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsCreating(false)
                setNewContainerType('')
              }}
            >
              取消
            </Button>
            <Button onClick={handleCreateContainer}>確認</Button>
          </div>
        </Card>
      ) : (
        <Button
          variant="outline"
          className="h-full w-full border-dashed"
          onClick={() => setIsCreating(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          添加容器
        </Button>
      )}
    </div>
  )
}
