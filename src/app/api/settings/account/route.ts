// src/app/api/settings/account/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/config/auth";
import { prisma } from "@/lib/prisma";
export async function DELETE(request: Request) {
    console.log('request', request);
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }
  try {
    await prisma.user.delete({
      where: { email: session.user.email },
    });
    return NextResponse.json({ message: '帳戶已成功刪除' });
  } catch (error) {
    console.error('[ACCOUNT_DELETE_API_ERROR]', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
