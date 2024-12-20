'use client'

import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { Project } from '@/types/project'
import { Card } from '@/components/ui/Card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/Dialog'
import { useState } from 'react'

interface ProjectCardProps {
  project: Project
  onDelete?: (id: string) => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleDelete = () => {
    onDelete?.(project.id)
    setIsDialogOpen(false)
  }

  return (
    <div className="group relative">
      <Link href={`/projects/${project.id}`}>
        <Card className="relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:scale-[1.02] dark:bg-gray-800">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {project.createdAt.toLocaleDateString()}
            </span>
            <div className="mt-4">
              <h3
                className="truncate text-xl font-medium dark:text-white"
                title={project.title}
              >
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.type}
              </p>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium dark:text-gray-300">
                工程進度
              </p>
              <div className="h-2 w-full rounded-full bg-main-light dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-main transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm dark:text-gray-400">
                <span>{project.progress}%</span>
                {project.daysLeft && <span>{project.daysLeft} Days Left</span>}
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Delete Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="absolute right-4 top-4 z-10 hidden rounded-full p-2 hover:bg-red-100 group-hover:block dark:hover:bg-red-900"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Trash2 className="h-5 w-5 text-red-600" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認刪除</DialogTitle>
            <DialogDescription>
              您確定要刪除專案 "{project.title}" 嗎？此操作無法復原。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <DialogClose asChild>
              <button className="rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                取消
              </button>
            </DialogClose>
            <button onClick={handleDelete} className="btn-primary">
              刪除
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
