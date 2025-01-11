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
} from '@/components/ui/dialog'
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { PROJECT_TYPES } from '@/constants/selection'

interface AddProjectDialogTrialProps {
  onAddProject: (project: any) => void
}

export function AddProjectDialogTrial({
  onAddProject,
}: AddProjectDialogTrialProps) {
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
            <FormControl fullWidth required>
              <InputLabel>專案類型</InputLabel>
              <Select
                value={newProject.type}
                label="專案類型"
                onChange={(e) =>
                  setNewProject({ ...newProject, type: e.target.value })
                }
              >
                {PROJECT_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>

          <DialogFooter className="mt-6">
            <Button
              onClick={() => setOpen(false)}
              className="hover:bg-cancel/90 mr-1 bg-cancel text-white"
            >
              取消
            </Button>
            <Button
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
