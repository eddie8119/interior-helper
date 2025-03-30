'use client'

import { withClientDelete } from './WithClientDelete'
import { BaseProjectsDisplay } from './BaseProjectsDisplay'

interface ProjectsDisplayClientProps {
  url: string
  title: string
  description?: string
  showAddButton?: boolean
}

const ProjectsDisplayClientBase = withClientDelete(BaseProjectsDisplay)

export function ProjectsDisplayClient({
  url,
  title,
  description,
  showAddButton,
}: ProjectsDisplayClientProps) {
  return (
    <ProjectsDisplayClientBase
      url={url}
      title={title}
      description={description}
      showAddButton={showAddButton}
    />
  )
}
