// src/app/profile/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface UserData {
  email: string;
  username?: string;
  lastLogin?: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 獲取用戶資料
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
        console.log('接收到的用戶數據:', data);
        setUserData(data);
        setNewUsername(data.username || ''); // 預填表單
      } catch (error) {
        console.error('API Error:', error);
        setError(error instanceof Error ? error.message : '未知錯誤');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 提交更新用戶名
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setUpdating(true);

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (!res.ok) {
        throw new Error(`HTTP 錯誤! 狀態碼: ${res.status}`);
      }

      const updatedUser = await res.json();
      setUserData(updatedUser); // 更新前端顯示的數據
      setSuccess('用戶名更新成功！');
    } catch (error) {
      setError(error instanceof Error ? error.message : '更新失敗');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <p className="mt-4 text-gray-600">資料載入中...</p>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="mt-4 text-blue-600 hover:underline"
        >
          登出
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 導覽列 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">MyApp</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                返回儀表板
              </Link>
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

      {/* 主內容區 */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">編輯個人資料</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 當前用戶資訊 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">當前資訊</h2>
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

            {/* 編輯表單 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">更新用戶名</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    新用戶名
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <button
                  type="submit"
                  disabled={updating}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {updating ? '更新中...' : '更新用戶名'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}