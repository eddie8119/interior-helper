'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInUser } from '@/actions/authActions'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Link from 'next/link'

export default function LoginForm() {
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
      router.push('')
    } else {
      toast.error(result.error as string)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
      <Input
        defaultValue=""
        label="Email"
        variant="bordered"
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
      />
      <Input
        defaultValue=""
        label="Password"
        variant="bordered"
        type="password"
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message as string}
      />
      <Button
        isLoading={isSubmitting}
        isDisabled={!isValid}
        fullWidth
        color="secondary"
        type="submit"
      >
        Login
      </Button>
      <div className="flex justify-center text-sm hover:underline">
        <Link href="/forgot-password">Forgot password?</Link>
      </div>
    </form>
  )
}
