import React from 'react'
import EditForm from '@/components/member/EditForm'
import { getAuthUserId } from '@/actions/authActions'
import { getMemberByUserId } from '@/actions/memberActions'
import { notFound } from 'next/navigation'

export default async function page() {
  const userId = await getAuthUserId()
  const member = await getMemberByUserId(userId)

  if (!member) return notFound()
  return <EditForm member={member} />
}
