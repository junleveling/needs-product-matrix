'use client';

import { useState, useEffect } from 'react';
import Chart from '@/components/Chart';
import ProductSelector from '@/components/ProductSelector';
import { getProductById, recommendProducts, useApiWithErrorHandling } from '@/utils/api';

export default function ProductRecommendation() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState<any>(null);
  
  const { loading: loadingProduct, error: productError, fetchData: fetchProduct } = useApiWithErrorHandling(getProductById);
  const { loading: loadingRecommendations, error: recommendationsError, fetchData: fetchRecommendations } = useApiWithErrorHandling(recommendProducts);
  
  const handleProductSelect = async (productId: string) => {
    setSelectedProduct(productId);
    
    try {
      // 呼叫API獲取產品詳情
      const result = await fetchProduct(productId);
      
      if (result) {
        // 轉換API返回的數據為圖表所需格式
        const compatibilityData = result.suitableNeeds.map((need: any) => ({
          name: need.needName,
          value: need.compatibilityLevel,
          level: need.compatibilityLevel >= 80 ? 'high' : 
                 need.compatibilityLevel >= 60 ? 'medium' : 'low'
        }));
        
        // 合併API返回的結果與圖表數據
        setProductDetails({
          ...result,
          compatibilityData
        });
      }
    } catch (err) {
      console.error('獲取產品詳情時發生錯誤:', err);
    }
  };
  
  // 模擬客戶需求數據，實際應用中可從客戶樣貌頁面獲取
  const customerNeeds = {
    basicNeeds: ['短期資金存放', '日常交易便利性', '資產增值'],
    extendedNeeds: ['投資風險分散', '通膨防禦'],
    specialNeeds: ['投資安全感'],
    riskPreference: 'moderate'
  };
  
  // 初始載入推薦產品
  useEffect(() => {
    const loadRecommendedProducts = async () => {
      try {
        await fetchRecommendations(customerNeeds);
      } catch (err) {
        console.error('獲取推薦產品時發生錯誤:', err);
      }
    };
    
    loadRecommendedProducts();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">產品推薦</h1>
      
      <p className="mb-6">
        本頁面根據客戶樣貌和需求推薦適合的銀行產品，顯示產品詳細資訊和適配理由，
        幫助您為客戶選擇最適合的產品。
      </p>
      
      {/* 載入中狀態 - 推薦產品 */}
      {loadingRecommendations && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1A365D]"></div>
          <p className="mt-2">正在獲取推薦產品...</p>
        </div>
      )}
      
      {/* 錯誤訊息 - 推薦產品 */}
      {recommendationsError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>獲取推薦產品時發生錯誤: {recommendationsError}</p>
        </div>
      )}
      
      {/* 產品選擇器 */}
      <ProductSelector onSelect={handleProductSelect} />
      
      {/* 載入中狀態 - 產品詳情 */}
      {loadingProduct && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1A365D]"></div>
          <p className="mt-2">正在獲取產品詳情...</p>
        </div>
      )}
      
      {/* 錯誤訊息 - 產品詳情 */}
      {productError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>獲取產品詳情時發生錯誤: {productError}</p>
        </div>
      )}
      
      {/* 產品詳情展示區 */}
      {productDetails && !loadingProduct && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">產品詳情</h2>
          <div className="card">
            <h3 className="text-xl font-medium mb-4">{productDetails.name}</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">適配度分析</h4>
              <Chart 
                chartType="bar" 
                data={productDetails.compatibilityData}
                options={{
                  title: '需求適配度分析',
                  seriesName: '適配度',
                  xAxisData: productDetails.compatibilityData.map((item: any) => item.name),
                  yAxisData: productDetails.compatibilityData.map((item: any) => item.value),
                  color: productDetails.compatibilityData.map((item: any) => 
                    item.level === 'high' ? '#2ECC71' : 
                    item.level === 'medium' ? '#F1C40F' : '#E74C3C'
                  )
                }}
              />
            </div>
            
            <h4 className="text-lg font-medium mb-2">產品基本特色</h4>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              {productDetails.basicFeatures.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            
            <h4 className="text-lg font-medium mb-2">產品延伸特色</h4>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              {productDetails.extendedFeatures.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            
            <h4 className="text-lg font-medium mb-2">適配客戶需求</h4>
            <div className="space-y-2 mb-4">
              {productDetails.compatibilityData.map((item: any, index: number) => (
                <div key={index} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${
                    item.level === 'high' ? 'bg-[#2ECC71]' : 
                    item.level === 'medium' ? 'bg-[#F1C40F]' : 'bg-[#E74C3C]'
                  }`}></div>
                  <span>{item.name} ({item.level === 'high' ? '高度適配' : 
                                     item.level === 'medium' ? '中度適配' : '低度適配'})</span>
                </div>
              ))}
            </div>
            
            <h4 className="text-lg font-medium mb-2">經濟環境考量</h4>
            <p>{productDetails.economicConsiderations}</p>
          </div>
        </section>
      )}
    </div>
  );
}
