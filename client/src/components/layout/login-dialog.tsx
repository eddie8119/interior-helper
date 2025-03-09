'use client'

import { Button, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInUser } from '@/actions/authActions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useLoginDialog } from '@/contexts/login-dialog-context'

export function LoginDialog() {
  const { isOpen, closeLoginDialog } = useLoginDialog()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data)
    if (result.status === 'success') {
      router.push('/projects')
    } else {
      toast.error(result.error as string)
    }
  }

  const handleGoogleLogin = () => {
    // TODO: 處理 Google 登入邏輯
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeLoginDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            登入室內工程手帳
          </DialogTitle>
          <div className="text-center">
            還沒有帳號？
            <Link href="/register" className="text-yellow-500 hover:underline">
              註冊
            </Link>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-yellow-500 hover:underline"
            >
              忘記你的密碼？
            </Link>
          </div>

          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
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
            登入
          </LoadingButton>

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
  )
}
