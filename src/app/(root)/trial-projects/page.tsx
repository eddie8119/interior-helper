import { Metadata } from 'next'
import TrialProjectDisplayWrapper from '@/components/projects/features/TrialProjectDisplayWrapper'

export const metadata: Metadata = {
  title: '試用版專案列表 | Interior Helper',
  description: '體驗 Interior Helper 的專案管理功能',
  openGraph: {
    title: '試用版專案列表 | Interior Helper',
    description: '體驗 Interior Helper 的專案管理功能',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'Interior Helper',
    url: '/trial-projects',
  },
  alternates: {
    canonical: '/trial-projects',
  },
}

export default function TrialProjectsPage() {
  return (
    <section className="flex h-full flex-col">
      <TrialProjectDisplayWrapper />
    </section>
  )
}
