import { ProjectType } from '@prisma/client'
import { z } from 'zod'

const projectTypeSchema = z.nativeEnum(ProjectType)

export const createProjectInputSchema = z.object({
  title: z.string().min(1, '請輸入專案標題').max(15, '標題不能超過15個字'),
  type: z.enum([
    ProjectType.residential,
    ProjectType.luxury,
    ProjectType.commercial,
    ProjectType.office,
  ]),
})

export const createProjectSchema = createProjectInputSchema.extend({
  startDate: z.date().nullable().optional(),
  dueDate: z.date().nullable().optional(),
  budgetTotal: z.number().nullable().optional().default(0),
  costTotal: z.number().nullable().optional().default(0),
  progress: z.number().optional().default(0),
  containers: z.array(z.any()).optional(),
  team: z.array(z.any()).optional(),
})

export type CreateProjectInputSchema = z.infer<typeof createProjectInputSchema>
export type CreateProjectSchema = z.infer<typeof createProjectSchema>
