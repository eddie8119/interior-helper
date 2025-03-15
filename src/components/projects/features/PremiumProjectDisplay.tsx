'use client'

import { Project } from '@prisma/client'
import { useState } from 'react'
import { deleteProject } from '@/actions/projectActions'
import { toast } from 'react-toastify'
import { BaseProjectDisplay } from '../shared/BaseProjectDisplay'
import { UserTier } from '../constants/projectLimits'

interface PremiumProjectDisplayProps {
  projects: Project[]
  title?: string
  description?: string
  url: string
  userTier: UserTier
  showAddButton?: boolean
  AddProjectDialog: React.ComponentType
}

export default function PremiumProjectDisplay({
  projects: initialProjects,
  title = '付費版專案列表',
  description = '這裡是您的所有專案，您可以無限制地創建專案',
  url,
  userTier,
  AddProjectDialog,
  showAddButton,
}: PremiumProjectDisplayProps) {
  const [projects, setProjects] = useState(initialProjects)

  const handleDeleteProject = async (id: string) => {
    try {
      const result = await deleteProject(id)
      if (result.status === 'success') {
        // 樂觀更新（Optimistic Updates）：立即更新 UI，不等待伺服器響應
        // 更好的用戶體驗：用戶可以立即看到刪除的結果
        // 減少感知延遲：不需要等待頁面重新加載
        setProjects((prev) => prev.filter((p) => p.id !== id))
        toast.success('專案已刪除')
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error('刪除專案時發生錯誤')
    }
  }

  return (
    <BaseProjectDisplay
      projects={projects}
      deleteProject={handleDeleteProject}
      title={title}
      description={description}
      url={url}
      userTier={userTier}
      AddProjectDialog={AddProjectDialog}
      showAddButton={showAddButton}
    />
  )
}

// 那照這樣說 handleDeleteProject 應該要定義在 PremiumProjectDisplayWrapper.tsx 對嗎
// 用戶交互邏輯：
// 刪除操作是用戶交互的一部分
// Display 組件負責處理用戶交互
// 包括顯示成功/失敗的提示訊息
// c. 樂觀更新：
// 立即更新 UI 的邏輯應該與狀態管理緊密相連
// 這種即時反饋是客戶端的職責
