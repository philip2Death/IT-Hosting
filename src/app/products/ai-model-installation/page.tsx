// src/app/products/ai-model-installation/page.tsx
export const dynamic = 'force-dynamic';
export default function AIModelInstallationPage() {
    return (
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">AI 大模型安裝服務</h1>
          <p className="mt-4 text-lg text-gray-600">
            專業部署 AI 大模型，提升您的業務智能化水平。
          </p>
        </div>
  
        {/* 服務詳情 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">支援框架</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>TensorFlow</li>
              <li>PyTorch</li>
              <li>Hugging Face Transformers</li>
              <li>ONNX</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">應用場景</h2>
            <p className="text-gray-600">
              我們的 AI 大模型安裝服務適用於自然語言處理（NLP）、圖像識別、推薦系統等多個領域。我們提供端到端的部署方案，確保模型高效運行並與您的應用無縫整合。
            </p>
          </div>
        </div>
  
        {/* CTA 按鈕 */}
        <div className="text-center">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            聯繫我們以了解更多
          </a>
        </div>
      </div>
    );
  }