'use client'

import { Container, Project, Task } from '@prisma/client'
import {
  createContainer,
  deleteContainer,
  updateContainer,
  updateContainersOrder,
} from '@/actions/containerActions'
import { createTask, deleteTask, updateTask } from '@/actions/taskActions'
import { formatDateTime } from '@/lib/format'
import { DraggableContainer } from './DraggableContainer'

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
    <main className="page-primary-container">
      <div className="mb-5">
        <header className="sticky top-0 z-10 flex items-center bg-background">
          <h1 className="text-2xl font-semibold">{project.title}</h1>
        </header>
        <p className="text-muted-foreground text-sm">
          上次編輯時間：{formatDateTime(project.updated)}
        </p>
      </div>

      <DraggableContainer
        project={project}
        projectContainers={projectContainers}
        projectTasks={projectTasks}
        containerActions={{
          createContainer,
          updateContainer,
          deleteContainer,
          updateContainersOrder,
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
