'use client'

import { useState } from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'
import { LoginDialog } from './login-dialog'

export function LoginRegisterArea() {
  const [open, setOpen] = useState(false)

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
        onClick={() => setOpen(true)}
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
      <LoginDialog open={open} setOpen={setOpen} />
    </>
  )
}
