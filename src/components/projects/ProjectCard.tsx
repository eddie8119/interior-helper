'use client'

import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { Project } from '@/types/project'
import { Card } from '@/components/ui/Card'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { Button } from '@mui/material'

interface ProjectCardProps {
  project: Project
  deleteProject: (id: string) => void
}

export function ProjectCard({ project, deleteProject }: ProjectCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDelete = () => {
    deleteProject(project.id)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="group relative">
      <Link href={`/projects/${project.id}`}>
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
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsDeleteDialogOpen(true)
        }}
        className="absolute right-4 top-4 z-50 hidden rounded-full p-2 opacity-0 transition-opacity hover:bg-red-50 group-hover:block group-hover:opacity-100 dark:bg-gray-700/80 dark:hover:bg-red-900/80"
      >
        <Trash2 className="h-5 w-5 text-red-500" />
      </button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認刪除</DialogTitle>
            <DialogDescription>
              您確定要刪除專案 "{project.title}" 嗎？此操作無法復原。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outlined"
              onClick={() => setIsDeleteDialogOpen(false)}
              sx={{ mr: 1 }}
            >
              取消
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              刪除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
