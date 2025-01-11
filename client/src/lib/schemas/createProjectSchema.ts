import { z } from 'zod'

const projectTypeEnum = z.enum([
  'residential',
  'luxury',
  'commercial',
  'office',
] as const)

export const createProjectSchema = z.object({
  title: z.string().min(1, {
    message: '請輸入專案標題',
  }),
  type: projectTypeEnum,
})

export type CreateProjectSchema = z.infer<typeof createProjectSchema>
