'use client'

import { useState } from 'react'
import { menuLists } from '@/config/menu'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <aside
      className={`border-r border-gray-200 bg-background transition-all duration-300 dark:border-gray-700 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center p-4">
        <div
          className={`flex items-center ${isCollapsed ? 'hidden' : 'block'}`}
        >
          <div className="mr-2 h-8 w-8 rounded-lg bg-blue-500"></div>
          <span className="font-semibold text-foreground">Interior Helper</span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <div className="px-3">
        <nav className="mt-2 space-y-1">
          <a
            href="/dashboard"
            className="flex items-center rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className={isCollapsed ? 'hidden' : 'block'}>Home</span>
          </a>
          {menuLists.map((menu) => (
            <a
              key={menu.id}
              href={`/${menu.link}`}
              className="flex items-center rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className={isCollapsed ? 'hidden' : 'block'}>
                {menu.title}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
