import { Metadata } from 'next'
import { ProjectContainerTrial } from '@/components/projects/features/ProjectContainerTrial'
import { getProjectById } from '@/app/actions/project-details'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectById(params.id)

  if (!project) {
    return {
      title: '找不到專案 | Interior Helper',
      description: '抱歉，您要查看的專案不存在或已被刪除。',
    }
  }

  const title = `${project.title} | Interior Helper`
  const description = `查看和管理您的${project.title}專案的詳細信息、進度和任務。`
  const url = `/projects/${params.id}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'Interior Helper',
      locale: 'zh_TW',
      images: [
        {
          url: '/og-default.jpg',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },

    alternates: {
      canonical: url,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  return <ProjectContainerTrial projectId={params.id} />
}
