'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { ActionResult } from '@/types'
import { Project } from '@prisma/client'
import { createProject } from '@/actions/projectActions'
import { CreateProjectInputSchema } from '@/lib/schemas/createProjectSchema'
import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'

export function CreateProjectDialogServerWrapper(
  WrappedComponent: typeof BaseCreateProjectDialog
) {
  return function ServerProjectDialog() {
    const router = useRouter()

    const handleSubmit = async (
      data: CreateProjectInputSchema
    ): Promise<ActionResult<Project>> => {
      try {
        const result = await createProject(data)

        if (result.status === 'success') {
          toast.success('專案創建成功')
          router.refresh()
          return result
        }
        return { status: 'error', error: result.error }
      } catch (error) {
        console.error('創建專案失敗:', error)
        toast.error('創建專案失敗')
        return { status: 'error', error: '創建專案失敗' }
      }
    }

    return <WrappedComponent onSubmit={handleSubmit} />
  }
}
