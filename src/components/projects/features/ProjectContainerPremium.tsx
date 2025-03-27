'use client'

import { Project, Container, Task } from '@prisma/client'
import { DraggableContainer } from './DraggableContainer'
import { formatDateTime } from '@/lib/format'
import { updateProject } from '@/actions/projectActions'
import {
  createContainer,
  deleteContainer,
  updateContainer,
} from '@/actions/containerActions'
import { createTask, updateTask, deleteTask } from '@/actions/taskActions'

interface ProjectContainerPremiumProps {
  project: Project
  projectContainers: Container[]
  projectTasks: Task[]
}

export function ProjectContainerPremium({
  project,
  projectContainers,
  projectTasks,
}: ProjectContainerPremiumProps) {
  return (
    <main className="container mx-auto">
      <header className="sticky top-0 z-10 flex items-center bg-background">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
      </header>
      <p className="text-muted-foreground text-sm">
        上次編輯時間：{formatDateTime(project.updated)}
      </p>

      <DraggableContainer
        project={project}
        projectContainers={projectContainers}
        projectTasks={projectTasks}
        onUpdateProject={updateProject}
        containerActions={{
          createContainer,
          updateContainer,
          deleteContainer,
        }}
        taskActions={{
          createTask,
          updateTask,
          deleteTask,
        }}
      />
    </main>
  )
}
