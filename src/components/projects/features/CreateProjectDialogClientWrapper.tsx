'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { ActionResult } from '@/types'
import { Project } from '@prisma/client'
import { projectStorage } from '@/lib/projectStorage'
import { CreateProjectInputSchema } from '@/lib/schemas/createProjectSchema'
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
          // 顯示錯誤訊息
          toast.error('創建專案失敗')
          return result
        }
      } catch (error) {
        console.error('創建專案失敗:', error)
        toast.error('創建專案失敗')
        return { status: 'error', error: '創建專案失敗' }
      }
    }

    return <WrappedComponent onSubmit={handleSubmit} />
  }
}
