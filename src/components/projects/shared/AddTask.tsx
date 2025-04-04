import { Button } from '@/components/core/Button'
import { DeleteButton } from '@/components/core/DeleteButton'
import { FormInput } from '@/components/core/FormInput'
import {
  taskSchema,
  materialSchema,
  TaskSchema,
  combinedTaskSchema,
} from '@/lib/schemas/createTaskSchema'
import { ActionResult } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Task } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
  } = useForm<TaskSchema>({
    resolver: zodResolver(combinedTaskSchema),
    mode: 'onChange',
    defaultValues: {
      // 添加預設值
      amount: 0,
      costPrice: 0,
      sellingPrice: 0,
    },
  })

  const onSubmit = async (data: Partial<Task>) => {
    if (!isValid || isSubmitting) return

    const result = await onCreateTask(data)
    if (result.status === 'success') {
      reset()
      setIsEditing(false)
      setIsEditingMore(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setIsEditingMore(false)
  }

  return (
    <div className="flex flex-col gap-3">
      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
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
                className={`h-20 w-full p-2 rounded-md border ${
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
                    材料資訊
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <FormInput
                    placeholder="材料名稱"
                    register={register}
                    name="material"
                    error={errors.material}
                  />
                  <FormInput
                    placeholder="材料單位"
                    register={register}
                    name="unit"
                    error={errors.unit}
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <FormInput
                    placeholder="數量"
                    register={register}
                    name="amount"
                    error={errors.amount}
                    type="number"
                  />
                  <FormInput
                    placeholder="單位成本"
                    register={register}
                    name="costPrice"
                    error={errors.costPrice}
                    type="number"
                  />
                  <FormInput
                    placeholder="單位售價"
                    register={register}
                    name="sellingPrice"
                    error={errors.sellingPrice}
                    type="number"
                  />
                </div>
              </>
            )}

            <div className="flex justify-end gap-2">
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
                {isEditingMore ? '收起選填欄位' : '展開選填欄位'}
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
              {isSubmitting ? '新增任務' : '新增中...'}
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
