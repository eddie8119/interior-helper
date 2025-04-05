import { Input } from '@/components/core/Input'
import { MaterialSchema, TaskSchema } from '@/lib/schemas/createTaskSchema'

import { FieldError, UseFormRegister } from 'react-hook-form'

interface FormInputProps {
  placeholder: string
  register: UseFormRegister<TaskSchema & MaterialSchema>
  name: keyof (TaskSchema & MaterialSchema)
  error?: FieldError
  type?: string
  className?: string
  min?: string
}

export function FormInput({
  placeholder,
  register,
  name,
  error,
  type = 'text',
  className,
  min,
}: FormInputProps) {
  return (
    <div className="relative space-y-1">
      <Input
        type={type}
        min={min}
        placeholder={placeholder}
        {...register(name)}
        className={`h-8 rounded-md border ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      />
      {error && (
        <p className="absolute right-1 top-1 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  )
}
