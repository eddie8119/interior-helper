'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/actions/authActions'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { handleFormServerErrors } from '@/lib/utils'
import UserDetailsForm from '@/components/auth/user-details-form'

export default function RegisterForm() {
  const router = useRouter()
  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })

  const {
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = methods

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data)

    if (result.status === 'success') {
      router.push('/projects')
    } else {
      handleFormServerErrors(result, setError)
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center text-2xl">
          註冊室內工程手帳
        </DialogTitle>
        <div className="text-center">
          已經已經有帳號？
          <Link href="/" className="text-yellow-500 hover:underline">
            登入
          </Link>
        </div>
      </DialogHeader>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <UserDetailsForm />
          {errors.root?.serverError && (
            <p className="text-danger text-sm">
              {errors.root.serverError.message}
            </p>
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
      </FormProvider>
    </DialogContent>
  )
}
