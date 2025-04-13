// src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashSync } from 'bcryptjs';

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
  }

  try {
    // 檢查用戶是否已存在
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: '電子郵件或用戶名已被註冊' }, { status: 409 });
    }

    // 哈希密碼
    const hashedPassword = hashSync(password, 12);

    // 創建新用戶
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('[REGISTER_API_ERROR]', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}