'use client';

import { useState } from 'react';

interface MarketingAngleSelectorProps {
  productId?: string;
  onSelect: (angleType: string) => void;
}

export default function MarketingAngleSelector({ productId, onSelect }: MarketingAngleSelectorProps) {
  const [selectedAngleType, setSelectedAngleType] = useState('life-scenario');
  
  // 模擬行銷切角類型資料
  const angleTypes = [
    { id: 'life-scenario', name: '生活情境' },
    { id: 'functional-value', name: '功能價值' },
    { id: 'emotional-appeal', name: '情感訴求' },
    { id: 'social-recognition', name: '社會認同' },
    { id: 'professional-analysis', name: '專業分析' },
    { id: 'educational', name: '教育啟發' },
    { id: 'problem-solving', name: '問題解決' },
    { id: 'future-vision', name: '未來願景' },
    { id: 'data-driven', name: '數據驅動' },
    { id: 'value-connection', name: '價值觀連結' }
  ];
  
  // 模擬行銷切角詳情資料
  const angleDetails = {
    'life-scenario': {
      title: '生活情境切角',
      description: '將產品融入客戶日常生活場景，展示產品如何解決實際問題。',
      suitableProducts: ['信用卡產品', '數位銀行服務', '消費貸款', '日常理財產品'],
      suitableCustomers: ['注重生活品質的客戶', '家庭型客戶', '年輕族群'],
      keyElements: ['描述具體的生活場景', '突出產品在場景中的實用性', '使用日常語言和具體例子']
    },
    'functional-value': {
      title: '功能價值切角',
      description: '聚焦產品的核心功能和實際價值，強調產品的實用性和效益。',
      suitableProducts: ['定期存款', '結構型商品', '企業金融服務', '外匯交易產品'],
      suitableCustomers: ['理性決策型客戶', '專業人士', '企業客戶', '重視效益的高資產客戶'],
      keyElements: ['強調具體數據和效益', '使用專業術語', '提供比較和對比']
    },
    // 其他切角類型詳情...
  };
  
  const handleAngleTypeSelect = (angleType: string) => {
    setSelectedAngleType(angleType);
    onSelect(angleType);
  };
  
  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">切角類型</h2>
        <div className="flex overflow-x-auto pb-2">
          {angleTypes.map(angleType => (
            <button 
              key={angleType.id}
              className={selectedAngleType === angleType.id ? "btn-primary mr-2 whitespace-nowrap" : "btn-secondary mr-2 whitespace-nowrap"}
              onClick={() => handleAngleTypeSelect(angleType.id)}
            >
              {angleType.name}
            </button>
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">切角詳情</h2>
        <div className="card">
          {selectedAngleType && angleDetails[selectedAngleType as keyof typeof angleDetails] && (
            <>
              <h3 className="text-xl font-medium mb-3">{angleDetails[selectedAngleType as keyof typeof angleDetails].title}</h3>
              <p className="mb-4">
                <strong>核心思路：</strong>{angleDetails[selectedAngleType as keyof typeof angleDetails].description}
              </p>
              
              <h4 className="text-lg font-medium mb-2">適用產品</h4>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {angleDetails[selectedAngleType as keyof typeof angleDetails].suitableProducts.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
              
              <h4 className="text-lg font-medium mb-2">適用客戶</h4>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {angleDetails[selectedAngleType as keyof typeof angleDetails].suitableCustomers.map((customer, index) => (
                  <li key={index}>{customer}</li>
                ))}
              </ul>
              
              <h4 className="text-lg font-medium mb-2">關鍵元素</h4>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {angleDetails[selectedAngleType as keyof typeof angleDetails].keyElements.map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
