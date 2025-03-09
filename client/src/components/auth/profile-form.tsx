import React from 'react'
import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export default function ProfileForm() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <TextField
        fullWidth
        defaultValue={getValues('company')}
        label="Company"
        variant="outlined"
        {...register('company')}
        error={!!errors.company}
        helperText={errors.company?.message as string}
      />
      <TextField
        fullWidth
        defaultValue={getValues('city')}
        label="City"
        variant="outlined"
        {...register('city')}
        error={!!errors.city}
        helperText={errors.city?.message as string}
      />
      <TextField
        fullWidth
        defaultValue={getValues('description')}
        label="Description"
        variant="outlined"
        type="description"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message as string}
      />
    </>
  )
}
