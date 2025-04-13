import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/auth';
import { prisma } from '@/lib/prisma';
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { name, email, message } = await request.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: '請填寫所有欄位' }, { status: 400 });
  }
  try {
    const ticket = await prisma.supportTicket.create({
      data: {
        name,
        email,
        message,
        userId: session?.user?.id || null, // 如果用戶已登錄，關聯 userId
      },
    });
    return NextResponse.json({ message: '技術支援請求已提交！', ticket });
  } catch (error) {
    console.error('[SUPPORT_TICKET_API_ERROR]', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }
  try {
    const tickets = await prisma.supportTicket.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ tickets });
  } catch (error) {
    console.error('[SUPPORT_TICKET_GET_API_ERROR]', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
