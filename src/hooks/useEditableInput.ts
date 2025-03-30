import { useState, useCallback, useEffect, useRef } from 'react'
import { ActionResult } from '@/types'

interface UseEditableInputProps<T> {
  initialValue: string
  onSave: (value: string) => Promise<ActionResult<T>>
}

export function useEditableInput<T>({
  initialValue,
  onSave,
}: UseEditableInputProps<T>) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedValue, setEditedValue] = useState<string>(initialValue)
  const blurTimeoutRef = useRef<NodeJS.Timeout>()

  const handleBlur = useCallback(() => {
    // Input 內設置了onBlur 導致按確認按鈕 會觸發onBlur
    // 使用 setTimeout 延遲執行，給按鈕點擊事件一個機會
    blurTimeoutRef.current = setTimeout(() => {
      setEditedValue(initialValue)
      setIsEditing(false)
    }, 200)
  }, [initialValue])

  const handleStartEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleCancel = useCallback(() => {
    setEditedValue(initialValue)
    setIsEditing(false)
  }, [initialValue])

  const handleSave = useCallback(async () => {
    // 清除可能存在的 blur timeout
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
    }

    if (editedValue.trim() === '') return
    try {
      if (editedValue.trim() !== initialValue) {
        await onSave(editedValue.trim())
      }
    } catch (error) {
      console.error(error)
    }
    setEditedValue(initialValue)
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

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current)
      }
    }
  }, [])

  return {
    isEditing,
    editedValue,
    setEditedValue,
    handleStartEdit,
    handleBlur,
    handleCancel,
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
