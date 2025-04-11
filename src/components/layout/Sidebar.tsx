// src/components/layout/Navbar.tsx
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          IT Hosting Pro
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-gray-200 hover:text-gray-400 transition-colors">
            登入
          </Link>
          <Link href="/register" className="text-gray-200 hover:text-gray-400 transition-colors">
            註冊
          </Link>
        </div>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
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
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
      </div>
      {/* 移動端菜單 */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col items-center gap-2">
          <Link href="/login" className="text-gray-200 hover:text-gray-400 transition-colors">
            登入
          </Link>
          <Link href="/register" className="text-gray-200 hover:text-gray-400 transition-colors">
            註冊
          </Link>
        </div>
      )}
    </nav>
  );
}
