'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Project } from '@/types/project'

interface AddProjectDialogProps {
  onAddProject: (project: Omit<Project, 'id' | 'createdAt'>) => void
}

export function AddProjectDialog({ onAddProject }: AddProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    type: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newProject.title && newProject.type) {
      onAddProject({
        ...newProject,
        progress: 0,
      })
      setNewProject({ title: '', type: '' })
      setOpen(false)
    }
  }

  return (
    <>
      <Button
        className="flex items-center gap-2 bg-main-light"
        onClick={() => setOpen(true)}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        新增專案
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新增專案</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="專案名稱"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
              />
            </div>
            <div>
              <Input
                placeholder="專案類型"
                value={newProject.type}
                onChange={(e) =>
                  setNewProject({ ...newProject, type: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <Button className="btn-secondary" onClick={() => setOpen(false)}>
                取消
              </Button>
              <Button className="btn-primary" onClick={handleSubmit}>
                新增
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
