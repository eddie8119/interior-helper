import { notFound } from 'next/navigation'
import { getProject } from '@/actions/projectActions'
import { ProjectContainerPremium } from '@/components/projects/features/ProjectContainerPremium'

interface ProjectTasksServerContainerProps {
  params: {
    id: string
  }
}

export async function ProjectTasksServerContainer({
  params,
}: ProjectTasksServerContainerProps) {
  const id = params.id
  const response = await getProject(id)

  if (response.status === 'error' || !response.data) {
    return notFound()
  }

  return <ProjectContainerPremium project={response.data} />
}
