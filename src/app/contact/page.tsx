//src/app/contact/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
interface SupportTicket {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
export default function ContactPage() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
// 預填用戶數據（如果已登錄）
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
      setSuccess('訊息已成功提交！我們會盡快回覆您。');
      setFormData({ ...formData, message: '' });
// 重新獲取票證列表（如果已登錄）
      if (status === 'authenticated') {
        const ticketRes = await fetch('/api/support-ticket');
        if (ticketRes.ok) {
          const data = await ticketRes.json();
          setTickets(data.tickets);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失敗');
    }
  };
return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">聯繫我們</h1>
        <p className="mt-4 text-lg text-gray-600">
          有任何問題或需求？隨時與我們聯繫！
        </p>
      </div>
{/* 聯繫資訊與表單 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">聯繫方式</h2>
          <p className="text-gray-600 mb-2">
            <strong>電子郵件：</strong> support@ithostingpro.com
          </p>
          <p className="text-gray-600 mb-2">
            <strong>電話：</strong> +852 1234 5678
          </p>
          <p className="text-gray-600">
            <strong>地址：</strong> 香港中環金融街 8 號
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">發送訊息</h2>
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
      </div>
{/* 已提交的記錄（僅限已登錄用戶） */}
      {status === 'authenticated' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">您的提交記錄</h2>
          {tickets.length === 0 ? (
            <p className="text-gray-600">您尚未提交任何訊息。</p>
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
      )}
    </div>
  );
}
