// src/app/api/settings/password/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/config/auth";
import { prisma } from "@/lib/prisma";
import { compareSync, hashSync } from 'bcryptjs';
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }
  const { oldPassword, newPassword } = await request.json();
  if (!oldPassword || !newPassword || typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
    return NextResponse.json({ error: '密碼無效' }, { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: '用戶不存在' }, { status: 404 });
    }
    // 驗證舊密碼
    const isValid = compareSync(oldPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ error: '舊密碼不正確' }, { status: 401 });
    }
    // 哈希新密碼
    const hashedPassword = hashSync(newPassword, 12);
    // 更新密碼
    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword },
    });
    return NextResponse.json({ message: '密碼更新成功' });
  } catch (error) {
    console.error('[PASSWORD_API_ERROR]', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
