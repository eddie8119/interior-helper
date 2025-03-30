import { Card } from '@/components/core/Card'
import { Skeleton } from '@/components/core/Skeleton'

export default function Loading() {
  return (
    <main className="page-primary-container">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          <Skeleton className="h-8 w-32" />
        </h1>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="p-4">
            <Skeleton className="mb-4 h-6 w-3/4" />
            <div className="mb-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}
