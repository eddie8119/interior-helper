import React from 'react'
import { Metadata } from 'next'
import { getProjects } from '@/actions/projectActions'
import { ProjectsDisplayServer } from '@/components/projects/display/projects-display-server'

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
export default async function ProjectsPage() {
  const response = await getProjects()
  if (response.status !== 'success') {
    return <div>Error loading projects</div>
  }

  return (
    <section className="flex h-full flex-col">
      <ProjectsDisplayServer
        projects={response.data}
        url="projects"
        title="專案列表"
        description="這裡是您的所有專案，點擊可查看詳細資訊"
      />
    </section>
  )
}
