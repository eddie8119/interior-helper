import { getProjects } from '@/actions/projectActions'
import { CreateProjectDialogServer } from './CreateProjectDialogServer'
import PremiumProjectDisplay from './PremiumProjectDisplay'

export default async function PremiumProjectDisplayWrapper() {
  const projectsResponse = await getProjects()
  if (projectsResponse.status !== 'success') {
    return <div>Error loading projects</div>
  }

  return (
    <PremiumProjectDisplay
      projects={projectsResponse.data}
      userTier="premium"
      url="projects"
      title="專案列表"
      description="這裡是您的所有專案，點擊可查看詳細資訊"
      showAddButton={true}
      AddProjectDialog={CreateProjectDialogServer}
    />
  )
}

// PremiumProjectDisplayWrapper.tsx 與 PremiumProjectDisplay.tsx  可以合併成一個組件嗎
// 功能衝突：
// 伺服器組件不能使用 React hooks
// 客戶端組件不能直接使用 async/await 獲取數據
// Next.js 的設計原則：
// 伺服器組件用於數據獲取和初始渲染
// 客戶端組件用於交互和狀態管理

// CreateProjectDialogServer 組件的獲得位置 在 PremiumProjectDisplayWrapper.tsx 還是 PremiumProjectDisplay.tsx  哪一個比較理想
// 關注點分離：
// Wrapper 負責組件的配置和組裝
// Display 組件應該只關注於展示和交互邏輯
// 組件的可重用性：
// Display 組件不應該與特定的對話框組件耦合
// 通過 props 傳遞對話框組件使得 Display 更靈活
// 依賴注入原則：
// 讓上層組件決定使用哪個對話框組件
// 下層組件只需要知道它會收到一個對話框組件
// 配置的集中管理：
// 所有的配置（包括對話框的選擇）都在 Wrapper 中完成
// 使得配置更容易管理和修改

// 正確的職責分配：
// Wrapper（伺服器組件）：
// 初始數據獲取
// 組件配置
// 靜態內容
// Display（客戶端組件）：
// 狀態管理
// 用戶交互處理
// UI 更新
// 提示訊息
