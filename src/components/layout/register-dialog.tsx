'use client'

import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormProvider, useForm } from 'react-hook-form'
import {
  profileSchema,
  RegisterSchema,
  registerSchema,
} from '@/lib/schemas/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/actions/authActions'
import { useRouter } from 'next/navigation'
import { handleFormServerErrors } from '@/lib/utils'
import { useLoginDialog } from '@/contexts/login-dialog-context'
import { useState } from 'react'
import UserDetailsForm from '@/components/auth/user-details-form'
import ProfileForm from '@/components/auth/profile-form'

const stepSchemas = [registerSchema, profileSchema]

export function RegisterDialog() {
  const { isOpenRegisterDialog, closeRegisterDialog, openLoginDialog } =
    useLoginDialog()
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
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = methods

  const goToLogin = () => {
    closeRegisterDialog()
    openLoginDialog()
  }

  const onSubmit = async () => {
    const result = await registerUser(getValues());

    if (result.status === 'success') {
      router.push('/register/success')
      closeRegisterDialog()
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
        return null
    }
  }

  const onBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await onSubmit();
    } else {
      setActiveStep((prev) => prev + 1)
    }
  }

  return (
    <Dialog open={isOpenRegisterDialog} onOpenChange={closeRegisterDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            註冊室內工程手帳
          </DialogTitle>
          <div className="text-center">
            已經有帳號?
            <button
              className="text-yellow-500 hover:underline"
              onClick={goToLogin}
            >
              登入
            </button>
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
                <Button
                  sx={{
                    backgroundColor: '',
                    color: '#000000',

                    '&:hover': {
                      backgroundColor: 'var(--main-light)',
                      color: '#000000',
                    },
                  }}
                  onClick={onBack}
                  fullWidth
                >
                  上一步
                </Button>
              )}
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
                {activeStep === stepSchemas.length - 1 ? '註冊' : '下一步'}
              </LoadingButton>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
