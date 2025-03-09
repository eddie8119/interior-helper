'use client'

import { Button } from '@mui/material'
import Link from 'next/link'
import { useLoginDialog } from '@/contexts/login-dialog-context'

export function LoginRegisterArea() {
  const { openLoginDialog } = useLoginDialog()

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
      >
        <Link href="/register" className="text-yellow-500 hover:underline">
          註冊
        </Link>
      </Button>
    </>
  )
}
