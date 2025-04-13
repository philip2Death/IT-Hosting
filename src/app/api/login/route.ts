// src/app/api/login/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma"; 

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(`用戶查詢失敗：email=${email}`); // 記錄用戶不存在的情況
      return NextResponse.json({ error: '用戶不存在' }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      console.log(`密碼驗證失敗：email=${email}`); // 記錄密碼錯誤的情況
      return NextResponse.json({ error: '密碼錯誤' }, { status: 401 });
    }

    // 如果密碼匹配，打印用戶完整的 SQL 資料和 API 回應
    console.log('用戶資料（SQL）:', user);
    console.log('API 回應:', {
      id: user.id,
      email: user.email,
      username: user.username,
    });

    // 登入成功，返回用戶信息（不包含密碼）
    return NextResponse.json({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error('伺服器錯誤:', error); // 記錄伺服器錯誤
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
