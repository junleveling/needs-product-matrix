import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">客戶需求與產品訴求適配</h1>
      
      <p className="mb-6">
        本網站提供了一個系統化的框架，用於將銀行客戶的多層次需求與產品特色進行精準配對。
        這個框架考慮了客戶需求的不同層次、生命週期階段、風險偏好和經濟環境等因素，
        幫助銀行行銷人員更有效地推薦適合的產品。
      </p>
      
      {/* 快速導航卡片區 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Link href="/customer-profile" className="card hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-medium mb-2">客戶樣貌</h3>
          <p className="text-gray-600">分析客戶的財務需求、風險偏好和生命週期階段等特徵</p>
        </Link>
        <Link href="/product-recommendation" className="card hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-medium mb-2">產品推薦</h3>
          <p className="text-gray-600">根據客戶樣貌和需求推薦適合的銀行產品</p>
        </Link>
        <Link href="/marketing-angle" className="card hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-medium mb-2">行銷切角</h3>
          <p className="text-gray-600">提供針對特定客戶和產品的行銷文案建議</p>
        </Link>
        <Link href="/matching-matrix" className="card hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-medium mb-2">配對矩陣</h3>
          <p className="text-gray-600">展示客戶需求與產品特色的配對關係</p>
        </Link>
      </div>
      
      {/* 產品類別概覽 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">產品類別概覽</h2>
        <div className="card">
          <h3 className="text-xl font-medium mb-3">信用卡產品</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>一般消費信用卡</li>
            <li>現金回饋信用卡</li>
            <li>航空哩程信用卡</li>
            <li>數位支付信用卡</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-3 mt-4">存款產品</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>活期存款</li>
            <li>定期存款</li>
            <li>數位存款帳戶</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-3 mt-4">貸款產品</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>房屋貸款</li>
            <li>信用貸款</li>
            <li>創業貸款</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-3 mt-4">投資產品</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>共同基金</li>
            <li>ETF</li>
            <li>債券</li>
            <li>結構型商品</li>
          </ul>
        </div>
      </section>
      
      {/* 客戶需求概覽 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">客戶需求概覽</h2>
        <div className="card">
          <h3 className="text-xl font-medium mb-3">基本財務需求</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>儲蓄與流動性需求</li>
            <li>融資需求</li>
            <li>投資需求</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-3 mt-4">延伸財務需求</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>風險管理需求</li>
            <li>生活品質提升需求</li>
            <li>特定人生階段需求</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-3 mt-4">特殊情境需求</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>跨國需求</li>
            <li>稅務規劃需求</li>
            <li>心理層面需求</li>
          </ul>
        </div>
      </section>
      
      {/* 配對矩陣預覽 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">配對矩陣預覽</h2>
        <div className="card">
          <p className="mb-4">
            以下矩陣展示了基本財務需求與產品特色的配對關係，幫助您根據客戶的基本需求選擇最適合的產品：
          </p>
          <div className="bg-[#F5F7FA] p-4 rounded-lg text-center">
            <p className="text-gray-500">矩陣視覺化展示區域</p>
            <p className="text-gray-500 mt-2">（完整功能將在互動版本中提供）</p>
          </div>
        </div>
      </section>
    </div>
  );
}
