import { withServerAction } from './CreateProjectDialogServerWrapper'
import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'

export const CreateProjectDialogServer = withServerAction(BaseCreateProjectDialog)
