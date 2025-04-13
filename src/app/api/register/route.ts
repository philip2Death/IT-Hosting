// src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from "@/lib/prisma"; 

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // 密碼哈希處理
    const hashedPassword = await bcrypt.hash(password, 12);

    // 創建用戶
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    return NextResponse.json({ 
      success: true,
      user: { id: user.id, email: user.email }
    }, { status: 201 });

  } catch (error: unknown) {
    // Prisma 特定錯誤處理
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: '電子郵件或用戶名已被註冊' },
          { status: 409 }
        );
      }
    }

    // 通用錯誤處理
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: '未知伺服器錯誤' },
      { status: 500 }
    );
  }
}
