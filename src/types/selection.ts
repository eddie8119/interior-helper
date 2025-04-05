import { ProjectType } from '@prisma/client'

export interface ProjectTypeSelection {
  value: ProjectType
  label: string
}

export interface materialUnitSelection {
  section: string
  item: { value: string; label: string }[]
}
