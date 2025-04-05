'use client'

import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { menuLists } from '@/constants/menu'
import { useProjects } from '@/hooks/useProjects'
import { useProtectedNavigation } from '@/hooks/useProtectedNavigation'
import { Menu } from '@/types/project'

interface NavAreaProps {
  isCollapsed?: boolean
}

export function NavArea({ isCollapsed }: NavAreaProps) {
  const pathname = usePathname()
  const { projects } = useProjects()
  const [menus, setMenus] = useState<Menu[]>(menuLists)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const { handleNavigation } = useProtectedNavigation()

  useEffect(() => {
    if (!projects?.length) return

    const data = projects.map((project) => ({
      id: project.id,
      title: project.title,
    }))

    // 更新 menuLists 中的 subMenu
    const updatedMenus = menuLists.map((menu) => {
      if (menu.title.includes('工程專案列表')) {
        return {
          ...menu,
          subMenu: data,
        }
      }
      return menu
    })

    setMenus(updatedMenus)
  }, [projects])

  return (
    <nav className="mt-2 space-y-1 p-3">
      {menus.map((menu) => {
        const Icon = menu.icon
        const isActive = pathname === `/${menu.link}`
        const hasSubMenu =
          Array.isArray(menu.subMenu) && menu.subMenu.length > 0
        const isMenuActive = activeMenu === menu.id

        return (
          <div key={menu.id} className="space-y-1">
            <Link
              href={`/${menu.link}`}
              onClick={(e) => {
                setActiveMenu(menu.id)
                if (!handleNavigation(menu.link)) {
                  e.preventDefault() // 阻止導航
                }
              }}
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-card font-medium text-foreground'
                  : 'hover:bg-card/50 text-gray-button'
              }`}
            >
              <Icon className="mr-2 h-5 w-5" />
              <span className={isCollapsed ? 'hidden' : 'block'}>
                {menu.title}
              </span>
              {hasSubMenu && !isCollapsed && (
                <span className="ml-auto transform transition-transform duration-200">
                  {isMenuActive ? (
                    <ChevronDown className="h-4 w-4 text-gray-button" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-button" />
                  )}
                </span>
              )}
            </Link>

            {/* 子菜單 */}
            {hasSubMenu && !isCollapsed && isMenuActive && (
              <div className="ml-7 space-y-1">
                {menu.subMenu?.map((subItem) => {
                  // 根據選單標題決定路由前綴
                  const routePrefix =
                    menu.title === '試用版-工程專案列表'
                      ? 'trial-projects'
                      : 'projects'

                  return (
                    <Link
                      key={subItem.id}
                      href={`/${routePrefix}/${subItem.id}`}
                      className={`hover:bg-card/50 block truncate rounded-lg px-3 py-2 text-sm text-gray-button transition-colors ${
                        pathname === `/${routePrefix}/${subItem.id}`
                          ? 'bg-card font-medium text-foreground'
                          : ''
                      }`}
                      onClick={(e) => {
                        if (!handleNavigation(`${routePrefix}/${subItem.id}`)) {
                          e.preventDefault()
                        }
                      }}
                    >
                      {subItem.title}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
