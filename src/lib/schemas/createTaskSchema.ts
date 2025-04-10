import { Priority, TaskStatus } from '@prisma/client'
import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(2, {
    message: '至少2個字',
  }),
  description: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional()
    .nullable(), // 允許 `null`
})

export const materialSchema = z.object({
  material: z
    .string()
    .min(2, {
      message: '至少2個字',
    })
    .optional()
    .nullable(),
  amount: z
    .union([
      z.string().transform((val) => (val === '' ? undefined : Number(val))),
      z.number().min(0, {
        message: '不能低於0',
      }),
    ])
    .optional()
    .nullable(),
  unit: z.string().optional().nullable(),
  costPrice: z
    .union([
      z.string().transform((val) => (val === '' ? undefined : Number(val))),
      z.number().min(0, {
        message: '不能低於0',
      }),
    ])
    .optional()
    .nullable(),
  sellingPrice: z
    .union([
      z.string().transform((val) => (val === '' ? undefined : Number(val))),
      z.number().min(0, {
        message: '不能低於0',
      }),
    ])
    .optional()
    .nullable(),
})

export const moreTaskSchema = z.object({
  dueDate: z.date().nullable().optional(),
  status: z.enum([TaskStatus.todo, TaskStatus.done]).optional(),
  priority: z.enum([Priority.normal, Priority.high]).optional(),
})

export type TaskSchema = z.infer<typeof taskSchema>
export type MaterialSchema = z.infer<typeof materialSchema>
export type MoreTaskSchema = z.infer<typeof moreTaskSchema>
