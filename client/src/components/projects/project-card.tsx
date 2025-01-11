import Link from 'next/link'
import { ProjectBasic } from '@/types/project'
import { Card } from '@/components/ui/card'
import { DeleteButtonWithDialog } from '@/components/ui/delete-button-with-dialog'

interface ProjectCardProps {
  project: ProjectBasic
  deleteProject: (id: string) => void
}

export function ProjectCard({ project, deleteProject }: ProjectCardProps) {
  return (
    <div className="group relative">
      <Link href={`/trial-projects/${project.id}`}>
        <Card className="relative overflow-y-auto rounded-xl border bg-card p-6 transition-all hover:scale-[1.02] dark:bg-gray-800">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 dark:text-gray-500">
              {project.createdAt.toLocaleDateString()}
            </span>
            <div className="mt-4 space-y-1">
              <h3
                className="truncate text-xl font-semibold text-gray-900 dark:text-white"
                title={project.title}
              >
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {project.type}
              </p>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                工程進度
              </p>
              <div className="h-2 w-full rounded-full bg-main-light dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-main transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{project.progress}%</span>
                {project.daysLeft && <span>{project.daysLeft} Days Left</span>}
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Delete Button */}
      <DeleteButtonWithDialog
        deleteItem={() => {
          deleteProject(project.id)
        }}
        title="確認刪除"
        description={`您確定要刪除專案 "${project.title}" 嗎？此操作無法復原。`}
      />
    </div>
  )
}
