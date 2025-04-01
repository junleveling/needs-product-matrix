'use client';

import { useState, useEffect } from 'react';
import Chart from '@/components/Chart';
import CustomerProfileForm from '@/components/CustomerProfileForm';
import { analyzeCustomerProfile, createCustomerProfile, useApiWithErrorHandling } from '@/utils/api';

export default function CustomerProfile() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { loading, error, fetchData: fetchAnalysis } = useApiWithErrorHandling(analyzeCustomerProfile);
  
  const handleFormSubmit = async (data: any) => {
    console.log('提交的客戶資料:', data);
    
    try {
      // 呼叫API分析客戶樣貌
      const result = await fetchAnalysis(data);
      
      if (result) {
        // 轉換API返回的數據為圖表所需格式
        const needsDistribution = [
          { value: data.basicNeeds?.length || 0, name: '基本財務需求' },
          { value: data.extendedNeeds?.length || 0, name: '延伸財務需求' },
          { value: data.specialNeeds?.length || 0, name: '特殊情境需求' }
        ];
        
        const riskRadar = {
          indicators: [
            { name: '風險承受度', max: 100 },
            { name: '投資期限', max: 100 },
            { name: '流動性需求', max: 100 },
            { name: '收益期望', max: 100 },
            { name: '投資經驗', max: 100 }
          ],
          values: [
            data.riskPreference === 'conservative' ? 30 : 
            data.riskPreference === 'moderate' ? 60 : 90,
            data.riskPreference === 'conservative' ? 70 : 
            data.riskPreference === 'moderate' ? 50 : 40,
            data.riskPreference === 'conservative' ? 80 : 
            data.riskPreference === 'moderate' ? 60 : 30,
            data.riskPreference === 'conservative' ? 40 : 
            data.riskPreference === 'moderate' ? 60 : 90,
            data.financialLiteracy === 'beginner' ? 30 : 
            data.financialLiteracy === 'intermediate' ? 60 : 90
          ],
          name: '風險偏好分析'
        };
        
        // 合併API返回的結果與圖表數據
        setAnalysisResult({
          ...result,
          needsDistribution,
          riskRadar
        });
        
        // 可選：保存客戶樣貌到資料庫
        try {
          await createCustomerProfile(data);
        } catch (err) {
          console.error('保存客戶樣貌失敗:', err);
          // 不影響主流程，所以不處理錯誤
        }
      }
    } catch (err) {
      console.error('分析客戶樣貌時發生錯誤:', err);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">客戶樣貌</h1>
      
      <p className="mb-6">
        本頁面提供客戶樣貌分析功能，幫助您分析客戶的財務需求、風險偏好、生命週期階段等特徵，
        並根據輸入的客戶資料生成客戶樣貌分析結果。
      </p>
      
      {/* 客戶基本資料輸入區 */}
      <CustomerProfileForm onSubmit={handleFormSubmit} />
      
      {/* 載入中狀態 */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1A365D]"></div>
          <p className="mt-2">正在分析客戶樣貌...</p>
        </div>
      )}
      
      {/* 錯誤訊息 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>分析客戶樣貌時發生錯誤: {error}</p>
        </div>
      )}
      
      {/* 客戶樣貌分析結果 */}
      {analysisResult && !loading && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">客戶樣貌分析結果</h2>
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">需求分布圖表</h3>
                <Chart 
                  chartType="pie" 
                  data={analysisResult.needsDistribution}
                  options={{
                    title: '客戶需求分布',
                    seriesName: '需求數量'
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">風險偏好雷達圖</h3>
                <Chart 
                  chartType="radar" 
                  data={analysisResult.riskRadar}
                  options={{
                    title: '風險偏好分析'
                  }}
                />
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-2">客戶特徵摘要</h3>
            <div className="bg-[#F5F7FA] p-4 rounded-lg mb-6">
              <p><strong>客戶類型：</strong> {analysisResult.customerType}</p>
              <p><strong>生命週期階段：</strong> {analysisResult.lifeCycleStage}</p>
              <p><strong>風險偏好：</strong> {analysisResult.riskProfile}</p>
              <p><strong>主要需求：</strong> {analysisResult.primaryNeeds?.join('、') || '無'}</p>
            </div>
            
            <h3 className="text-lg font-medium mb-2">推薦產品類別預覽</h3>
            <div className="bg-[#F5F7FA] p-4 rounded-lg">
              <ul className="list-disc pl-5 space-y-1">
                {analysisResult.recommendedProductCategories?.map((category: string, index: number) => (
                  <li key={index}>
                    {category === 'credit-card' ? '信用卡產品' : 
                     category === 'savings' ? '存款產品' : 
                     category === 'loan' ? '貸款產品' : 
                     category === 'investment' ? '投資產品' : 
                     category === 'insurance' ? '保險產品' : 
                     category === 'wealth-management' ? '財富管理產品' : category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
