// src/app/api/user/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/config/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log('Session Data:', session); // 調試 session

  if (!session?.user?.email) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        email: true,
        username: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: '用戶不存在' }, { status: 404 });
    }

    return NextResponse.json({
      ...user,
      lastLogin: user.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('[USER_API_ERROR]', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}