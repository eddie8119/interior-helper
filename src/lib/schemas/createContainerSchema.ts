import { z } from 'zod'

export const createContainerInputSchema = z.object({
  type: z.string().min(2, {
    message: '請輸入至少2個字',
  }),
})

export type CreateContainerInputSchema = z.infer<
  typeof createContainerInputSchema
>
