'use client'

import { AddProjectDialog } from '@/components/projects/AddProjectDialog'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { useProjects } from '@/hooks/use-projects'

export default function DashboardPage() {
  const { projects, addProject } = useProjects()

  return (
    <>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">工程專案列表</h1>
        <AddProjectDialog onAddProject={addProject} />
      </header>

      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </>
  )
}
