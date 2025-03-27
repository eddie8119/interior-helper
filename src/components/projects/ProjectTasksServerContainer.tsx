import { notFound } from 'next/navigation'
import { getProject } from '@/actions/projectActions'
import { getContainer } from '@/actions/containerActions'
import { getContainerTasks } from '@/actions/taskActions'
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
  const responseProject = await getProject(id)
  if (responseProject.status === 'error' || !responseProject.data) {
    return notFound()
  }

  const responseContainer = await getContainer(responseProject.data?.id)
  if (responseContainer.status === 'error' || !responseContainer.data) {
    return notFound()
  }

  const responseContainerTasks = await getContainerTasks(
    responseProject.data?.id
  )
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
