import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-gray-300">
          © {new Date().getFullYear()} IT Hosting Pro - 高端雲服務提供商
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
            關於我們
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
            聯繫我們
          </Link>
          <Link href="/terms" className="text-gray-300 hover:text-blue-400 transition-colors">
            服務條款
          </Link>
          <Link href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors">
            隱私政策
          </Link>
          <Link href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors">
            常見問題
          </Link>
        </div>
      </div>
    </footer>
  );
}
