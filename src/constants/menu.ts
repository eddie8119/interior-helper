import CalendarIcon from '@public/icons/menu/calendar.svg'
import HomeIcon from '@public/icons/menu/home.svg'
import ProjectIcon from '@public/icons/menu/project.svg'
import { Menu } from '@/types/project'

export const menuLists: Menu[] = [
  {
    id: '0',
    title: '首頁',
    link: '/',
    icon: HomeIcon,
  },
  {
    id: '1',
    title: '試用版-工程專案列表',
    link: 'trial-projects',
    icon: ProjectIcon,
  },
  {
    id: '2',
    title: '工程專案列表',
    link: 'projects',
    icon: ProjectIcon,
  },
  {
    id: '3',
    title: '行事曆',
    link: 'calendar',
    icon: CalendarIcon,
  },
]
