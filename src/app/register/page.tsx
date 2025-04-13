// src/app/register/page.tsx
'use client'; 
// 指定此文件為 Next.js 客戶端組件，支持 React Hooks 和前端交互。

import { useState } from 'react';
// 引入 useState 用來管理表單狀態。
import Link from 'next/link';
// 引入 Next.js 的 Link 元件，用於客戶端導航。

export default function RegisterPage() {
  // 定義 RegisterPage 組件，包含表單交互和註冊邏輯。

  const validatePassword = (password: string) => {
    // 定義密碼驗證函數 validatePassword，用於檢查密碼強度。
    const rulePW = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // 正則表達式：密碼需至少8個字符，包含大小寫字母和至少一個數字。
    return rulePW.test(password);
    // 返回布林值：符合規範返回 true，不符合返回 false。
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // 使用 useState 管理表單資料，包括用戶名、電子郵件、密碼和確認密碼。

  const [error, setError] = useState('');
  // 使用 useState 管理錯誤訊息，當表單有問題時顯示相關提示。

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 停止表單的默認提交行為，防止頁面刷新。

    if (formData.password !== formData.confirmPassword) {
      // 如果密碼與確認密碼不匹配，設置錯誤訊息。
      setError('密碼不匹配！');
      return;
    }

    if (!validatePassword(formData.password)) {
      // 如果密碼不符合正則要求，設置錯誤訊息。
      setError('密碼需至少8字符，包含大小寫字母和數字');
      return;
    }

    try {
      // 發送 POST 請求到後端進行註冊。
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 設置請求標頭為 JSON 格式。
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
        // 傳遞表單資料給後端 API。
      });

      if (response.status === 409) {
        // 如果後端返回 HTTP 狀態碼 409，表示用戶名或電子郵件已被註冊。
        setError('電子郵件或用戶名已被註冊');
        return;
      }

      const data = await response.json();
      // 將伺服器的回應解析為 JSON 格式。

      if (!response.ok) {
        // 如果 response.ok 為 false，拋出錯誤並顯示錯誤訊息。
        throw new Error(data.error || `HTTP 錯誤！狀態碼: ${response.status}`);
      }

      console.log('註冊成功:', data.user);
      // 如果註冊成功，打印用戶信息至控制台。

      // 可選：添加跳轉邏輯，例如跳轉到 Dashboard 頁面。
      // router.push('/dashboard');

    } catch (error: unknown) {
      if (error instanceof Error) {
        // 如果捕獲的錯誤是 Error 類型，顯示具體錯誤訊息。
        setError(error.message);
      } else {
        // 否則，顯示通用的錯誤訊息。
        setError('發生未預期的錯誤');
      }
    }
  };

  return (
    // 渲染註冊頁面的 HTML 和 UI。
    <div className="max-w-md mx-auto mt-10 p-6 bg-[--white] rounded-lg shadow-md md:p-8">
      {/* 設置表單外部容器，使用 Tailwind CSS 定義樣式 */}
      <h1 className="text-2xl font-bold text-center mb-6 text-[var(--primary)]">
        註冊新帳戶
      </h1>
      {/* 頁面標題，設置文字樣式 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 表單容器，綁定提交事件處理函數 */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-[var(--text)] font-medium">
            用戶名
          </label>
          {/* 用戶名輸入框 */}
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            // 更新用戶名狀態（雙向綁定）
            className="w-full p-2 border border-[oklch(80%_0.02_0)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
          {/* 必填輸入框，設置樣式 */}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-[var(--text)] font-medium">
            電子郵件
          </label>
          {/* 電子郵件輸入框 */}
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            // 更新電子郵件狀態（雙向綁定）
            className="w-full p-2 border border-[oklch(80%_0.02_0)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
          {/* 必填輸入框 */}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-[var(--text)] font-medium">
            密碼
          </label>
          {/* 密碼輸入框 */}
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            // 更新密碼狀態（雙向綁定）
            className="w-full p-2 border border-[oklch(80%_0.02_0)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-[var(--text)] font-medium">
            確認密碼
          </label>
          {/* 確認密碼輸入框 */}
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            // 更新確認密碼狀態（雙向綁定）
            className="w-full p-2 border border-[oklch(80%_0.02_0)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        {error && <p className="text-[oklch(50%_0.25_30)] text-center">{error}</p>}
        {/* 如果存在錯誤訊息，顯示提示 */}
        <button
          type="submit"
          className="w-full p-2 bg-[var(--primary)] text-[--white] rounded hover:bg-[var(--secondary)] transition-colors  " 
        >
          註冊
        </button>
        {/* 註冊按鈕 */}
      </form>
      <p className="mt-4 text-center text-[var(--text)]">
        已有帳戶？{' '}
        <Link href="/login" className="text-[var(--primary)] hover:underline">
          登入
        </Link>
        {/* 登入連結，導航到登入頁面 */}
      </p>
    </div>
  );
}
