import { z } from 'zod'

// zod 建立的物件驗證 Schema
export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6, {
    message: '',
  }),
})

// z.infer 自動生成型別
// 是registerSchema 該 Schema 對應的 TypeScript 類型
export type RegisterSchema = z.infer<typeof registerSchema>
