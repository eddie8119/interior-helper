import { notFound } from 'next/navigation'
import { getProject } from '@/actions/projectActions'
import { ProjectContainerPremium } from '@/components/projects/ProjectContainerPremium'

interface ProjectTasksServerContainerProps {
  params: {
    id: string
  }
}

export async function ProjectTasksServerContainer({
  params,
}: ProjectTasksServerContainerProps) {
  // 等待 params.id 解析完成
  const id = await Promise.resolve(params.id)
  const response = await getProject(id)

  if (response.status === 'error' || !response.data) {
    return notFound()
  }

  return <ProjectContainerPremium project={response.data} />
}
