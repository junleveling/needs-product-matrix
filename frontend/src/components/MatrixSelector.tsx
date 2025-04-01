'use client';

import { useState } from 'react';

interface MatrixSelectorProps {
  onSelect: (matrixType: string) => void;
}

export default function MatrixSelector({ onSelect }: MatrixSelectorProps) {
  const [selectedMatrixType, setSelectedMatrixType] = useState('basic-financial-needs');
  
  // 模擬矩陣類型資料
  const matrixTypes = [
    { id: 'basic-financial-needs', name: '基本財務需求配對矩陣' },
    { id: 'extended-financial-needs', name: '延伸財務需求配對矩陣' },
    { id: 'special-situation-needs', name: '特殊情境需求配對矩陣' },
    { id: 'economic-environment', name: '經濟環境與產品推薦矩陣' },
    { id: 'lifecycle-stage', name: '生命週期階段與產品配對矩陣' },
    { id: 'risk-preference', name: '風險偏好與產品配對矩陣' }
  ];
  
  const handleMatrixTypeSelect = (matrixType: string) => {
    setSelectedMatrixType(matrixType);
    onSelect(matrixType);
  };
  
  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">矩陣類型</h2>
        <div className="flex overflow-x-auto pb-2">
          {matrixTypes.map(matrixType => (
            <button 
              key={matrixType.id}
              className={selectedMatrixType === matrixType.id ? "btn-primary mr-2 whitespace-nowrap" : "btn-secondary mr-2 whitespace-nowrap"}
              onClick={() => handleMatrixTypeSelect(matrixType.id)}
            >
              {matrixType.name}
            </button>
          ))}
        </div>
      </section>
      
      {/* 矩陣內容會根據選擇的類型動態顯示 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {matrixTypes.find(m => m.id === selectedMatrixType)?.name || '配對矩陣'}
        </h2>
        
        {selectedMatrixType === 'basic-financial-needs' && (
          <div className="card">
            <p className="mb-4">
              以下矩陣展示了基本財務需求與產品特色的配對關係，幫助您根據客戶的基本需求選擇最適合的產品：
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#1A365D] text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">基本財務需求類別</th>
                    <th className="py-3 px-4 text-left">需求細項</th>
                    <th className="py-3 px-4 text-left">最適配產品</th>
                    <th className="py-3 px-4 text-left">產品特色</th>
                    <th className="py-3 px-4 text-left">經濟環境考量</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 font-medium" rowSpan={3}>儲蓄與流動性需求</td>
                    <td className="py-3 px-4">短期資金存放</td>
                    <td className="py-3 px-4">活期存款帳戶</td>
                    <td className="py-3 px-4">資金靈活存取、基本利息收益</td>
                    <td className="py-3 px-4">低利率環境下可考慮優惠利率活存</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">緊急備用金</td>
                    <td className="py-3 px-4">數位存款帳戶</td>
                    <td className="py-3 px-4">較高活存利率、數位服務整合</td>
                    <td className="py-3 px-4">經濟不確定性高時應增加備用金比例</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">日常交易便利性</td>
                    <td className="py-3 px-4">行動銀行App</td>
                    <td className="py-3 px-4">隨時隨地銀行服務、便捷支付與轉帳</td>
                    <td className="py-3 px-4">數位轉型加速期提供更多線上功能</td>
                  </tr>
                  {/* 更多行... */}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {selectedMatrixType === 'extended-financial-needs' && (
          <div className="card">
            <p className="mb-4">
              以下矩陣展示了延伸財務需求與產品特色的配對關係，幫助您根據客戶的延伸需求選擇最適合的產品：
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#1A365D] text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">延伸財務需求類別</th>
                    <th className="py-3 px-4 text-left">需求細項</th>
                    <th className="py-3 px-4 text-left">最適配產品</th>
                    <th className="py-3 px-4 text-left">產品特色</th>
                    <th className="py-3 px-4 text-left">客戶價值點</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 font-medium" rowSpan={4}>風險管理需求</td>
                    <td className="py-3 px-4">投資風險分散</td>
                    <td className="py-3 px-4">多元資產配置</td>
                    <td className="py-3 px-4">低相關性資產組合、風險分散效果</td>
                    <td className="py-3 px-4">降低投資組合波動性、提高風險調整後報酬</td>
                  </tr>
                  {/* 更多行... */}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* 其他矩陣類型的內容... */}
        {selectedMatrixType !== 'basic-financial-needs' && selectedMatrixType !== 'extended-financial-needs' && (
          <div className="card">
            <p className="text-center text-gray-500 py-8">
              此矩陣類型的詳細內容將在完整版本中提供
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
