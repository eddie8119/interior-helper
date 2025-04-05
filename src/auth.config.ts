import { compare } from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from './actions/authActions'
import { loginSchema } from './lib/schemas/loginSchema'

export default {
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds)
        if (validated.success) {
          const { email, password } = validated.data

          const user = await getUserByEmail(email)

          if (
            !user ||
            !user.passwordHash ||
            !(await compare(password, user.passwordHash))
          )
            return null

          return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig // 確保配置符合 NextAuthConfig 類型

// 資料驗證：
// 用戶查詢：
// 密碼驗證：
// 安全性考慮：
