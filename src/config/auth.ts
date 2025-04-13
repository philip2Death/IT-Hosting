import NextAuth, { DefaultSession  } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compareSync } from 'bcryptjs';
import { prisma } from "@/lib/prisma";
import { type NextAuthOptions } from 'next-auth' // 統一導入方式
// 擴展 Session 類型
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string
    } & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  providers: [
    Credentials({
      type: 'credentials',
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) return null

          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toString() }
          })

          if (!user) return null

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
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.name = token.name as string
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}
