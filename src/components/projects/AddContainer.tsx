'use client'

import { useState } from 'react'
import { Project } from '@prisma/client'
import { ActionResult } from '@/types'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface AddContainerProps {
  // 只接收 type 參數
  onCreateContainer: (data: { type: string }) => Promise<ActionResult<Project>>
}

export function AddContainer({ onCreateContainer }: AddContainerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newContainerType, setNewContainerType] = useState('')

  const handleCreateContainer = async () => {
    if (!newContainerType.trim()) return

    await onCreateContainer({
      type: newContainerType,
    })

    setNewContainerType('')
    setIsCreating(false)
  }

  return (
    <div className="h-[350px] w-[300px]">
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
              className="border-red-500 text-red-500"
              onClick={() => {
                setIsCreating(false)
                setNewContainerType('')
              }}
            >
              取消
            </Button>
            <Button
              className="bg-[var(--main)]"
              onClick={handleCreateContainer}
            >
              確認
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          variant="outline"
          className="h-full w-full border-dashed border-[var(--main)]"
          onClick={() => setIsCreating(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          添加工程類型
        </Button>
      )}
    </div>
  )
}
