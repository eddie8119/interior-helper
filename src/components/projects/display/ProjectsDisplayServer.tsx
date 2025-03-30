'use client'

import { withServerDelete } from './WithServerDelete'
import { BaseProjectsDisplay } from './BaseProjectsDisplay'
import { Project } from '@prisma/client'

interface ProjectsDisplayServerProps {
  projects: Project[]
  url: string
  title: string
  description: string
  showAddButton?: boolean
}

const ProjectsDisplayServerBase = withServerDelete(BaseProjectsDisplay)

export function ProjectsDisplayServer({
  projects,
  url,
  title,
  description,
  showAddButton,
}: ProjectsDisplayServerProps) {
  return (
    <ProjectsDisplayServerBase
      projects={projects}
      url={url}
      title={title}
      description={description}
      showAddButton={showAddButton}
    />
  )
}
