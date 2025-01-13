'use client'

import { Project } from '@prisma/client'
import { ProjectCard } from './project-card'
import { AddProjectDialog } from './add-project-dialog'
import { useRouter } from 'next/navigation'

interface ProjectsDisplayViewProps {
  projects: Project[]
  onProjectAdded?: () => void
  title?: string
  description?: string
  showAddButton?: boolean
  useProjectsHook?: () => {
    projects: Project[]
    isLoading: boolean
    error: string | null
  }
}

export function ProjectsDisplayView({
  projects,
  onProjectAdded,
  title = '專案列表',
  description = '這裡是您的所有專案，點擊可查看詳細資訊',
  showAddButton = true,
  useProjectsHook,
}: ProjectsDisplayViewProps) {
  const router = useRouter()

  const handleProjectAdded = () => {
    onProjectAdded?.()
    router.refresh()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {showAddButton && (
          <AddProjectDialog onProjectAdded={handleProjectAdded} />
        )}
      </div>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
