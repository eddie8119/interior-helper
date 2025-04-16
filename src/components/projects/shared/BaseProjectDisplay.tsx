'use client'

import { Project } from '@prisma/client'
import { useProjectFeatures } from '../../../hooks/useProjectFeatures'
import { useProjectPermissions } from '../../../hooks/useProjectPermissions'
import { UserTier } from '../constants/projectLimits'
import { ProjectCard } from './ProjectCard'

interface BaseProjectDisplayProps {
  projects: Project[]
  title?: string
  description?: string
  showAddButton?: boolean
  url: string
  userTier: UserTier
  deleteProject: (id: string) => Promise<void>
  AddProjectDialog: React.ComponentType
}

export function BaseProjectDisplay({
  projects,
  title = '專案列表',
  description = '這裡是您的所有專案，點擊可查看詳細資訊',
  showAddButton = true,
  url,
  userTier,
  deleteProject,
  AddProjectDialog,
}: BaseProjectDisplayProps) {
  const features = useProjectFeatures(userTier)
  const permissions = useProjectPermissions(userTier)

  const canAddProject = permissions.canCreateProject(projects.length)
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
          {permissions.isFreeUser && (
            <p className="text-muted-foreground text-sm">
              試用版本最多可以創建 {features.maxProjects} 個專案
            </p>
          )}
        </div>
        {showAddButton && <AddProjectDialog />}
      </header>
      <main className="flex-1 overflow-y-auto">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground">目前還沒有任何專案</p>
            {showAddButton && canAddProject && (
              <p className="text-muted-foreground mt-2">
                點擊右上角的「新增專案」按鈕來創建您的第一個專案
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  project={project}
                  deleteProject={deleteProject}
                  url={url}
                  features={features}
                  permissions={permissions}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
