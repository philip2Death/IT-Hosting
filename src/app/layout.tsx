import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SessionProviderWrapper from '@/components/SessionProviderWrapper'; // 引入新組件

export const metadata: Metadata = {
  title: 'IT Hosting Pro - 專業雲端服務',
  description: '提供企業級 Web Hosting、資料庫託管和網域註冊服務',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: '產品與服務', href: '/products' },
    { name: '定價', href: '/pricing' },
    { name: '關於我們', href: '/about' },
    { name: '聯繫我們', href: '/contact' },
  ];

  return (
    <html lang="zh-HK">
      <body className="min-h-screen bg-gray-50">
        <SessionProviderWrapper>
          <Navbar navItems={navItems} />
          <main className="container mx-auto p-4 min-h-[calc(100vh-160px)]">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}