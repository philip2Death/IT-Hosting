// src/app/products/cloud-managed-services/page.tsx
export const dynamic = 'force-dynamic';
export default function CloudManagedServicesPage() {
    return (
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">雲端管理服務</h1>
          <p className="mt-4 text-lg text-gray-600">
            全面的雲端基礎設施管理，確保您的業務無縫運行。
          </p>
        </div>
  
        {/* 服務詳情 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">支援平台</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>AWS</li>
              <li>Microsoft Azure</li>
              <li>Google Cloud</li>
              <li>私有雲部署</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">服務內容</h2>
            <p className="text-gray-600">
              我們提供 24/7 監控、自動化維護、性能優化和安全管理，確保您的雲端基礎設施高效穩定。從遷移到日常運營，我們為您提供全方位的支援。
            </p>
          </div>
        </div>
  
        {/* CTA 按鈕 */}
        <div className="text-center">
          <a
            href="/pricing"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            立即開始
          </a>
        </div>
      </div>
    );
  }