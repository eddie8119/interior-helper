import { Input } from '@/components/core/Input'
import { CreateTaskInputSchema } from '@/lib/schemas/createTaskSchema'

import { FieldError, UseFormRegister } from 'react-hook-form'

interface FormInputProps {
  placeholder: string
  register: UseFormRegister<CreateTaskInputSchema>
  name: keyof CreateTaskInputSchema
  error?: FieldError
  type?: string
  className?: string
}

export function FormInput({
  placeholder,
  register,
  name,
  error,
  type = 'text',
}: FormInputProps) {
  return (
    <div className="relative space-y-1">
      <Input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`h-8 rounded-md border ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="absolute right-1 top-1 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  )
}
