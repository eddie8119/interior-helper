import { Button } from '@/components/core/Button'
import { DeleteButton } from '@/components/core/DeleteButton'
import { FormInput } from '@/components/core/FormInput'
import {
  taskSchema,
  materialSchema,
  TaskSchema,
  MaterialSchema,
} from '@/lib/schemas/createTaskSchema'
import { ActionResult } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Task } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MATERIAL_UNITS } from '@/constants/selection'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'

interface AddTaskProps {
  onCreateTask: (updates: Partial<Task>) => Promise<ActionResult<Task>>
}

export function AddTask({ onCreateTask }: AddTaskProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isEditingMore, setIsEditingMore] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    trigger,
  } = useForm<TaskSchema & MaterialSchema>({
    resolver: zodResolver(
      isEditingMore ? taskSchema.and(materialSchema) : taskSchema
    ),
    mode: 'onTouched',
  })

  useEffect(() => {
    trigger()
  }, [isEditingMore, trigger])

  const handleCancel = () => {
    reset()
    setIsEditing(false)
    setIsEditingMore(false)
  }

  const onSubmit = async (data: TaskSchema & MaterialSchema) => {
    if (!isValid || isSubmitting) return

    try {
      const { title, description } = data
      const submitData = isEditingMore
        ? data
        : {
            title,
            description,
          }

      const result = await onCreateTask(submitData)
      if (result.status === 'success') {
        handleCancel()
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-2 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
            <FormInput
              placeholder="任務"
              register={register}
              name="title"
              error={errors.title}
            />
            <div className="relative space-y-1">
              <textarea
                placeholder="新增內容"
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
                  >
                    <InputLabel>材料單位</InputLabel>
                    <Select {...register('unit')} label="材料單位">
                      {MATERIAL_UNITS.map((unit) => (
                        <div key={unit.section}>
                          <MenuItem
                            disabled
                            sx={{
                              backgroundColor: 'rgb(243 244 246)',
                              fontSize: '0.875rem',
                              color: 'rgb(107 114 128)',
                              fontWeight: 500,
                            }}
                          >
                            {unit.section}
                          </MenuItem>
                          {unit.item.map((item) => (
                            <MenuItem
                              key={item.value}
                              value={item.value}
                              sx={{
                                pl: 4,
                              }}
                            >
                              {item.label}
                            </MenuItem>
                          ))}
                        </div>
                      ))}
                    </Select>
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
              <DeleteButton
                onDelete={() => {
                  handleCancel()
                  reset()
                }}
                className="!relative !right-0 !top-0 !block !opacity-100"
              />
              <Button
                onClick={() => setIsEditingMore(!isEditingMore)}
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
      )}

      {/* 添加任務 */}
      <button
        onClick={() => setIsEditing(true)}
        className="w-full rounded-md border border-[var(--main)] p-2 text-center text-sm hover:bg-[var(--main)]"
      >
        + 添加任務
      </button>
    </div>
  )
}
