'use client'

import { Project } from '@/types/project'
import { Card } from '@/components/ui/Card'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-xl bg-[#FFE7DE] p-6 dark:bg-gray-800 dark:bg-opacity-50">
      <div className="flex flex-col">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {project.createdAt.toLocaleDateString()}
        </span>
        <div className="mt-4">
          <h3 className="text-xl font-medium dark:text-white">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {project.type}
          </p>
        </div>
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium dark:text-gray-300">
            Progress
          </p>
          <div className="h-2 w-full rounded-full bg-white dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-[#D4763B] transition-all duration-300"
              style={{
                width: `${project.progress}%`,
              }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-sm dark:text-gray-400">
            <span>{project.progress}%</span>
            {project.daysLeft ? <span>{project.daysLeft} Days Left</span> : ''}
          </div>
        </div>
      </div>
    </Card>
  )
}
