'use client'

import { LoginDialog } from '@/components/layout/login-dialog'
import { RegisterDialog } from '@/components/layout/register-dialog'

export function LoginDialogWrapper() {
  return (
    <>
      <LoginDialog />
      <RegisterDialog />
    </>
  )
}
