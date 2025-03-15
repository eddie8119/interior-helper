'use client'

import { CreateProjectDialogServerWrapper } from './CreateProjectDialogServerWrapper'
import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'

export const CreateProjectDialogServer = CreateProjectDialogServerWrapper(BaseCreateProjectDialog)
