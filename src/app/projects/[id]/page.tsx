'use client'

import { useParams } from 'next/navigation'
import { useProjects } from '@/hooks/use-projects'
import { useTasks } from '@/hooks/use-tasks'
import { DraggableContainers } from '@/components/projects/draggable-containers'

export default function ProjectDetailsPage() {
  const params = useParams()
  const { projects, updateProject } = useProjects()
  const { getProjectTasks, updateTask } = useTasks()
  const projectId = params.id as string
  const project = projects.find((p) => p.id === projectId)
  const projectTasks = getProjectTasks(projectId)

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <main className="container mx-auto">
      <header className="sticky top-0 z-10 flex items-center bg-background">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
      </header>
      <p>上次編輯時間：{project.editedAt.toLocaleString()}</p>

      <DraggableContainers
        project={project}
        projectTasks={projectTasks}
        onUpdateTask={updateTask}
        onUpdateProject={updateProject}
      />
    </main>
  )
}
