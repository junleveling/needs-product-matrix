import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-primary text-white text-center py-16">
        <h1 className="text-4xl font-bold">銀行客戶需求與產品特色配對分析</h1>
        <p className="mt-4 text-lg">
          精準理解客戶需求，提供相應的產品特色，是銀行業成功的關鍵。
        </p>
        <p className="mt-2 text-lg">
          本網站提供系統化的配對框架，幫助銀行行銷企劃更有效地連結產品與客戶需求。
        </p>
        <Link
          to="/tool"
          className="mt-6 inline-block bg-white text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
        >
          立即使用互動工具
        </Link>
      </header>
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold">客戶需求分析</h2>
              <p className="mt-2 text-gray-600">
                深入探討銀行客戶的多層次需求，從基本財務需求到深層心理需求，全面理解客戶真實動機。
              </p>
              <Link to="/needs" className="mt-4 inline-block text-primary font-medium hover:underline">查看詳情</Link>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">產品特色分析</h2>
              <p className="mt-2 text-gray-600">
                系統化分析銀行產品的多層次特色，包括基本功能、延伸價值和差異化優勢。
              </p>
              <Link to="/products" className="mt-4 inline-block text-primary font-medium hover:underline">查看詳情</Link>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">配對框架</h2>
              <p className="mt-2 text-gray-600">
                建立客戶需求與產品特色的系統化配對框架，提供多維度配對模型和實用配對矩陣。
              </p>
              <Link to="/framework" className="mt-4 inline-block text-primary font-medium hover:underline">查看詳情</Link>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">配對實例</h2>
              <p className="mt-2 text-gray-600">
                提供豐富的客戶需求與產品特色配對實例，涵蓋不同客群和特殊情境的案例分析。
              </p>
              <Link to="/matrix" className="mt-4 inline-block text-primary font-medium hover:underline">查看詳情</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center">為什麼需要需求與產品配對？</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold">提升客戶滿意度</h3>
              <p className="mt-2 text-gray-600">
                精準匹配客戶真實需求，提供有針對性的產品和服務，大幅提升客戶滿意度和忠誠度。
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold">優化行銷效率</h3>
              <p className="mt-2 text-gray-600">
                減少無效行銷，集中資源於最有潛力的客戶群體，提高行銷投資回報率。
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold">建立競爭優勢</h3>
              <p className="mt-2 text-gray-600">
                在同質化嚴重的銀行業中，通過精準配對建立差異化優勢，提升市場競爭力。
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold">立即使用互動工具</h2>
        <p className="mt-4 text-gray-600">
          我們提供互動式產品配對工具和需求評估問卷，幫助您更精準地識別客戶需求並推薦合適的產品。
        </p>
        <Link
          to="/tool"
          className="mt-6 inline-block bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-primaryDark"
        >
          開始使用
        </Link>
      </section>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2025 銀行客戶需求與產品特色配對分析 | 版權所有</p>
      </footer>
    </div>
  );
};

export default Home;
