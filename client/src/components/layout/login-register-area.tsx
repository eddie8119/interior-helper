'use client'

import { Button } from '@mui/material'
import { useLoginDialog } from '@/contexts/login-dialog-context'

export function LoginRegisterArea() {
  const { openLoginDialog, openRegisterDialog } = useLoginDialog()

  return (
    <>
      <Button
        sx={{
          backgroundColor: 'var(--main)',
          color: '#000000',
          width: 90,
          '&:hover': {
            backgroundColor: 'var(--main-light)',
            color: '#000000',
          },
        }}
        onClick={openLoginDialog}
      >
        登入
      </Button>
      <Button
        sx={{
          backgroundColor: '',
          color: '#000000',
          width: 90,
          '&:hover': {
            backgroundColor: 'var(--main-light)',
            color: '#000000',
          },
        }}
        onClick={openRegisterDialog}
      >
        註冊
      </Button>
    </>
  )
}
