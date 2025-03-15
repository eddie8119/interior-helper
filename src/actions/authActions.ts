'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import {
  combinedRegisterSchema,
  RegisterSchema,
  registerSchema,
} from '@/lib/schemas/registerSchema'
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail'
import { ActionResult } from '@/types'
import { TokenType, User } from '@prisma/client'
import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema'
import { AuthError } from 'next-auth'
import { signIn, signOut, auth } from '@/auth'
import { generateToken } from '@/lib/tokens'

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<null>> {
  try {
    const validated = loginSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    const { email, password } = validated.data

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return {
        status: 'error',
        error: '找不到使用者',
      }
    }

    if (!user.passwordHash) {
      return {
        status: 'error',
        error: '帳號設定錯誤',
      }
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash)

    if (!isValidPassword) {
      return {
        status: 'error',
        error: '密碼錯誤',
      }
    }

    const result = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    })

    if (!result?.ok) {
      throw new Error('登入失敗')
    }

    return { status: 'success', data: null }
  } catch (error) {
    console.error(error)
    return {
      status: 'error',
      error: '登入失敗',
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/' })
}

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validated = combinedRegisterSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    const { name, email, password, city, company, description } = validated.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { status: 'error', error: 'user already exists' }
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        profileComplete: true,
        member: {
          create: {
            city,
            company,
            description,
          },
        },
      },
    })

    // const verificationToken = await generateToken(email, TokenType.VERIFICATION)
    // await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { status: 'success', data: user }
  } catch (error) {
    console.log(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export async function getAuthUserId() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error('Unauthorised')

  return userId
}
