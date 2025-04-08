'use client'

import { LoginDialog } from '@/components/auth/login-dialog'
import { RegisterDialog } from '@/components/auth/register-dialog'

export function LoginDialogWrapper() {
  return (
    <>
      <LoginDialog />
      <RegisterDialog />
    </>
  )
}
