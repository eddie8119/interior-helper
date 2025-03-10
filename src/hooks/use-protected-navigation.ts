import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLoginDialog } from '@/contexts/login-dialog-context'
import { publicRoutes } from '@/routes'

export const useProtectedNavigation = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { openLoginDialog } = useLoginDialog()

  const handleNavigation = (link: string) => {
    // 移除開頭的斜線（如果有的話）
    const normalizedLink = link.startsWith('/') ? link : `/${link}`

    // 檢查是否為公開路由
    const isPublicRoute = publicRoutes.some((route) => {
      const regex = new RegExp(`^${route}$`)
      return regex.test(normalizedLink)
    })

    if (isPublicRoute || session) {
      // 如果是公開路由或已登入，直接導航
      router.push(normalizedLink)
      return true
    } else {
      // 如果不是公開路由且未登入，顯示登入彈窗
      openLoginDialog()
      return false
    }
  }

  return { handleNavigation }
}

// 使用 Next-Auth 會比 localStorage 更安全和更完整

// Next-Auth 的優勢:
// 更安全的 session 管理（不會暴露在 localStorage）
// 內建 CSRF 保護
// 完整的類型支援
// 自動處理 token 刷新
// 可以輕鬆擴展多種登入方式（Google, GitHub 等）

// 使用 cookies 需要：
// 手動處理所有安全問題
// 自己實現 session 管理邏輯
// 處理跨域問題
// 手動處理過期和刷新
