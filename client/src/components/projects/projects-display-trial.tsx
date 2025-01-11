'use client'

import { AddProjectDialogTrial } from '@/components/projects/addProject-dialog-trial'
import { ProjectCard } from '@/components/projects/project-card'
import { useProjects } from '@/hooks/use-projects'

export function ProjectsDisplayTrial() {
  const { projects, addProject, deleteProject } = useProjects()

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background pb-6">
        <h1 className="text-2xl font-semibold">工程專案列表</h1>
        <AddProjectDialogTrial onAddProject={addProject} />
      </header>

      <main className="flex-1 overflow-y-auto">
        <article className="grid grid-cols-1 gap-6 p-2 sm:grid-cols-2 md:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              deleteProject={deleteProject}
            />
          ))}
        </article>
      </main>
    </>
  )
}
