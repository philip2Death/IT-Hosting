// src/app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface UserData {
  email: string;
  username?: string;
  lastLogin?: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP 錯誤! 狀態碼: ${res.status}`);
        }

        const data = await res.json();
        console.log('接收到的用戶數據:', data); // 調試日誌
        setUserData(data);
      } catch (error) {
        console.error('API Error:', error);
        setError(error instanceof Error ? error.message : '未知錯誤');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <p className="mt-4 text-gray-600">資料載入中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">MyApp</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                登出
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            歡迎回來, {userData?.username || userData?.email.split('@')[0]}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">帳戶資訊</h2>
              <div className="space-y-2">
                <p><span className="font-medium">電子郵件:</span> {userData?.email}</p>
                {userData?.username && (
                  <p><span className="font-medium">用戶名稱:</span> {userData.username}</p>
                )}
                {userData?.lastLogin && (
                  <p><span className="font-medium">最後登入:</span> {new Date(userData.lastLogin).toLocaleString()}</p>
                )}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">快速操作</h2>
              <div className="space-y-3">
                <Link
                  href="/profile"
                  className="block p-3 bg-gray-100 rounded-md hover:bg-blue-50 transition-colors"
                >
                  編輯個人資料
                </Link>
                <Link
                  href="/settings"
                  className="block p-3 bg-gray-100 rounded-md hover:bg-blue-50 transition-colors"
                >
                  帳戶設定
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}