import React from 'react'
import { Metadata } from 'next'
import { ProjectsServerContainer } from '@/components/projects/projects-server-container'

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
  return (
    <section className="flex h-full flex-col">
      <ProjectsServerContainer />
    </section>
  )
}
