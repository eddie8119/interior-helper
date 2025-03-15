'use client'

import { CreateProjectDialogClientWrapper } from './CreateProjectDialogClientWrapper'
import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'

export const CreateProjectDialogClient = CreateProjectDialogClientWrapper(
  BaseCreateProjectDialog
)
