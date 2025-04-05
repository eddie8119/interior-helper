'use client'

import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'
import { CreateProjectDialogServerWrapper } from './CreateProjectDialogServerWrapper'

export const CreateProjectDialogServer = CreateProjectDialogServerWrapper(
  BaseCreateProjectDialog
)
