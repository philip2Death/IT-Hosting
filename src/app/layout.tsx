//src/app/layout.tsx
import type { Metadata } from "next";

import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';



export const metadata: Metadata = {
  title: 'IT Hosting Pro - 專業雲端服務',
  description: '提供企業級 Web Hosting、資料庫託管和網域註冊服務',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { name: 'Pricing', href: '/pricing' },
    { name: 'Services', href: '/services' },
    { name: 'Dashboard', href: '/dashboard' },
  ];
  return (
    
    <html lang="zh-HK">
      
      <body className="min-h-screen bg-gray-50">      
        <Navbar/>
        <main className="container mx-auto p-4 min-h-[calc(100vh-160px)]">
          {children}
        </main>
        <Footer/>
      </body>
      
    </html>
  );
}
