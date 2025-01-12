'use client'

import { notFound } from 'next/navigation'

import { useProjects } from '@/hooks/use-projects'
import { useTasks } from '@/hooks/use-tasks'
import { DraggableContainers } from './drag/draggable-containers'

interface ProjectContainerTrialProps {
  projectId: string
}

export function ProjectContainerTrial({
  projectId,
}: ProjectContainerTrialProps) {
  const { projects, isLoading, updateProject } = useProjects()
  const { getProjectTasks, updateTask } = useTasks()

  const project = projects.find((p) => p.id === projectId)
  const projectTasks = getProjectTasks(projectId)

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">載入中...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    notFound()
  }

  return (
    <main className="container mx-auto">
      <header className="sticky top-0 z-10 flex items-center bg-background">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
      </header>
      <p>上次編輯時間：{}</p>

      <DraggableContainers
        project={project}
        projectTasks={projectTasks}
        onUpdateTask={updateTask}
        onUpdateProject={updateProject}
      />
    </main>
  )
}
