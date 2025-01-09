'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '@nextui-org/react'
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/actions/authActions'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })
  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data)

    if (result.status === 'success') {
      console.log('user register successful ')
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e) => {
          const fieldName = e.path[0] as 'name' | 'email' | 'password'
          setError(fieldName, { message: e.message })
        })
      } else {
        setError('root.serverError', { message: result.error })
      }
    }
  }
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
      {errors.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}
      <Button
        isLoading={isSubmitting}
        isDisabled={!isValid}
        fullWidth
        color="secondary"
        type="submit"
      >
        Register
      </Button>
    </form>
  )
}
