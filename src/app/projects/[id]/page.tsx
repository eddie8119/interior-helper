'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Project } from '@/types/project'
import { Card } from '@/components/ui/Card'

export default function ProjectDetailsPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockProject: Project = {
      id: params.id as string,
      title: '範例專案',
      type: '室內裝修',
      progress: 30,
      daysLeft: 14,
      createdAt: new Date(),
    }
    setProject(mockProject)
  }, [params.id])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {project.type}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">進度</h2>
          <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-[#D4763B] transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{project.progress}% 完成</span>
            {project.daysLeft && <span>剩餘 {project.daysLeft} 天</span>}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">專案詳情</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">開始日期</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {project.createdAt.toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">預計完工日期</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date(
                  project.createdAt.getTime() +
                    (project.daysLeft || 0) * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
