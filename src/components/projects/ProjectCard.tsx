'use client'

import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { Project } from '@/types/project'
import { Card } from '@/components/ui/Card'

interface ProjectCardProps {
  project: Project
  onDelete?: (id: string) => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <div className="group relative">
      <Link href={`/projects/${project.id}`}>
        <Card className="relative overflow-y-auto rounded-xl border bg-card p-6 transition-all hover:scale-[1.02] dark:bg-gray-800">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {project.createdAt.toLocaleDateString()}
            </span>
            <div className="mt-4">
              <h3
                className="truncate text-xl font-medium dark:text-white"
                title={project.title}
              >
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.type}
              </p>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium dark:text-gray-300">
                工程進度
              </p>
              <div className="h-2 w-full rounded-full bg-main-light dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-main transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm dark:text-gray-400">
                <span>{project.progress}%</span>
                {project.daysLeft && <span>{project.daysLeft} Days Left</span>}
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Delete Button */}
      <button
        onClick={(e) => {}}
        className="absolute right-4 top-4 z-50 hidden rounded-full p-2 opacity-0 transition-opacity hover:bg-red-50 group-hover:block group-hover:opacity-100 dark:bg-gray-700/80 dark:hover:bg-red-900/80"
      >
        <Trash2 className="h-5 w-5 text-red-500" />
      </button>
    </div>
  )
}
