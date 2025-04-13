export default function PricingPage() {
    const pricingPlans = [
      {
        title: '網站託管 - 基礎版',
        price: 'HK$99/月',
        features: ['10GB 儲存空間', '無限頻寬', '免費 SSL', '24/7 支援'],
      },
      {
        title: 'AI 大模型安裝 - 標準版',
        price: 'HK$2,500/次',
        features: ['支援主流框架', '模型優化', '技術諮詢', '30天售後支援'],
      },
      {
        title: '雲端管理 - 企業版',
        price: 'HK$1,200/月',
        features: ['24/7 監控', '自動化維護', '多雲支援', '專屬技術支援'],
      },
    ];
  
    return (
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">定價方案</h1>
          <p className="mt-4 text-lg text-gray-600">
            選擇最適合您業務的方案，立即開始使用我們的服務。
          </p>
        </div>
  
        {/* 定價卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{plan.title}</h2>
              <p className="text-2xl font-bold text-blue-600 mb-4">{plan.price}</p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                立即購買
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }