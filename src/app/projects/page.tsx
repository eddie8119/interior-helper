import { Metadata } from 'next'
import { ProjectList } from '@/components/projects/project-list'

export const metadata: Metadata = {
  title: '專案列表 | Interior Helper',
  description: '管理您的室內設計專案，追蹤進度並有效組織工作流程。',
  openGraph: {
    title: '專案列表 | Interior Helper',
    description: '管理您的室內設計專案，追蹤進度並有效組織工作流程。',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'Interior Helper',
  },
  alternates: {
    canonical: '/projects',
  },
}
export default function ProjectsPage() {
  return (
    <section className="flex h-full flex-col">
      <ProjectList />
    </section>
  )
}
