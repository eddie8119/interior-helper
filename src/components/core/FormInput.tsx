import { MaterialSchema, TaskSchema } from '@/lib/schemas/createTaskSchema'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { TextField } from '@mui/material'

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
    <TextField
      fullWidth
      label={placeholder}
      variant="outlined"
      type={type}
      {...register(name)}
      error={!!error}
      helperText={error?.message as string}
      inputProps={{ min }}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '40px', // 設定外框高度
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiInputBase-input': {
          height: '40px', // 讓輸入文字的框也等於 40px
          padding: '0 14px', // 調整左右間距
          display: 'flex',
          alignItems: 'center',
          lineHeight: '40px', // 讓文字內容對齊
        },
        '& .MuiInputLabel-root': {
          top: '-5px', // 調整 label 位置
        },
        '& .MuiInputLabel-shrink': {
          top: '0', // 當 label 上移時，位置調整
        },
      }}
    />
  )
}
