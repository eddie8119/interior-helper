'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  createProjectInputSchema,
  CreateProjectInputSchema,
} from '@/lib/schemas/createProjectSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { PROJECT_TYPES } from '@/constants/selection'
import { ActionResult } from '@/types'
import { Project } from '@prisma/client'

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
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<CreateProjectInputSchema>({
    resolver: zodResolver(createProjectInputSchema),
    mode: 'onTouched',
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

      <Dialog open={open} onOpenChange={setOpen}>
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
            <TextField
              fullWidth
              label="專案名稱"
              variant="outlined"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message as string}
            />
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
            <DialogFooter className="mt-6">
              <Button
                onClick={() => setOpen(false)}
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
