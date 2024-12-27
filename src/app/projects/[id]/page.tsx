import { ProjectContainer } from '@/components/projects/project-container'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // 這裡可以加入伺服器端的資料預取邏輯
  // const project = await getProject(params.id)
  // if (!project) notFound()

  return <ProjectContainer projectId={params.id} />
}
