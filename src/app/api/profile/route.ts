// src/app/api/profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/config/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  const { username } = await request.json();

  if (!username || typeof username !== 'string') {
    return NextResponse.json({ error: '用戶名無效' }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { username },
      select: {
        email: true,
        username: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      ...updatedUser,
      lastLogin: updatedUser.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('[PROFILE_API_ERROR]', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
