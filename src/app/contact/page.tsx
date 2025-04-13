'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    // 模擬提交邏輯（可後續實現 API 請求）
    if (!formData.name || !formData.email || !formData.message) {
      setError('請填寫所有欄位');
      return;
    }

    setSuccess('訊息已成功提交！我們會盡快回覆您。');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">聯繫我們</h1>
        <p className="mt-4 text-lg text-gray-600">
          有任何問題或需求？隨時與我們聯繫！
        </p>
      </div>

      {/* 聯繫資訊 */}
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

        {/* 聯繫表單 */}
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
    </div>
  );
}