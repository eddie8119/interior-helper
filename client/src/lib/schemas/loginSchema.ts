import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: '請輸入至少6個字',
  }),
})

export type LoginSchema = z.infer<typeof loginSchema>
