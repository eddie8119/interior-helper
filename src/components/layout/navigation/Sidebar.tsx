'use client'

import { useState } from 'react'
import { LogoArea } from './LogoArea'
import { NavArea } from './NavArea'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <aside
      className={`border-border nav-shadow hidden border-r bg-sidebar sm:block ${
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
          className="text-icon ml-auto rounded-lg p-2"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </header>
      <NavArea isCollapsed={isCollapsed} />
    </aside>
  )
}
