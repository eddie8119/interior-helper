'use client'

import { createContext, useContext, useState } from 'react'

interface LoginDialogContextType {
  isOpenLoginDialog: boolean
  openLoginDialog: () => void
  closeLoginDialog: () => void
  isOpenRegisterDialog: boolean
  openRegisterDialog: () => void
  closeRegisterDialog: () => void
}

const LoginDialogContext = createContext<LoginDialogContextType | undefined>(
  undefined
)

export function LoginDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpenLoginDialog, setisOpenLoginDialog] = useState(false)
  const [isOpenRegisterDialog, setisOpenRegisterDialog] = useState(false)

  const openLoginDialog = () => setisOpenLoginDialog(true)
  const closeLoginDialog = () => setisOpenLoginDialog(false)
  const openRegisterDialog = () => setisOpenRegisterDialog(true)
  const closeRegisterDialog = () => setisOpenRegisterDialog(false)

  return (
    <LoginDialogContext.Provider
      value={{
        isOpenLoginDialog,
        openLoginDialog,
        closeLoginDialog,
        isOpenRegisterDialog,
        openRegisterDialog,
        closeRegisterDialog,
      }}
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
