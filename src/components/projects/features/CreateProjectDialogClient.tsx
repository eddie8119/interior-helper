'use client'

import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'
import { CreateProjectDialogClientWrapper } from './CreateProjectDialogClientWrapper'

export const CreateProjectDialogClient = CreateProjectDialogClientWrapper(
  BaseCreateProjectDialog
)
