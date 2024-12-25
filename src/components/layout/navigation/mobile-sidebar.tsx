import { NavArea } from './nav-area'

interface MobileSidebarProps {
  isOpen: boolean
}

export function MobileSidebar({ isOpen }: MobileSidebarProps) {
  return (
    <aside
      className={`nav-shadow border-border fixed left-0 top-0 z-[999] h-full w-1/2 transform border-r bg-sidebar transition-transform duration-300 ease-in-out sm:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <NavArea />
    </aside>
  )
}
