'use client'

import { useState } from 'react'
import { LogoArea } from './LogoArea'
import { NavArea } from './NavArea'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <aside
      className={`hidden border-r border-border bg-sidebar sm:block ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <header className="flex items-center p-4">
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
      <NavArea isCollapsed={isCollapsed} />
    </aside>
  )
}
