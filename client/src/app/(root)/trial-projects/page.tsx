import { Metadata } from 'next'
import { ProjectsDisplayClient } from '@/components/projects/display/projects-display-client'

export const metadata: Metadata = {
  title: '試用版專案列表 | Interior Helper',
  description: '體驗 Interior Helper 的專案管理功能',
  openGraph: {
    title: '試用版專案列表 | Interior Helper',
    description: '體驗 Interior Helper 的專案管理功能',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'Interior Helper',
    url: '/trial-projects',
  },
  alternates: {
    canonical: '/trial-projects',
  },
}

export default function TrialProjectsPage() {
  return (
    <section className="flex h-full flex-col">
      <ProjectsDisplayClient
        title="試用版專案列表"
        description="這裡是您的試用版專案，功能受限但可以體驗基本操作"
        url="trial-projects"
      />
    </section>
  )
}
