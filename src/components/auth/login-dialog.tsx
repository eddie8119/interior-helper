// 'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useLoginDialog } from '@/contexts/login-dialog-context'
import { LoginForm } from './login-form'

export function LoginDialog() {
  const { isOpenLoginDialog, closeLoginDialog, openRegisterDialog } =
    useLoginDialog()

  return (
    <Dialog open={isOpenLoginDialog} onOpenChange={closeLoginDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            登入室內工程手帳
          </DialogTitle>
        </DialogHeader>

        <LoginForm
          onSuccess={closeLoginDialog}
          onRegisterClick={() => {
            closeLoginDialog()
            openRegisterDialog()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
