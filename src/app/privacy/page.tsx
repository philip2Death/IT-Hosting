export default function PrivacyPage() {
    return (
      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">隱私政策</h1>
        <p className="text-gray-600 mb-4">
          IT Hosting Pro 致力於保護您的隱私。以下隱私政策說明了我們如何收集、使用和保護您的信息。
        </p>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">1. 信息收集</h2>
          <p className="text-gray-600">
            我們可能會收集您提供的個人信息，例如姓名、電子郵件地址，以及您在使用我們的服務時生成的數據。
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">2. 信息使用</h2>
          <p className="text-gray-600">
            我們使用您的信息來提供和改進服務，例如處理您的技術支援請求或發送重要通知。
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">3. 信息共享</h2>
          <p className="text-gray-600">
            我們不會與第三方共享您的個人信息，除非為了遵守法律要求或保護我們的權利。
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">4. 您的權利</h2>
          <p className="text-gray-600">
            您有權訪問、更正或刪除您的個人信息。如需行使這些權利，請聯繫我們。
          </p>
        </section>
        <p className="text-gray-600">
          如果您有任何問題，請通過 <a href="mailto:support@ithostingpro.com" className="text-blue-600 hover:underline">support@ithostingpro.com</a> 聯繫我們。
        </p>
      </div>
    );
  }
  