'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })
  const onSubmit = (data: any) => {}
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
      <Button isDisabled={!isValid} fullWidth color="secondary" type="submit">
        Login
      </Button>
    </form>
  )
}
