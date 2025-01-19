import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ZodIssue } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleFormServerErrors<TFieldValues extends FieldValues>(
  errorResponse: {error: string | ZodIssue[]},
  setError: UseFormSetError<TFieldValues>
) {
  if (Array.isArray(errorResponse.error)) {
      errorResponse.error.forEach((e) => {
          const fieldName = e.path[0] as Path<TFieldValues>
          setError(fieldName, {message: e.message})
      })
  } else {
      setError('root.serverError', {message: errorResponse.error});
  }
}