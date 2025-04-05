import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, min, ...props }, ref) => {
    return (
      <input
        type={type}
        min={min}
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-background px-3 py-2 text-lg font-semibold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        autoFocus
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }

// ...props :
// 除 className 和 type 外 所有 props 會自動傳遞

// 很基本的動作handleKeyDown  可以直接定義在此內部嗎? 還是會太耦合
// 不好保持基礎 Input 組件的純粹性和通用性
// 通過 hooks 或包裝組件提供常用功能
// (決定使用Hook 還是自定義組件)
// src\hooks\useEditableInput.ts
