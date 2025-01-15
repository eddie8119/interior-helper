'use client'

// import { ProjectsDisplayView } from './display/projects-display-view'
import { useProjects } from '@/hooks/use-projects'

export function ProjectsTrialClientContainer() {
  const { projects, addProject, deleteProject } = useProjects()

  return (
    // <ProjectsDisplayView
    //   projects={projects}
    //   addProject={addProject}
    //   deleteProject={deleteProject}
    //   title="試用版專案列表"
    //   description="這裡是您的試用版專案，功能受限但可以體驗基本操作"
    //   url="trial-projects"
    // />
  )
}
