import React from 'react'
import { Member } from '@prisma/client'
import { useForm } from 'react-hook-form'
import {
  MemberEditSchema,
  memberEditSchema,
} from '@/lib/schemas/memberEditSchema'
import { TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateMemberProfile } from '@/actions/userActions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { handleFormServerErrors } from '@/lib/utils'

interface EditFormProps {
  member: Member
}

export default function EditForm({ member }: EditFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: MemberEditSchema) => {
    const result = await updateMemberProfile(data)

    if (result.status === 'success') {
      toast.success('Profile updated')
      router.refresh()
      reset({ ...data })
    } else {
      handleFormServerErrors(result, setError)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <TextField
        fullWidth
        label="Name"
        type="name"
        variant="outlined"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message as string}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        minRows={6}
        variant="outlined"
        {...register('description')}
        defaultValue={member.description}
        error={!!errors.description}
        helperText={errors.description?.message as string}
      />
      <div className="flex flex-row gap-3">
        <TextField
          fullWidth
          label="City"
          variant="outlined"
          {...register('city')}
          error={!!errors.city}
          helperText={errors.city?.message as string}
        />
      </div>
      {errors.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}

      <LoadingButton
        loading={isSubmitting}
        disabled={!isValid || !isDirty}
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
        更新
      </LoadingButton>
    </form>
  )
}
