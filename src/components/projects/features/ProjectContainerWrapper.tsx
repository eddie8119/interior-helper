import { notFound } from 'next/navigation'
import { getContainer } from '@/actions/containerActions'
import { getProject } from '@/actions/projectActions'
import { getProjectTasks } from '@/actions/taskActions'
import { ProjectContainerPremium } from '@/components/projects/features/ProjectContainerPremium'

interface ProjectContainerWrapperProps {
  params: Promise<{ id: string }>
}

export async function ProjectContainerWrapper({
  params,
}: ProjectContainerWrapperProps) {
  const { id } = await params
  const responseProject = await getProject(id)
  if (responseProject.status === 'error' || !responseProject.data) {
    return notFound()
  }

  const responseContainer = await getContainer(responseProject.data?.id)
  if (responseContainer.status === 'error' || !responseContainer.data) {
    return notFound()
  }

  const responseContainerTasks = await getProjectTasks(responseProject.data?.id)

  if (
    responseContainerTasks.status === 'error' ||
    !responseContainerTasks.data
  ) {
    return notFound()
  }

  return (
    <ProjectContainerPremium
      project={responseProject.data}
      projectContainers={responseContainer.data}
      projectTasks={responseContainerTasks.data}
    />
  )
}
