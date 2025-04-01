import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '客戶需求與產品訴求互動網站',
  description: '銀行客戶的多層次需求與產品特色進行精準配對的互動網站',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <header className="bg-[#1A365D] text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">客戶需求 × 產品適配</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-[#E6B035]">首頁</a></li>
                <li><a href="/customer-profile" className="hover:text-[#E6B035]">客戶樣貌</a></li>
                <li><a href="/product-recommendation" className="hover:text-[#E6B035]">產品推薦</a></li>
                <li><a href="/marketing-angle" className="hover:text-[#E6B035]">行銷切角</a></li>
                <li><a href="/matching-matrix" className="hover:text-[#E6B035]">配對矩陣</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 mt-8">
          <div className="container mx-auto text-center text-gray-600">
            <p>© 2025 客戶需求與產品訴求互動網站</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
