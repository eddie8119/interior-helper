'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { Button, TextField } from '@mui/material'

interface AddProjectDialogProps {
  onAddProject: (project: any) => void
}

export function AddProjectDialog({ onAddProject }: AddProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    type: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddProject({
      ...newProject,
      id: Math.random().toString(),
      progress: 0,
      createdAt: new Date(),
    })
    setNewProject({ title: '', type: '' })
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'var(--main)',
          color: '#000000',
          '&:hover': {
            backgroundColor: 'var(--main-light)',
            color: '#000000',
          },
        }}
        startIcon={<Plus className="h-4 w-4" />}
        onClick={() => setOpen(true)}
      >
        新增專案
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>新增專案</DialogTitle>
            <DialogDescription>
              新增一個工程專案到您的專案列表中。
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <TextField
              fullWidth
              label="專案名稱"
              variant="outlined"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              label="專案類型"
              variant="outlined"
              value={newProject.type}
              onChange={(e) =>
                setNewProject({ ...newProject, type: e.target.value })
              }
              required
            />
          </form>

          <DialogFooter className="mt-6">
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              sx={{ mr: 1 }}
            >
              取消
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!newProject.title || !newProject.type}
              sx={{
                backgroundColor: 'var(--main)',
                color: '#000000',
                '&:hover': {
                  backgroundColor: 'var(--main-light)',
                  color: '#000000',
                },
                '&:disabled': {
                  backgroundColor: 'var(--main-light)',
                  color: 'rgba(0, 0, 0, 0.38)',
                },
              }}
            >
              新增
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
