'use client'

import { ProjectCard } from '@/components/ProjectCard'
import { useProjects } from '@/hooks/use-projects'

export default function DashboardPage() {
  const { projects } = useProjects()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Available Balance</h1>
        <div className="text-sm">Section</div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
