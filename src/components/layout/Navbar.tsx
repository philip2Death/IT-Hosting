// src/components/layout/Navbar.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  navItems: NavItem[];
}

export default function Navbar({ navItems }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* 品牌標誌 */}
        <Link href="/" className="text-xl font-bold tracking-tighter">
          IT Hosting Pro
        </Link>

        {/* 桌面端導航 */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-blue-400 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
          {status === 'authenticated' ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                儀表板
              </Link>
              <Link
                href="/dashboard/tickets" // 新增 Tickets 鏈接
                className="hover:text-blue-400 transition-colors duration-200"
              >
                查看 Ticket
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                登出
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                登入
              </Link>
              <Link
                href="/register"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                註冊
              </Link>
            </>
          )}
        </div>

        {/* 手機端漢堡選單按鈕 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden touch-manipulation active:scale-[0.98] focus-visible:ring-2 ring-offset-2 ring-blue-500"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* 手機端下拉菜單（添加動畫） */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-blue-400 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {status === 'authenticated' ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                儀表板
              </Link>
              <Link
                href="/dashboard/tickets" // 新增 Tickets 鏈接
                className="hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                查看 Ticket
              </Link>
              <button
                onClick={() => {
                  signOut({ callbackUrl: '/login' });
                  setIsOpen(false);
                }}
                className="text-left hover:text-blue-400 transition-colors duration-200"
              >
                登出
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                登入
              </Link>
              <Link
                href="/register"
                className="hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                註冊
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}