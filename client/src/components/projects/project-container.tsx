import { Project } from '@prisma/client'
import { DraggableContainers } from './drag/draggable-containers'
import { formatDateTime } from '@/lib/format'

interface ProjectContainerProps {
  project: Project
}

export function ProjectContainer({ project }: ProjectContainerProps) {
  console.log(111111, project)
  return (
    <main className="container mx-auto">
      <header className="sticky top-0 z-10 flex items-center bg-background">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
      </header>
      <p className="text-sm text-muted-foreground">
        上次編輯時間：{formatDateTime(project.updatedAt)}
      </p>

      {/* <DraggableContainers
        project={project}
        projectTasks={project.tasks}
        onUpdateTask={updateTask}
        onUpdateProject={updateProject}
      /> */}
    </main>
  )
}
