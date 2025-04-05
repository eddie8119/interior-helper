'use client'

import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from '@mui/material'
import { X } from 'lucide-react'
import { forwardRef } from 'react'
import * as React from 'react'

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  className?: string
}

interface DialogHeaderProps {
  children?: React.ReactNode
  className?: string
}

interface DialogFooterProps {
  children?: React.ReactNode
  className?: string
}

interface DialogContentProps {
  children?: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

interface DialogTriggerProps {
  asChild?: boolean
  children?: React.ReactNode
}

interface DialogCloseProps {
  asChild?: boolean
  children?: React.ReactNode
}

interface DialogDescriptionProps {
  children?: React.ReactNode
}

const Dialog = ({ children, open, onOpenChange, className }: DialogProps) => {
  return (
    <MuiDialog
      open={open || false}
      onClose={() => onOpenChange?.(false)}
      maxWidth="sm"
      fullWidth
      className={className}
    >
      <div className="relative">
        <IconButton
          onClick={() => onOpenChange?.(false)}
          className="!absolute right-2 top-2 z-50"
          size="small"
        >
          <X className="h-6 w-6" />
        </IconButton>
        {children}
      </div>
    </MuiDialog>
  )
}

const DialogTrigger = forwardRef<HTMLDivElement, DialogTriggerProps>(
  ({ children, asChild }, ref) => {
    return (
      <div ref={ref} className="inline-flex">
        {children}
      </div>
    )
  }
)
DialogTrigger.displayName = 'DialogTrigger'

const DialogContent = ({ children }: DialogContentProps) => {
  return <MuiDialogContent>{children}</MuiDialogContent>
}

const DialogHeader = ({ children, className }: DialogHeaderProps) => {
  return <div className={`mb-4 ${className || ''}`}>{children}</div>
}

const DialogFooter = ({ children, className }: DialogFooterProps) => {
  return (
    <DialogActions className={className}>
      <div className="flex w-full justify-end space-x-2">{children}</div>
    </DialogActions>
  )
}

const DialogTitle = ({ children, className }: DialogHeaderProps) => {
  return (
    <MuiDialogTitle
      sx={{
        padding: 0,
      }}
      className={className}
    >
      {children}
    </MuiDialogTitle>
  )
}

const DialogDescription = ({ children }: DialogDescriptionProps) => {
  return <DialogContentText>{children}</DialogContentText>
}

const DialogClose = forwardRef<HTMLDivElement, DialogCloseProps>(
  ({ children, asChild }, ref) => {
    return (
      <div ref={ref} className="inline-flex">
        {children}
      </div>
    )
  }
)
DialogClose.displayName = 'DialogClose'

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
