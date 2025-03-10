import { Project, Task } from '@prisma/client'
import { DraggableContainersServer } from './container/draggable-containers-server'
import { formatDateTime } from '@/lib/format'

interface ProjectContainerProps {
  project: Project & {
    tasks: Task[]
  }
}

export function ProjectContainer({ project }: ProjectContainerProps) {
  console.log('Project tasks:', project.tasks)

  return (
    <main className="container mx-auto">
      <header className="sticky top-0 z-10 flex items-center bg-background">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
      </header>
      <p className="text-muted-foreground text-sm">
        上次編輯時間：{formatDateTime(project.updatedAt)}
      </p>

      <DraggableContainersServer
        project={project}
        projectTasks={project.tasks}
        onUpdateTask={updateTask}
        onUpdateProject={updateProject}
      />
    </main>
  )
}
