import { useState, useCallback } from 'react'
import { ActionResult } from '@/types'

interface UseEditableInputProps<T> {
  initialValue: string
  onSave: (value: string) => Promise<ActionResult<T>>
}

export function useEditableInput<T>({
  initialValue,
  onSave,
}: UseEditableInputProps<T>) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(initialValue)

  const handleStartEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleSave = useCallback(async () => {
    if (editedValue.trim() === '') return
    try {
      if (editedValue.trim() !== initialValue) {
        await onSave(editedValue.trim())
      }
    } catch (error) {
      console.error(error)
    }
    setIsEditing(false)
  }, [editedValue, initialValue, onSave])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSave()
      } else if (e.key === 'Escape') {
        setEditedValue(initialValue)
        setIsEditing(false)
      }
    },
    [handleSave, initialValue]
  )

  return {
    isEditing,
    editedValue,
    setEditedValue,
    handleStartEdit,
    handleSave,
    handleKeyDown,
  }
}

// 很常跟<Input> 用在一起  有什麼好的共用方式?
// 如果不同地方的編輯邏輯和 UI 差異較大，使用 Hook 方案

// Hook 方案：
// ✅ 更靈活，可以完全控制 UI
// ✅ 可以輕鬆擴展功能
// ❌ 需要寫更多樣板代碼
// 組件方案：
// ✅ 使用更簡單，代碼更少
// ✅ UI 邏輯封裝得更好
// ❌ 靈活性相對較低
