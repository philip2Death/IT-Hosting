'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!signInResult?.ok) {
        throw new Error(signInResult?.error || '登錄失敗');
      }

      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('發生未預期的錯誤');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左側品牌介紹 */}
        <div className="flex flex-col justify-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            歡迎使用 IT Hosting Pro
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            我們提供企業級的 Web Hosting、AI 大模型部署和雲端管理服務，助力您的業務在數位時代脫穎而出。
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            探索我們的產品
          </Link>
        </div>

        {/* 右側登錄表單 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            登錄您的帳戶
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                電子郵件
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700 font-medium">
                密碼
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              登錄
            </button>
          </form>
          <div className="mt-4 text-center text-gray-600">
            <p>
              忘記密碼？{' '}
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                重置密碼
              </Link>
            </p>
            <p className="mt-2">
              還沒有帳戶？{' '}
              <Link href="/register" className="text-blue-600 hover:underline">
                註冊
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}