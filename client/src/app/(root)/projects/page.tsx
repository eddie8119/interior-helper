import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjects } from '@/actions/projectActions'
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
    return notFound()
  }
  const { data } = response

  return (
    <section className="flex h-full flex-col">
      <ProjectsDisplay projects={data} />
    </section>
  )
}
