import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import { prisma } from './lib/prisma'

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  callbacks:{
    async session({token, session}){     
      if(token.sub && session.user) {
        session.user.id = token.sub
      }   
       // NextAuth 默認的 session 不包含用戶 ID
       // 我們需要用戶 ID 來進行數據庫操作和權限驗證
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
