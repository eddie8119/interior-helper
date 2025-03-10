import React from 'react'
import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export default function UserDetailsForm() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext()
  return (
    <>
      <TextField
        fullWidth
        defaultValue={getValues('name')}
        label="Name"
        variant="outlined"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message as string}
      />
      <TextField
        fullWidth
        defaultValue={getValues('email')}
        label="Email"
        variant="outlined"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message as string}
      />
      <TextField
        fullWidth
        defaultValue={getValues('password')}
        label="Password"
        variant="outlined"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message as string}
      />
    </>
  )
}
