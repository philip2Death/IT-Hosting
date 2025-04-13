'use client';
import Link from 'next/link';
import { useState } from 'react';

// 假設您有一個圖標組件或圖片資源，這裡用簡單的 SVG 代替
const ProductIcon = ({ type }: { type: string }) => {
  if (type === 'web-hosting') {
    return (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10h6m-3-3v6" />
      </svg>
    );
  }
  if (type === 'ai-model') {
    return (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
    );
  }
  return (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15h18M9 9h6m-3-3v6" />
    </svg>
  );
};

export default function ProductsPage() {
  const [category, setCategory] = useState('all');

  const products = [
    {
      category: 'hosting',
      title: 'Web Hosting',
      description:
        '快速、安全且可靠的網站託管服務，支援多種 CMS（如 WordPress、Magento），提供 99.9% 上線時間保證和全球 CDN 加速。',
      link: '/products/web-hosting',
      icon: 'web-hosting',
    },
    {
      category: 'ai',
      title: 'AI 大模型安裝',
      description:
        '為您的企業提供專業的 AI 大模型部署服務，支援主流框架（如 TensorFlow、PyTorch），並整合到您的應用中，提升智能化體驗。',
      link: '/products/ai-model-installation',
      icon: 'ai-model',
    },
    {
      category: 'cloud',
      title: '雲端管理服務',
      description:
        '全面的雲端基礎設施管理，支援 AWS、Azure 和 Google Cloud，提供 24/7 監控、自動化維護和性能優化，確保您的業務無縫運行。',
      link: '/products/cloud-managed-services',
      icon: 'cloud',
    },
  ];

  const filteredProducts =
    category === 'all' ? products : products.filter((product) => product.category === category);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">我們的產品與服務</h1>
        <p className="mt-4 text-lg text-gray-600">
          探索我們為您的業務提供的創新解決方案，助力您在數位時代脫穎而出。
        </p>
      </div>

      {/* 分類導航 */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-2 rounded-md font-medium ${
            category === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          全部
        </button>
        <button
          onClick={() => setCategory('hosting')}
          className={`px-4 py-2 rounded-md font-medium ${
            category === 'hosting'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          網站託管
        </button>
        <button
          onClick={() => setCategory('ai')}
          className={`px-4 py-2 rounded-md font-medium ${
            category === 'ai'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          AI 服務
        </button>
        <button
          onClick={() => setCategory('cloud')}
          className={`px-4 py-2 rounded-md font-medium ${
            category === 'cloud'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          雲端管理
        </button>
      </div>

      {/* 產品卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
          >
            <ProductIcon type={product.icon} />
            <h2 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{product.title}</h2>
            <p className="text-gray-600 text-center mb-6">{product.description}</p>
            <Link
              href={product.link}
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              了解更多
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}