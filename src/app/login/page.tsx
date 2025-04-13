	// src/app/login/page.tsx
	'use client';
	import { useState } from 'react';
	import Link from 'next/link';
	
	export default function LoginPage() {
	  const [formData, setFormData] = useState({
	    email: '',
	    password: '',
	  });
	  const [error, setError] = useState('');
	
	  const handleSubmit = async (e: React.FormEvent) => {
	    e.preventDefault();
	    try {
	      const response = await fetch('/api/login', {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify(formData),
	      });
	      if (!response.ok) {
	        throw new Error('登入失敗');
	      }
	      // 登入成功，重定向到儀表板
	      window.location.href = '/dashboard';
	    } catch (err) {
	      setError('登入失敗，請檢查您的憑證');
	    }
	  };
	
	  return (
	    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
	      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">會員登入</h1>
	      <form onSubmit={handleSubmit} className="space-y-4">
	        <div>
	          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
	            電子郵件
	          </label>
	          <input
	            id="email"
	            type="email"
	            value={formData.email}
	            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
	            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
	            required
	          />
	        </div>
	        <div>
	          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
	            密碼
	          </label>
	          <input
	            id="password"
	            type="password"
	            value={formData.password}
	            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
	            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
	            required
	          />
	        </div>
	        {error && <p className="text-red-500 text-center">{error}</p>}
	        <button
	          type="submit"
	          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
	        >
	          登入
	        </button>
	      </form>
	      <p className="mt-4 text-center text-gray-600">
	        還沒有帳戶？{' '}
	        <Link href="/register" className="text-blue-600 hover:underline">
	          註冊
	        </Link>
	      </p>
	    </div>
	  );
	}
