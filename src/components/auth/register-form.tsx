'use client'

import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  profileSchema,
  RegisterSchema,
  registerSchema,
} from '@/lib/schemas/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/actions/authActions'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/core/Dialog'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { handleFormServerErrors } from '@/lib/utils'
import UserDetailsForm from '@/components/auth/user-details-form'
import ProfileForm from '@/components/auth/profile-form'

const stepSchemas = [registerSchema, profileSchema]

export default function RegisterForm() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const currentValidationSchema = stepSchemas[activeStep]

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(currentValidationSchema),
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

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserDetailsForm />
      case 1:
        return <ProfileForm />
      default:
        return 'Unknown step'
    }
  }

  const onBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await onSubmit()
    } else {
      setActiveStep((prev) => prev + 1)
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
        <form onSubmit={handleSubmit(onNext)} className="mt-4 space-y-4">
          {getStepContent(activeStep)}
          {errors.root?.serverError && (
            <p className="text-danger text-sm">
              {errors.root.serverError.message}
            </p>
          )}
          <div className="flex flex-row items-center gap-6">
            {activeStep !== 0 && (
              <Button onClick={onBack} fullWidth>
                Back
              </Button>
            )}
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              fullWidth
              color="secondary"
              type="submit"
            >
              {activeStep === stepSchemas.length - 1 ? 'Submit' : 'Continue'}
            </LoadingButton>
          </div>
        </form>
      </FormProvider>
    </DialogContent>
  )
}
