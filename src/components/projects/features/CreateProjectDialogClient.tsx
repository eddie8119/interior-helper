'use client'

import { withClientHook } from './CreateProjectDialogClientWrapper'
import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'

export const CreateProjectDialogClient = withClientHook(BaseCreateProjectDialog)
