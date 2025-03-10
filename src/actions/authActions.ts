'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { combinedRegisterSchema, RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema'
import { ActionResult } from '@/types'
import { TokenType, User } from '@prisma/client'
import { LoginSchema } from '@/lib/schemas/loginSchema'
import { AuthError } from 'next-auth'
import { signIn, signOut, auth } from '@/auth'
import { generateToken } from '@/lib/tokens'

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(data.email)

    if (!existingUser || !existingUser.email)
      return { status: 'error', error: 'Invalid credentials' }

    if (!existingUser.emailVerified) {
      const token = await generateToken(
        existingUser.email,
        TokenType.VERIFICATION
      )

      return {
        status: 'error',
        error: 'Please verify your email address before logging in',
      }
    }

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    return { status: 'success', data: 'logged in' }
  } catch (error) {
    console.log(error)

    if (error instanceof AuthError) {
      // 這是 NextAuth 的認證錯誤
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: 'error', error: 'Invalid credentials' }
        default:
          return { status: 'error', error: 'Something went wrong' }
      }
    } else {
      return { status: 'error', error: 'Something else went wrong' }
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
    const validated = combinedRegisterSchema.safeParse(data);

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
        member:{
          create:{
            city,
            company,
            description
          }
        }
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
