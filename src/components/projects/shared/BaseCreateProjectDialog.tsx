'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Chip,
  Checkbox,
  ListItemText,
  FormHelperText,
} from '@mui/material'
import { Project } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/core/Dialog'
import { PROJECT_TYPES, CONSTRUCTION_CONTAINER } from '@/constants/selection'
import {
  createProjectInputSchema,
  CreateProjectInputSchema,
} from '@/lib/schemas/createProjectSchema'
import { ActionResult } from '@/types'
import { ConstructionSelection } from '@/types/selection'

interface BaseCreateProjectDialogProps {
  onSubmit: (data: CreateProjectInputSchema) => Promise<ActionResult<Project>>
}

export function BaseCreateProjectDialog({
  onSubmit,
}: BaseCreateProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<CreateProjectInputSchema>({
    resolver: zodResolver(createProjectInputSchema),
    mode: 'onTouched',
    defaultValues: {
      constructionContainer: [],
    },
  })

  // 專注於 UI 和表單邏輯
  const handleFormSubmit = async (data: CreateProjectInputSchema) => {
    const result = await onSubmit(data)

    if (result.status === 'success') {
      setOpen(false)
      reset()
    } else {
      // 處理 Zod 驗證錯誤
      if (Array.isArray(result.error)) {
        result.error.forEach((e) => {
          setError(e.path[0] as any, {
            type: 'manual',
            message: e.message,
          })
        })
      }
      // 處理一般錯誤
      else if (typeof result.error === 'string') {
        setError('root', {
          type: 'manual',
          message: result.error,
        })
      }
    }
  }

  // constructionContainer 不是一個響應式的值，它不會自動更新 UI
  // watch 會在表單值變化時觸發重新渲染，確保 UI 和表單狀態保持同步
  const selectedTypes = watch('constructionContainer')

  const handleConstructionTypeChange = (event: any) => {
    const selectedIds = event.target.value as string[]
    const selectedConstructions = selectedIds.map((id) => {
      const construction = CONSTRUCTION_CONTAINER.find((c) => c.id === id)
      const { id: constructionId, type, order } = construction!
      return {
        id: constructionId,
        type,
        order,
      }
    })

    // setValue 的更新是非同步的
    setValue('constructionContainer', selectedConstructions, {
      // onChange時 selectedTypes 值並沒有立即更新
      shouldValidate: true, // 立即觸發驗證
      shouldDirty: true, // 標記字段為已修改
      shouldTouch: true, // 標記字段為已觸摸
    })
  }

  return (
    <>
      <Button
        sx={{
          backgroundColor: 'var(--main)',
          color: '#000000',
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: 'var(--main-light)',
            color: '#000000',
          },
        }}
        startIcon={<Plus className="h-4 w-4" />}
        onClick={() => setOpen(true)}
      >
        新增專案
      </Button>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false)
          reset()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新增專案</DialogTitle>
            <DialogDescription>
              新增一個工程專案到您的專案列表中。
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="mt-4 space-y-4"
          >
            {/* 專案名稱 */}
            <TextField
              fullWidth
              label="專案名稱"
              variant="outlined"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message as string}
            />
            {/* 專案類型 */}
            <FormControl fullWidth required>
              <InputLabel>專案類型</InputLabel>
              <Select {...register('type')} label="專案類型">
                {PROJECT_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* 工程種類 */}
            <FormControl
              fullWidth
              required
              error={!!errors.constructionContainer}
            >
              <InputLabel>工程種類</InputLabel>
              <Select
                multiple
                value={selectedTypes?.map((c) => c.id) || []}
                onChange={handleConstructionTypeChange}
                label="工程種類"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip
                        key={value}
                        label={
                          CONSTRUCTION_CONTAINER.find((c) => c.id === value)
                            ?.type
                        }
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {CONSTRUCTION_CONTAINER.map((container) => (
                  <MenuItem key={container.id} value={container.id}>
                    <Checkbox
                      checked={(selectedTypes?.map((c) => c.id) || []).includes(
                        container.id
                      )}
                    />
                    <ListItemText primary={container.type} />
                  </MenuItem>
                ))}
              </Select>
              {errors.constructionContainer && (
                <FormHelperText error>
                  {errors.constructionContainer.message as string}
                </FormHelperText>
              )}
            </FormControl>

            <DialogFooter className="mt-6">
              <Button
                onClick={() => {
                  reset()
                  setOpen(false)
                }}
                className="hover:bg-cancel/90 mr-1 bg-cancel text-white"
              >
                取消
              </Button>
              <LoadingButton
                loading={isSubmitting}
                disabled={!isValid}
                type="submit"
                sx={{
                  backgroundColor: 'var(--main)',
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: 'var(--main-light)',
                    color: '#000000',
                  },
                  '&:disabled': {
                    backgroundColor: 'var(--main-light)',
                    color: 'rgba(0, 0, 0, 0.38)',
                  },
                }}
              >
                新增
              </LoadingButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
