'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })
  const onSubmit = (data: RegisterSchema) => {}
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
      <Input
        defaultValue=""
        label="Name"
        variant="bordered"
        {...register('name')}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message as string}
      />
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
        Register
      </Button>
    </form>
  )
}
