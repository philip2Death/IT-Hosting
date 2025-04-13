// src/app/api/user/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/config/auth" 
import { PrismaClient } from '@prisma/client'
import { prisma } from "@/lib/prisma" // 使用共享实例



export async function GET() {
    console.log('Auth Config:', JSON.stringify(authOptions, null, 2))
    
  const session = await getServerSession(authOptions)
  console.log('Session Data:', session) // 查看 session 實際值
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: '未授權' }, 
      { status: 401 }
    )
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        email: true,
        username: true,
        updatedAt: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: '用戶不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...user,
      lastLogin: user.updatedAt.toISOString()
    })

  } catch (error) {
    console.error('[USER_API_ERROR]', error)
    return NextResponse.json(
      { error: '伺服器錯誤' },
      { status: 500 }
    )
  }
}
