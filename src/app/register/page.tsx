'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react'; // 引入 signIn 函數

export default function RegisterPage() {
  const router = useRouter();

  const validatePassword = (password: string) => {
    const rulePW = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return rulePW.test(password);
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('密碼不匹配！');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('密碼需至少8字符，包含大小寫字母和數字');
      return;
    }

    try {
      // 1. 發送註冊請求
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.status === 409) {
        setError('電子郵件或用戶名已被註冊');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP 錯誤！狀態碼: ${response.status}`);
      }

      console.log('註冊成功:', data.user);

      // 2. 註冊成功後自動登入
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false, // 先不自動重定向，手動處理
      });

      if (!signInResult?.ok) {
        throw new Error(signInResult?.error || '自動登入失敗');
      }

      // 3. 跳轉到儀表板
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-[--white] rounded-lg shadow-md md:p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-[var(--primary)]">
        註冊新帳戶
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-[var(--text)] font-medium">
            用戶名
          </label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-2 border border-[oklch(80%_0.02_0)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-[var(--text)] font-medium">
            電子郵件
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border border-[oklch(80%_0.02_0)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-[var(--text)] font-medium">
            密碼
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border border-[oklch(80%_0.02_0)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-[var(--text)] font-medium">
            確認密碼
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full p-2 border border-[oklch(80%_0.02_0)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        {error && <p className="text-[oklch(50%_0.25_30)] text-center">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-[var(--primary)] text-[--white] rounded hover:bg-[var(--secondary)] transition-colors"
        >
          註冊
        </button>
      </form>
      <p className="mt-4 text-center text-[var(--text)]">
        已有帳戶？{' '}
        <Link href="/login" className="text-[var(--primary)] hover:underline">
          登入
        </Link>
      </p>
    </div>
  );
}