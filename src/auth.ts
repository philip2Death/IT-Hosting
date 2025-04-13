
//src/auth.ts
import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials' 
import { PrismaClient } from '@prisma/client';

import { User } from 'next-auth';
import { compareSync } from 'bcryptjs'


declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string
    } & DefaultSession['user']
  }
}
const prisma = new PrismaClient();
export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      // 添加類型註解
      type: 'credentials',
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials): Promise<User | null> => { // 添加返回類型
        try {
          // 添加空值檢查
          if (!credentials?.email || !credentials?.password) return null
    
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toString() } // 強制轉換類型
          })
    
          const isValid = compareSync(
            credentials.password.toString(),
            user.password
          )
    
          return isValid ? {
            id: user.id.toString(),
            email: user.email,
            name: user.username || ''
          } : null
        } catch (error) {
          console.error('Auth Error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      return session;
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.AUTH_SECRET
});
