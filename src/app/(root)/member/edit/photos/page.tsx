import React from 'react'
import { getAuthUserId } from '@/actions/authActions'
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from '@/actions/memberActions'
import ImageUploadButton from '@/components/member/ImageUploadButton'

export default async function PhotosPage() {
  const userId = await getAuthUserId()
  const member = await getMemberByUserId(userId)
  const photos = await getMemberPhotosByUserId(userId)

  return <ImageUploadButton />
}
