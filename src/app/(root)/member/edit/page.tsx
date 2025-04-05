import { notFound } from 'next/navigation'
import React from 'react'
import { getAuthUserId } from '@/actions/authActions'
import { getMemberByUserId } from '@/actions/memberActions'
import EditForm from '@/components/member/EditForm'

export default async function page() {
  const userId = await getAuthUserId()
  const member = await getMemberByUserId(userId)

  if (!member) return notFound()
  return <EditForm member={member} />
}
