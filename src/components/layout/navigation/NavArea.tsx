'use client'

import Link from 'next/link'
import { menuLists } from '@/config/menu'
import { usePathname } from 'next/navigation'

interface NavAreaProps {
  isCollapsed: boolean
}
export function NavArea({ isCollapsed }: NavAreaProps) {
  const pathname = usePathname()

  return (
    <nav className="mt-2 space-y-1 p-3">
      {menuLists.map((menu) => {
        const Icon = menu.icon
        const isActive = pathname === `/${menu.link}`

        return (
          <Link
            key={menu.id}
            href={`/${menu.link}`}
            className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive
                ? 'bg-card font-medium text-foreground'
                : 'text-gray-button'
            }`}
          >
            <Icon className="mr-2 h-5 w-5" />
            <span className={isCollapsed ? 'hidden' : 'block'}>
              {menu.title}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
