import { LoginRegisterArea } from '@/components/layout/login-register-area'
import { ThemeToggle } from './theme-toggle'
import UserMenu from './user-menu'
import { auth } from '@/auth'

export async function HeaderRightSection() {
  const session = await auth()
  const userInfo = session?.user

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />

      {/* Notifications */}
      <button className="relative p-2 text-gray-600 hover:text-gray-900">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
      </button>

      {/* Help */}
      <button className="p-2 text-gray-600 hover:text-gray-900">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      {userInfo ? <UserMenu userInfo={userInfo} /> : <LoginRegisterArea />}
    </div>
  )
}
