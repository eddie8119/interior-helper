'use client'

import { Project } from '@prisma/client'
import { DraggableContainers } from './drag/draggable-containers'

interface ProjectContainerProps {
  project: Project
}

export function ProjectContainer({ project }: ProjectContainerProps) {
  return (
    <main className="container mx-auto">
      <header className="sticky top-0 z-10 flex items-center bg-background">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
      </header>
      <p>上次編輯時間：{}</p>

      {/* <DraggableContainers
        project={project}
        projectTasks={projectTasks}
        onUpdateTask={updateTask}
        onUpdateProject={updateProject}
      /> */}
    </main>
  )
}
