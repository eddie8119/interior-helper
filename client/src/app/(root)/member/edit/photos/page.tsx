import React from 'react'
import { getAuthUserId } from '@/actions/authActions'
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from '@/actions/memberActions'

export default async function PhotosPage() {
  const userId = await getAuthUserId()
  const member = await getMemberByUserId(userId)
  const photos = await getMemberPhotosByUserId(userId)

  return <div>page</div>
}
