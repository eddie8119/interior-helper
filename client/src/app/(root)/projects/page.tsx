import React from 'react'
import { Metadata } from 'next'
import { getProjects, createProject } from '@/actions/projectActions'
import { ProjectsDisplay } from '@/components/projects/projects-display'

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
  if (response.status !== 'success' || !response.data) {
    return <div>Error: Failed to load projects</div>
  }
  const { data } = response

  return (
    <section className="flex h-full flex-col">
      <ProjectsDisplay projects={data} createProject={createProject} />
    </section>
  )
}
