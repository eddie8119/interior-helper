'use client'

import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Link from 'next/link'

export function LoginDialog() {
  const [open, setOpen] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 處理登入邏輯
    setLoginData({ email: '', password: '' })
    setOpen(false)
  }

  const handleGoogleLogin = () => {
    // TODO: 處理 Google 登入邏輯
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
        onClick={() => setOpen(true)}
      >
        登入/註冊
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              登入室內工程手帳
            </DialogTitle>
            <div className="text-center">
              還沒有帳號？
              <Link
                href="/register"
                className="text-yellow-500 hover:underline"
              >
                註冊
              </Link>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-yellow-500 hover:underline"
              >
                忘記你的密碼？
              </Link>
            </div>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: 'var(--main)',
                color: '#000000',
                '&:hover': {
                  backgroundColor: 'var(--main-light)',
                  color: '#000000',
                },
              }}
            >
              email登入
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={handleGoogleLogin}
              sx={{
                backgroundColor: '#fff',
                color: '#000000',
                border: '1px solid #ddd',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              Google登入
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
