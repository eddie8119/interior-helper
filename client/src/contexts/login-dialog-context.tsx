'use client'

import { createContext, useContext, useState } from 'react'

interface LoginDialogContextType {
  isOpen: boolean
  openLoginDialog: () => void
  closeLoginDialog: () => void
}

const LoginDialogContext = createContext<LoginDialogContextType | undefined>(
  undefined,
)

export function LoginDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  const openLoginDialog = () => setIsOpen(true)
  const closeLoginDialog = () => setIsOpen(false)

  return (
    <LoginDialogContext.Provider
      value={{ isOpen, openLoginDialog, closeLoginDialog }}
    >
      {children}
    </LoginDialogContext.Provider>
  )
}

export function useLoginDialog() {
  const context = useContext(LoginDialogContext)
  if (context === undefined) {
    throw new Error('useLoginDialog must be used within a LoginDialogProvider')
  }
  return context
}
