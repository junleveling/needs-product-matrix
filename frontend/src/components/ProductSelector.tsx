'use client';

import { useState } from 'react';

interface ProductSelectorProps {
  onSelect: (productId: string) => void;
}

export default function ProductSelector({ onSelect }: ProductSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('');
  
  // 模擬產品資料
  const products = [
    { id: 'cash-back-card', name: '超級現金回饋卡', category: 'credit-card', compatibility: 95 },
    { id: 'digital-savings', name: '數位活存帳戶', category: 'savings', compatibility: 88 },
    { id: 'balanced-fund', name: '平衡型基金', category: 'investment', compatibility: 82 },
    { id: 'mortgage', name: '房屋貸款方案', category: 'loan', compatibility: 75 },
    { id: 'retirement-plan', name: '退休投資組合', category: 'investment', compatibility: 70 }
  ];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    onSelect(productId);
  };
  
  return (
    <div>
      <section className="mb-8">
        <div className="flex overflow-x-auto pb-2 mb-4">
          <button 
            className={selectedCategory === 'all' ? "btn-primary mr-2 whitespace-nowrap" : "btn-secondary mr-2 whitespace-nowrap"}
            onClick={() => handleCategoryChange('all')}
          >
            全部
          </button>
          <button 
            className={selectedCategory === 'credit-card' ? "btn-primary mr-2 whitespace-nowrap" : "btn-secondary mr-2 whitespace-nowrap"}
            onClick={() => handleCategoryChange('credit-card')}
          >
            信用卡
          </button>
          <button 
            className={selectedCategory === 'savings' ? "btn-primary mr-2 whitespace-nowrap" : "btn-secondary mr-2 whitespace-nowrap"}
            onClick={() => handleCategoryChange('savings')}
          >
            存款
          </button>
          <button 
            className={selectedCategory === 'loan' ? "btn-primary mr-2 whitespace-nowrap" : "btn-secondary mr-2 whitespace-nowrap"}
            onClick={() => handleCategoryChange('loan')}
          >
            貸款
          </button>
          <button 
            className={selectedCategory === 'investment' ? "btn-primary mr-2 whitespace-nowrap" : "btn-secondary mr-2 whitespace-nowrap"}
            onClick={() => handleCategoryChange('investment')}
          >
            投資
          </button>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">推薦產品列表</h2>
        
        <div className="space-y-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <div className="bg-[#1A365D] text-white px-2 py-1 rounded text-sm mr-2">適配度: {product.compatibility}%</div>
                    <div className="text-gray-600">類別: {product.category === 'credit-card' ? '信用卡產品' : 
                                                        product.category === 'savings' ? '存款產品' : 
                                                        product.category === 'loan' ? '貸款產品' : 
                                                        product.category === 'investment' ? '投資產品' : '其他產品'}</div>
                  </div>
                </div>
                <button 
                  className={selectedProduct === product.id ? "btn-primary" : "btn-secondary"}
                  onClick={() => handleProductSelect(product.id)}
                >
                  {selectedProduct === product.id ? '已選擇' : '詳情'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
