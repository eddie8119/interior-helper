'use client'

import { useState } from 'react'
import { menuLists } from '@/config/menu'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <aside
      className={`dark:bg-sidebar-dark border-r border-gray-200 bg-[var(--sidebar)] transition-all duration-300 hover:bg-[var(--sidebar-hover)] dark:border-gray-700 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <header className="flex items-center p-4">
        <div
          className={`flex items-center ${isCollapsed ? 'hidden' : 'block'}`}
        >
          <div className="mr-2 h-8 w-8 rounded-lg bg-yellow-400"></div>
          <span className="font-semibold text-foreground">Interior Helper</span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-sidebar-hover ml-auto rounded-lg p-2 text-gray-600 dark:text-gray-400"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </header>

      <nav className="mt-2 space-y-1 p-3">
        {menuLists.map((menu) => {
          const Icon = menu.icon
          return (
            <a
              key={menu.id}
              href={`/${menu.link}`}
              className="hover:bg-sidebar-hover flex items-center rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <Icon className="mr-2 h-5 w-5" />
              <span className={isCollapsed ? 'hidden' : 'block'}>
                {menu.title}
              </span>
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
