// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client/edge' // Next.js 邊緣環境專用導入方式

export const prisma = new PrismaClient();