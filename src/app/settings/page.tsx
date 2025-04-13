// src/app/settings/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
export default function SettingsPage() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
// 更改密碼
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setUpdating(true);
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('新密碼與確認密碼不匹配');
      setUpdating(false);
      return;
    }
try {
      const res = await fetch('/api/settings/password', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || '更改密碼失敗');
      }
      setSuccess('密碼更新成功！請重新登入。');
      setTimeout(() => {
        signOut({ callbackUrl: '/login' });
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : '更改密碼失敗');
    } finally {
      setUpdating(false);
    }
  };
// 刪除帳戶
  const handleDeleteAccount = async () => {
    setError(null);
    setSuccess(null);
    setDeleting(true);
try {
      const res = await fetch('/api/settings/account', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || '刪除帳戶失敗');
      }
      setSuccess('帳戶已成功刪除！');
      setTimeout(() => {
        signOut({ callbackUrl: '/login' });
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : '刪除帳戶失敗');
    } finally {
      setDeleting(false);
    }
  };
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">帳戶設定</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 更改密碼 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">更改密碼</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                    舊密碼
                  </label>
                  <input
                    id="oldPassword"
                    type="password"
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, oldPassword: e.target.value })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    新密碼
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    確認新密碼
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
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
                  {updating ? '更新中...' : '更改密碼'}
                </button>
              </form>
            </div>
{/* 刪除帳戶 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-red-600">危險區域</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  刪除帳戶將永久移除您的所有資料，且無法恢復。請謹慎操作。
                </p>
                {showDeleteConfirm ? (
                  <div className="space-y-3">
                    <p className="text-red-500 font-medium">您確定要刪除帳戶嗎？</p>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={deleting}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400"
                      >
                        {deleting ? '刪除中...' : '確認刪除'}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    刪除帳戶
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
