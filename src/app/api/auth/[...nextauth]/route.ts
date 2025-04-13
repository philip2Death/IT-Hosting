// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/config/auth"; 
import { validateEnvVars } from "@/lib/security/env-check";

// 環境變量預檢核
validateEnvVars([
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
]);

// 強化型配置擴展
const enhancedAuthOptions = {
  ...authOptions,
  trustHost: true,
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.COOKIE_DOMAIN || 'localhost'
      }
    }
  },
  logger: {
    error(code: string, metadata: Error | { [key: string]: unknown; error: Error }) {
      // 處理 metadata 為 Error 的情況
      if (metadata instanceof Error) {
        console.error({ type: 'next-auth-error', code, error: metadata.message, stack: metadata.stack });
      } else {
        // 處理 metadata 為對象的情況
        console.error({ type: 'next-auth-error', code, metadata });
      }
    },
    warn(code: string) {
      console.warn({ type: 'next-auth-warning', code });
    }
  }
};

// 核心處理器
const handler = NextAuth(enhancedAuthOptions);

// 強制動態渲染 (Next.js 15+ 要求)
export const dynamic = 'force-dynamic';

// 必要方法導出
export { handler as GET, handler as POST };