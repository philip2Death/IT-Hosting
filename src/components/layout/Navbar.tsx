//src/components/layout/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[oklch(var(--nav-bg)/1)] text-[oklch(var(--nav-text))] p-4">
      <div className="@container/navbar mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          IT Hosting Pro
        </Link>
        
        <div className="hidden @[768px]:flex items-center gap-4">
          <Link 
            href="/login" 
            className="hover:text-[oklch(80%_0.02_0)] transition-colors duration-200 ease-productive"
          >
            登入
          </Link>
          <Link
            href="/register"
            className="hover:text-[oklch(80%_0.02_0)] transition-colors duration-200 ease-productive"
          >
            註冊
          </Link>
        </div>

        <button 
          className="@[768px]:hidden touch-manipulation active:scale-[0.98]
                     focus-visible:ring-2 ring-offset-2 ring-[oklch(var(--nav-text)/0.5)]"
        >
          {/* SVG保持不變 */}
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
    </nav>
  );
}
