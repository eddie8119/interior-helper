'use client'

import { useState } from 'react'
import { LogoArea } from './logo-area'
import { NavArea } from './nav-area'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <aside
      className={`nav-shadow border-border hidden h-screen border-r bg-sidebar transition-all duration-300 sm:block ${
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
          className="text-icon ml-auto rounded-lg p-2"
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
