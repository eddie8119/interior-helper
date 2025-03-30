'use client'

import { Button } from '@/components/core/Button'
import { Input } from '@/components/core/Input'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInUser } from '@/actions/authActions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface LoginFormProps {
  onSuccess?: () => void
  onRegisterClick?: () => void
  showRegisterLink?: boolean
}

export function LoginForm({
  onSuccess,
  onRegisterClick,
  showRegisterLink = true,
}: LoginFormProps) {
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
      if (onSuccess) {
        onSuccess()
      }
      router.push('/projects')
    } else {
      toast.error(result.error as string)
    }
  }

  const handleGoogleLogin = () => {
    // TODO: 處理 Google 登入邏輯
  }

  return (
    <div className="space-y-4">
      {showRegisterLink && (
        <div className="text-center">
          還沒有帳號？
          <button
            className="text-yellow-500 hover:underline"
            onClick={onRegisterClick}
          >
            註冊
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={`h-12 rounded-md border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={`h-12 rounded-md border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-[#F59E0B] hover:underline"
          >
            忘記你的密碼？
          </Link>
        </div>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="h-12 w-full rounded-md bg-[var(--main)] text-black hover:bg-[var(--main-light)]"
        >
          登入
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">或</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="outline"
          className="h-12 w-full rounded-md border border-gray-300"
        >
          使用 Google 帳號登入
        </Button>
      </form>
    </div>
  )
}
