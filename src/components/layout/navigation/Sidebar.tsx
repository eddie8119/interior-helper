'use client'

import { useState } from 'react'
import { LogoArea } from './LogoArea'
import { NavArea } from './NavArea'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <aside
      className={`nav-shadow hidden h-screen border-r border-border bg-sidebar transition-all duration-300 sm:block ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <header className="flex h-16 items-center p-4">
        <div
          className={`flex items-center ${isCollapsed ? 'hidden' : 'block'}`}
        >
          <LogoArea />
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto rounded-lg p-2 text-icon"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </header>
      <div className="h-[calc(100vh-4rem)] overflow-y-auto">
        <NavArea isCollapsed={isCollapsed} />
      </div>
    </aside>
  )
}
