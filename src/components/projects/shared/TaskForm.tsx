import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Button } from '@/components/core/Button'
import { DeleteButtonWithDialog } from '@/components/core/DeleteButtonWithDialog'
import { FormInput } from '@/components/core/FormInput'
import { MATERIAL_UNITS } from '@/constants/selection'
import {
  materialSchema,
  MaterialSchema,
  taskSchema,
  TaskSchema,
} from '@/lib/schemas/createTaskSchema'

interface TaskFormProps {
  onSubmit: (data: TaskSchema & MaterialSchema) => Promise<void>
  onClose: () => void
  defaultValues?: Partial<TaskSchema & MaterialSchema>
  onDelete?: () => void
  type: 'edit' | 'add'
}

export function TaskForm({
  onSubmit,
  onDelete,
  onClose,
  defaultValues,
  type,
}: TaskFormProps) {
  const [isEditingMore, setIsEditingMore] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid, isSubmitting },
    trigger,
    control,
  } = useForm<TaskSchema & MaterialSchema>({
    resolver: zodResolver(
      isEditingMore ? taskSchema.and(materialSchema) : taskSchema
    ),
    mode: 'onTouched',
    defaultValues,
  })

  useEffect(() => {
    const {
      title,
      description,
      material,
      amount,
      unit,
      costPrice,
      sellingPrice,
    } = getValues()
    reset(
      {
        title: title?.trim(),
        description: description?.trim(),
        material: isEditingMore ? material : undefined,
        amount: isEditingMore ? amount : undefined,
        unit: isEditingMore ? unit : undefined,
        costPrice: isEditingMore ? costPrice : undefined,
        sellingPrice: isEditingMore ? sellingPrice : undefined,
      },
      {
        keepErrors: true,
      }
    )
    trigger()
  }, [isEditingMore, trigger, reset, getValues])

  const handleToggleMore = (e: React.MouseEvent) => {
    // fix bug: 解決切換按鈕觸發表單提交的問題
    e.preventDefault() // 防止表單提交
    setIsEditingMore(!isEditingMore)
  }

  const onSubmitForm = async (data: TaskSchema & MaterialSchema) => {
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div
        className={`relative p-4 pt-10 grid grid-cols-1 gap-2 rounded-lg bg-white  shadow-sm dark:bg-gray-700 `}
      >
        <X
          size={25}
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            onClose()
            reset()
          }}
        />
        <FormInput
          placeholder="任務標題"
          register={register}
          name="title"
          error={errors.title}
        />
        <div className="relative space-y-1">
          <textarea
            placeholder="任務內容"
            {...register('description')}
            className={`h-20 w-full rounded-md border p-2 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />

          {errors.description && (
            <p className="absolute right-1 top-0 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {isEditingMore && (
          <>
            <div className="relative my-2 before:absolute before:left-0 before:top-0 before:h-[1px] before:w-full before:border-t before:border-dashed before:border-gray-400">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-500 dark:bg-gray-700">
                材料資訊 (選填)
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-1">
              <FormInput
                placeholder="材料名稱"
                register={register}
                name="material"
                error={errors.material}
                type="text"
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <FormInput
                placeholder="材料數量"
                register={register}
                name="amount"
                error={errors.amount}
                type="number"
                min="0"
              />
              <FormControl
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '& .MuiInputBase-input': {
                    height: '40px',
                    padding: '0 14px',
                    display: 'flex',
                    alignItems: 'center',
                    lineHeight: '40px',
                  },
                  '& .MuiInputLabel-root': {
                    top: '-5px',
                  },
                  '& .MuiInputLabel-shrink': {
                    top: '0',
                  },
                }}
              >
                <Controller
                  name="unit"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormControl fullWidth>
                      <InputLabel>材料單位</InputLabel>
                      <Select
                        {...field}
                        value={value}
                        label="材料單位"
                        onChange={(e) => {
                          onChange(e.target.value)
                        }}
                      >
                        {MATERIAL_UNITS.map((section) => [
                          <MenuItem
                            key={`header-${section.section}`}
                            disabled
                            sx={{
                              backgroundColor: 'rgb(243 244 246)',
                              fontSize: '0.875rem',
                              color: 'rgb(107 114 128)',
                              fontWeight: 500,
                            }}
                          >
                            {section.section}
                          </MenuItem>,
                          ...section.item.map((item) => (
                            <MenuItem
                              key={item.value}
                              value={item.value}
                              sx={{ pl: 4 }}
                            >
                              {item.label}
                            </MenuItem>
                          )),
                        ])}
                      </Select>
                    </FormControl>
                  )}
                />
              </FormControl>
              <FormInput
                placeholder="單位成本"
                register={register}
                name="costPrice"
                error={errors.costPrice}
                type="number"
                min="0"
              />
              <FormInput
                placeholder="單位售價"
                register={register}
                name="sellingPrice"
                error={errors.sellingPrice}
                type="number"
                min="0"
              />
            </div>
          </>
        )}

        <div className="mt-4 flex justify-end gap-2">
          {onDelete && (
            <DeleteButtonWithDialog
              deleteItem={() => {
                onDelete()
                reset()
              }}
              title="確認刪除"
              description="您確定要刪除任務嗎？此操作無法復原。"
              className="!relative !right-0 !top-0 !block !opacity-100"
            />
          )}

          <Button
            onClick={handleToggleMore}
            type="button" // 明確指定這不是提交按鈕
            className="h-8 rounded-md bg-blue-300 text-black hover:bg-[var(--main-light)]"
          >
            {isEditingMore ? '收起選填欄位' : '輸入更多'}
          </Button>
        </div>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`h-8 rounded-md ${
            !isValid || isSubmitting
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-[var(--main)] hover:bg-[var(--main-light)]'
          } text-black`}
        >
          新增
        </Button>
      </div>
    </form>
  )
}
