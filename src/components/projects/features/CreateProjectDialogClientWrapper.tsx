'use client'

import { Project } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { projectStorage } from '@/lib/projectStorage'
import { CreateProjectInputSchema } from '@/lib/schemas/createProjectSchema'
import { ActionResult } from '@/types'
import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'

export function CreateProjectDialogClientWrapper(
  WrappedComponent: typeof BaseCreateProjectDialog
) {
  return function ClientProjectDialog() {
    const router = useRouter()

    const handleSubmit = async (
      data: CreateProjectInputSchema
    ): Promise<ActionResult<Project>> => {
      // async: 因為 BaseCreateProjectDialog 期望一個返回 Promise 的函數
      try {
        // 檢查是否超出試用版限制
        if (!projectStorage.canCreateProject()) {
          const error = '試用版最多只能創建 2 個專案'
          toast.error(error)
          return { status: 'error', error }
        }

        const result = projectStorage.createProject(data)

        if (result.status === 'success') {
          toast.success('專案創建成功')
          router.refresh()
          return result
        } else {
          toast.error(result.error as string)
        }
        return result
      } catch (error) {
        const errorMessage = '創建專案失敗'
        toast.error(errorMessage)
        return { status: 'error', error: errorMessage }
      }
    }

    return <WrappedComponent onSubmit={handleSubmit} />
  }
}
