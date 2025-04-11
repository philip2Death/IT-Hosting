// src/components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[oklch(20%_0.02_0)] text-[--white] py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-[oklch(80%_0.02_0)]">
          © {new Date().getFullYear()} IT Hosting Pro - 高端雲服務提供商
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/terms" className="text-[oklch(80%_0.02_0)] hover:text-[var(--primary)] transition-colors">
            服務條款
          </Link>
          <Link href="/privacy" className="text-[oklch(80%_0.02_0)] hover:text-[var(--primary)] transition-colors">
            隱私政策
          </Link>
        </div>
      </div>
    </footer>
  );
}