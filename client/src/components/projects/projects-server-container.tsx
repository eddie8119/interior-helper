import { ProjectsDisplayView } from './projects-display-view'
import { notFound } from 'next/navigation'
import { getProjects } from '@/actions/projectActions'

export async function ProjectsServerContainer() {
  const response = await getProjects()
  if (response.status !== 'success') {
    return notFound()
  }
  const { data } = response

  return <ProjectsDisplayView projects={data} url="projects" />
}
