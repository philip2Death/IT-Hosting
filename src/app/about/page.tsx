export default function AboutPage() {
    return (
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">關於我們</h1>
          <p className="mt-4 text-lg text-gray-600">
            了解 IT Hosting Pro 的故事與使命。
          </p>
        </div>
  
        {/* 公司背景 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">我們的背景</h2>
          <p className="text-gray-600">
            IT Hosting Pro 成立於 2020 年，致力於為企業提供高效、安全的雲端解決方案。我們的團隊由一群熱衷於技術創新的專業人士組成，專注於網站託管、AI 部署和雲端管理服務。
          </p>
        </div>
  
        {/* 使命 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">我們的使命</h2>
          <p className="text-gray-600">
            我們的使命是通過先進的技術和優質的服務，幫助客戶在數位時代脫穎而出。我們相信，穩定的基礎設施和智能化的解決方案是企業成功的關鍵。
          </p>
        </div>
  
        {/* CTA 按鈕 */}
        <div className="text-center">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            聯繫我們
          </a>
        </div>
      </div>
    );
  }