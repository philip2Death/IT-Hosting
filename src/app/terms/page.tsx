export default function TermsPage() {
    return (
      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">服務條款</h1>
        <p className="text-gray-600 mb-4">
          歡迎使用 IT Hosting Pro！請仔細閱讀以下服務條款，這些條款規範了您使用我們的服務的行為。
        </p>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">1. 接受條款</h2>
          <p className="text-gray-600">
            使用我們的服務即表示您同意這些服務條款。如果您不同意，請勿使用我們的服務。
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">2. 服務使用</h2>
          <p className="text-gray-600">
            您同意僅將我們的服務用於合法目的，不得用於任何非法或未經授權的活動。
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">3. 責任限制</h2>
          <p className="text-gray-600">
            IT Hosting Pro 對因使用我們的服務而導致的任何間接損害不承擔責任。
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">4. 條款變更</h2>
          <p className="text-gray-600">
            我們可能會不時更新這些條款，變更後的條款將在發布後立即生效。
          </p>
        </section>
        <p className="text-gray-600">
          如果您有任何問題，請通過 <a href="mailto:support@ithostingpro.com" className="text-blue-600 hover:underline">support@ithostingpro.com</a> 聯繫我們。
        </p>
      </div>
    );
  }
  