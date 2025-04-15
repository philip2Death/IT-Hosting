// src/app/products/web-hosting/page.tsx
export const dynamic = 'force-dynamic';
export default function WebHostingPage() {
    return (
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">網站託管服務</h1>
          <p className="mt-4 text-lg text-gray-600">
            快速、安全且可靠的網站託管，助力您的線上業務蓬勃發展。
          </p>
        </div>
  
        {/* 服務詳情 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">主要功能</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>支援多種 CMS（如 WordPress、Magento）</li>
              <li>99.9% 上線時間保證</li>
              <li>全球 CDN 加速，提升網站載入速度</li>
              <li>免費 SSL 證書，確保數據安全</li>
              <li>每日備份，防止數據丟失</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">為什麼選擇我們</h2>
            <p className="text-gray-600">
              我們的網站託管服務專為企業設計，提供高效能伺服器和專業技術支援，確保您的網站始終線上並快速響應。無論是小型博客還是大型電商平台，我們都能滿足您的需求。
            </p>
          </div>
        </div>
  
        {/* CTA 按鈕 */}
        <div className="text-center">
          <a
            href="/pricing"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            查看定價方案
          </a>
        </div>
      </div>
    );
  }