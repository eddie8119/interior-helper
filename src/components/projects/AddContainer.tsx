import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useEditableInput } from '@/hooks/useEditableInput'
import { ActionResult } from '@/types'
import { useCallback } from 'react'

interface AddContainerProps {
  onCreateContainer: (params: { type: string }) => Promise<ActionResult<any>>
}

export function AddContainer({ onCreateContainer }: AddContainerProps) {
  const handleSaveCreateContainer = useCallback(
    async (value: string) => {
      if (!value.trim())
        return { status: 'error' as const, error: '輸入不能為空' }
      try {
        const result = await onCreateContainer({ type: value.trim() })
        if (result.status === 'success') {
          setEditedValue('') // 清空輸入
          return result
        } else {
          return { status: 'error' as const, error: result.error as string }
        }
      } catch (error) {
        return { status: 'error' as const, error: '創建容器失敗' }
      }
    },
    [onCreateContainer]
  )

  const {
    isEditing,
    editedValue,
    setEditedValue,
    handleStartEdit,
    handleBlur,
    handleCancel,
    handleSave,
    handleKeyDown,
  } = useEditableInput({
    initialValue: '',
    onSave: handleSaveCreateContainer,
  })

  return (
    <div className="h-[350px] w-[300px]">
      {isEditing ? (
        <Card className="p-4">
          <Input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="輸入容器類型"
            className="mb-2"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="border-cancel text-cancel"
              onClick={handleCancel}
            >
              取消
            </Button>
            <Button className="bg-[var(--main)]" onClick={handleSave}>
              確認
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          variant="outline"
          className="h-full w-full border-dashed border-[var(--main)]"
          onClick={handleStartEdit}
        >
          <Plus className="mr-2 h-4 w-4" />
          添加工程類型
        </Button>
      )}
    </div>
  )
}
