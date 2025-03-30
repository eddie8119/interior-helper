import { z } from 'zod'

export const createTaskInputSchema = z.object({
  title: z.string().min(2, {
    message: '請輸入至少2個字',
  }),
  description: z
    .string()
    .min(1, {
      message: '請輸入至少1個字',
    })
    .optional(),
  material: z
    .string()
    .min(1, {
      message: '請輸入至少1個字',
    })
    .optional(),
  unit: z.string().optional(),
  amount: z
    .number()
    .min(0, {
      message: '不能低於0',
    })
    .optional(),
  budget: z
    .number()
    .min(0, {
      message: '不能低於0',
    })
    .optional(),
  cost: z
    .number()
    .min(0, {
      message: '不能低於0',
    })
    .optional(),
  priority: z.enum(['low', 'high']).optional(),
  dueDate: z.date().optional(),
})

export type CreateTaskInputSchema = z.infer<typeof createTaskInputSchema>
