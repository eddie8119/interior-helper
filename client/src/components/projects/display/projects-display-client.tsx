import { withClientDelete } from './with-client-delete'
import { BaseProjectsDisplay } from './base-projects-display'
import { Project } from '@prisma/client'

interface ProjectsDisplayClientProps {
  projects: Project[]
  url: string
  title: string
  description?: string
  showAddButton?: boolean
}

const ProjectsDisplayClientBase = withClientDelete(BaseProjectsDisplay)

export function ProjectsDisplayClient({
  projects,
  url,
  title,
  description,
  showAddButton,
}: ProjectsDisplayClientProps) {
  return (
    <ProjectsDisplayClientBase
      projects={projects}
      url={url}
      title={title}
      description={description}
      showAddButton={showAddButton}
    />
  )
}
