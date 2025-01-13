'use client'

import { ProjectBasic } from '@/types/project'
import { ProjectCard } from './project-card'
import { AddProjectDialogTrial } from './add-project-dialog-trial'

interface ProjectsDisplayViewProps {
  projects: ProjectBasic[]
  addProject?: () => void
  deleteProject?: () => void
  title?: string
  description?: string
  showAddButton?: boolean
}

export function ProjectsDisplayView({
  projects,
  addProject,
  deleteProject,
  title = '工程專案列表',
  description = '這裡是您的所有專案，點擊可查看詳細資訊',
  showAddButton = true,
}: ProjectsDisplayViewProps) {
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background pb-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <AddProjectDialogTrial onAddProject={addProject} />
      </header>
      <p>{description}</p>
      <main className="flex-1 overflow-y-auto">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground">目前還沒有任何專案</p>
            {showAddButton && (
              <p className="text-muted-foreground mt-2">
                點擊右上角的「新增專案」按鈕來創建您的第一個專案
              </p>
            )}
          </div>
        ) : (
          <article className="grid grid-cols-1 gap-6 p-2 sm:grid-cols-2 md:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                deleteProject={deleteProject}
                url={'trial-projects'}
              />
            ))}
          </article>
        )}
      </main>
    </>
  )
}
