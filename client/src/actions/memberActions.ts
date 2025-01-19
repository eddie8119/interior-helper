'use server'

import { prisma } from '@/lib/prisma'
import { Photo } from '@prisma/client';
import { getAuthUserId } from './authActions';

export async function getMemberByUserId(userId: string) {
  try {
    return prisma.member.findUnique({ where: { userId } })
  } catch (error) {
    console.log(error)
  }
}

export async function getMemberPhotosByUserId(userId: string) {
  const currentUserId = await getAuthUserId();

  const member = await prisma.member.findUnique({
      where: {userId},
      select: {photos: {
          where: currentUserId === userId ? {} : {isApproved: true}
      }}
  });

  if (!member) return null;

  return member.photos as Photo[];
}