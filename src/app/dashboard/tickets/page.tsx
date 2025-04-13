'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface SupportTicket {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function TicketsPage() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // 預填用戶數據並獲取票證列表
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/support-ticket');
        if (res.ok) {
          const data = await res.json();
          setTickets(data.tickets);
        }
      } catch (err) {
        console.error('Fetch Tickets Error:', err);
      }
    };

    if (status === 'authenticated' && session?.user) {
      // 從 session 中獲取用戶信息，無需額外請求 /api/user
      setFormData({
        name: session.user.name || session.user.email?.split('@')[0] || '',
        email: session.user.email || '',
        message: '',
      });
      fetchTickets();
    } else {
      // 未登錄用戶，清空表單
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }
  }, [status, session]); // 添加 session 作為依賴項

  // 提交 Support Ticket
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const res = await fetch('/api/support-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || '提交失敗');
      }

      setSuccess('技術支援請求已提交！');
      setFormData({ ...formData, message: '' });

      // 重新獲取票證列表
      const ticketRes = await fetch('/api/support-ticket');
      if (ticketRes.ok) {
        const data = await ticketRes.json();
        setTickets(data.tickets);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失敗');
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-12">載入中...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">請先登入！</p>
        <Link href="/login" className="text-blue-600 hover:underline">
          前往登入
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            歡迎回來, {formData.name || '用戶'}！
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            您的電子郵件：{formData.email || '載入中...'}
          </p>
          <Link
            href="/dashboard"
            className="inline-block text-blue-600 hover:underline mb-6"
          >
            返回
          </Link>

          {/* Support Ticket 區域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 提交表單 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">提交技術支援請求</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium">
                    姓名
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
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
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium">
                    訊息
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                  />
                </div>
                {success && <p className="text-green-500 text-center">{success}</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  提交
                </button>
              </form>
            </div>

            {/* 已提交的票證列表 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">您的技術支援記錄</h2>
              {tickets.length === 0 ? (
                <p className="text-gray-600">您尚未提交任何技術支援請求。</p>
              ) : (
                <ul className="space-y-4">
                  {tickets.map((ticket) => (
                    <li key={ticket.id} className="border-b pb-2">
                      <p className="text-gray-700">
                        <strong>訊息：</strong> {ticket.message}
                      </p>
                      <p className="text-gray-500 text-sm">
                        提交時間：{new Date(ticket.createdAt).toLocaleString('zh-HK')}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}