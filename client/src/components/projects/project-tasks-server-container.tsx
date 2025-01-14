import { notFound } from 'next/navigation'
import { getProject } from '@/actions/projectActions'
import { ProjectContainer } from '@/components/projects/project-container'

interface ProjectTasksServerContainerProps {
  params: {
    id: string
  }
}

export async function ProjectTasksServerContainer({
  params,
}: ProjectTasksServerContainerProps) {
  const response = await getProject(params.id)
  if (response.status !== 'success' || !response.data) {
    return notFound()
  }
  const { data } = response

  return <ProjectContainer project={data} />
}
