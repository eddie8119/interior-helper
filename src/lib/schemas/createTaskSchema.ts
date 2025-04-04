import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(2, {
    message: '至少2個字',
  }),
  description: z
    .string()
    .min(1, {
      message: '至少1個字',
    })
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
    .number()
    .min(0, {
      message: '不能低於0',
    })
    .optional()
    .default(0),
  unit: z.string().optional().nullable(),
  costPrice: z
    .number()
    .min(0, {
      message: '不能低於0',
    })
    .optional()
    .default(0),
  sellingPrice: z
    .number()
    .min(0, {
      message: '不能低於0',
    })
    .optional()
    .default(0),
})

export type TaskSchema = z.infer<typeof taskSchema>
export type MaterialSchema = z.infer<typeof materialSchema>
