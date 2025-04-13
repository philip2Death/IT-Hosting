export default function FAQPage() {
    return (
      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">常見問題</h1>
        <p className="text-gray-600 mb-8 text-center">
          以下是一些常見問題及其解答。如需更多幫助，請聯繫我們。
        </p>
  
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. 如何開始使用 IT Hosting Pro？</h2>
            <p className="text-gray-600">
              您可以註冊一個帳戶，選擇適合的計劃，然後按照指示完成設置即可開始使用。
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. 我的數據安全嗎？</h2>
            <p className="text-gray-600">
              是的，我們使用行業標準的加密技術保護您的數據，詳情請查看我們的 <a href="/privacy" className="text-blue-600 hover:underline">隱私政策</a>。
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. 如何聯繫技術支援？</h2>
            <p className="text-gray-600">
              您可以通過 <a href="/dashboard/tickets" className="text-blue-600 hover:underline">提交技術支援請求</a> 或直接聯繫我們。
            </p>
          </div>
        </div>
      </div>
    );
  }