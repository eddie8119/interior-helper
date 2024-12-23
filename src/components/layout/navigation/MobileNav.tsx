'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LogoArea } from './logoArea'
import { MobileSidebar } from './mobileSidebar'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="nav-shadow fixed left-0 right-0 top-0 z-[999] border-t border-border bg-sidebar sm:hidden">
        {/* Mobile Menu Button */}
        <div className="flex h-16 items-center justify-between px-4">
          <LogoArea width={32} height={32} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-icon"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <MobileSidebar isOpen={isOpen} />
    </>
  )
}
