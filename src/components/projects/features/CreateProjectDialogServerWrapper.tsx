'use client'

import { useRouter } from 'next/navigation'
import { createProject } from '@/actions/projectActions'
import { CreateProjectInputSchema } from '@/lib/schemas/createProjectSchema'
import { BaseCreateProjectDialog } from '../shared/BaseCreateProjectDialog'
import { toast } from 'react-toastify'

export function CreateProjectDialogServerWrapper(
  WrappedComponent: typeof BaseCreateProjectDialog
) {
  return function ServerActionProjectDialog() {
    const router = useRouter()

    const handleSubmit = async (data: CreateProjectInputSchema) => {
      try {
        const result = await createProject(data)

        if (result.status === 'success') {
          toast.success('專案創建成功')
          router.refresh()
        }
        return result
      } catch (error) {
        console.error('創建專案失敗:', error)
        toast.error('創建專案失敗')
        return { status: 'error', error: '創建專案失敗' }
      }
    }

    return <WrappedComponent onSubmit={handleSubmit} />
  }
}
