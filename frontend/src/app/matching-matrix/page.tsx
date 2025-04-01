'use client';

import { useState, useEffect } from 'react';
import Chart from '@/components/Chart';
import MatrixSelector from '@/components/MatrixSelector';
import { getMatrixByType, generateMatrixMatch, useApiWithErrorHandling } from '@/utils/api';

export default function MatchingMatrix() {
  const [selectedMatrixType, setSelectedMatrixType] = useState<string | null>(null);
  const [matrixData, setMatrixData] = useState<any>(null);
  
  const { loading: loadingMatrix, error: matrixError, fetchData: fetchMatrix } = useApiWithErrorHandling(getMatrixByType);
  const { loading: loadingMatch, error: matchError, fetchData: fetchMatch } = useApiWithErrorHandling(generateMatrixMatch);
  
  const handleMatrixSelect = async (matrixType: string) => {
    setSelectedMatrixType(matrixType);
    
    try {
      // 呼叫API獲取矩陣資料
      const result = await fetchMatrix(matrixType);
      
      if (result) {
        // 處理矩陣資料，準備圖表數據
        const categories = result.rows.map((row: any) => row.category);
        const needsCount = result.rows.map((row: any) => row.items.length);
        
        // 計算每個類別的產品匹配數量和平均適配度
        const productMatchCount: number[] = [];
        const compatibilityScores: number[] = [];
        
        result.rows.forEach((row: any) => {
          let totalProducts = 0;
          let totalCompatibility = 0;
          
          row.items.forEach((item: any) => {
            if (item.productMatch) {
              totalProducts++;
              totalCompatibility += item.compatibilityScore || 0;
            }
          });
          
          productMatchCount.push(totalProducts);
          compatibilityScores.push(totalProducts > 0 ? Math.round(totalCompatibility / totalProducts) : 0);
        });
        
        // 合併API返回的結果與圖表數據
        setMatrixData({
          ...result,
          categories,
          needsCount,
          productMatchCount,
          compatibilityScores
        });
        
        // 可選：根據客戶需求生成配對結果
        const customerNeeds = ['短期資金存放', '日常交易便利性', '資產增值']; // 模擬數據，實際應從客戶樣貌獲取
        generateMatch(matrixType, customerNeeds);
      }
    } catch (err) {
      console.error('獲取矩陣資料時發生錯誤:', err);
    }
  };
  
  const generateMatch = async (matrixType: string, customerNeeds: string[]) => {
    try {
      // 呼叫API生成配對結果
      const result = await fetchMatch({
        matrixType,
        customerNeeds,
        riskPreference: 'moderate', // 模擬數據，實際應從客戶樣貌獲取
        lifeCycleStage: '事業高峰期' // 模擬數據，實際應從客戶樣貌獲取
      });
      
      if (result) {
        // 更新矩陣數據，加入配對結果
        setMatrixData(prevData => ({
          ...prevData,
          ...result
        }));
      }
    } catch (err) {
      console.error('生成配對結果時發生錯誤:', err);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">配對矩陣</h1>
      
      <p className="mb-6">
        本頁面展示客戶需求與產品特色的配對矩陣，提供多維度的配對視角，
        幫助您了解不同需求與產品之間的適配關係。
      </p>
      
      {/* 載入中狀態 - 矩陣資料 */}
      {loadingMatrix && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1A365D]"></div>
          <p className="mt-2">正在獲取矩陣資料...</p>
        </div>
      )}
      
      {/* 錯誤訊息 - 矩陣資料 */}
      {matrixError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>獲取矩陣資料時發生錯誤: {matrixError}</p>
        </div>
      )}
      
      {/* 矩陣選擇器 */}
      <MatrixSelector onSelect={handleMatrixSelect} />
      
      {/* 載入中狀態 - 配對結果 */}
      {loadingMatch && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1A365D]"></div>
          <p className="mt-2">正在生成配對結果...</p>
        </div>
      )}
      
      {/* 錯誤訊息 - 配對結果 */}
      {matchError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>生成配對結果時發生錯誤: {matchError}</p>
        </div>
      )}
      
      {/* 矩陣視覺化展示 */}
      {matrixData && !loadingMatrix && !loadingMatch && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{matrixData.title}</h2>
          <div className="card">
            <p className="mb-4">{matrixData.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">需求與產品配對數量</h3>
                <Chart 
                  chartType="bar" 
                  data={{}}
                  options={{
                    title: '需求與產品配對數量',
                    xAxisData: matrixData.categories,
                    series: [
                      {
                        name: '需求數量',
                        type: 'bar',
                        data: matrixData.needsCount
                      },
                      {
                        name: '匹配產品數量',
                        type: 'bar',
                        data: matrixData.productMatchCount
                      }
                    ]
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">平均適配度分數</h3>
                <Chart 
                  chartType="bar" 
                  data={{}}
                  options={{
                    title: '平均適配度分數',
                    xAxisData: matrixData.categories,
                    yAxisData: matrixData.compatibilityScores,
                    seriesName: '適配度分數',
                    color: '#1A365D'
                  }}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#1A365D] text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">需求類別</th>
                    <th className="py-3 px-4 text-left">需求數量</th>
                    <th className="py-3 px-4 text-left">匹配產品數量</th>
                    <th className="py-3 px-4 text-left">平均適配度</th>
                    <th className="py-3 px-4 text-left">最佳適配產品類別</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {matrixData.categories.map((category: string, index: number) => (
                    <tr key={index}>
                      <td className="py-3 px-4 font-medium">{category}</td>
                      <td className="py-3 px-4">{matrixData.needsCount[index]}</td>
                      <td className="py-3 px-4">{matrixData.productMatchCount[index]}</td>
                      <td className="py-3 px-4">{matrixData.compatibilityScores[index]}%</td>
                      <td className="py-3 px-4">
                        {index === 0 ? '存款產品' : 
                         index === 1 ? '貸款產品' : 
                         index === 2 ? '投資產品' : 
                         index === 3 ? '信用卡產品' : '財富管理產品'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      
      {/* 矩陣說明區域 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">矩陣說明</h2>
        <div className="card">
          <h3 className="text-xl font-medium mb-3">多維度配對模型</h3>
          <p className="mb-4">
            我們的配對模型從多個維度考慮客戶需求與產品特色的匹配關係，確保推薦的產品能夠全面滿足客戶的各層次需求。
          </p>
          
          <div className="bg-[#F5F7FA] p-4 rounded-lg mb-4">
            <h4 className="text-lg font-medium mb-2">需求層次維度</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>基本財務需求</strong> → 產品基本功能特色</li>
              <li><strong>延伸財務需求</strong> → 產品延伸價值特色</li>
              <li><strong>特殊情境需求</strong> → 產品差異化特色</li>
            </ul>
          </div>
          
          <div className="bg-[#F5F7FA] p-4 rounded-lg mb-4">
            <h4 className="text-lg font-medium mb-2">客戶生命週期維度</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>家庭成立期</strong> → 靈活性、成長性產品特色</li>
              <li><strong>子女教育期</strong> → 穩健增值、教育規劃產品特色</li>
              <li><strong>事業高峰期</strong> → 資產配置、稅務優化產品特色</li>
              <li><strong>退休準備期</strong> → 收益穩定、風險控制產品特色</li>
              <li><strong>退休生活期</strong> → 被動收入、資產傳承產品特色</li>
            </ul>
          </div>
          
          <div className="bg-[#F5F7FA] p-4 rounded-lg mb-4">
            <h4 className="text-lg font-medium mb-2">風險偏好維度</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>保守型客戶</strong> → 安全性、保障性產品特色</li>
              <li><strong>穩健型客戶</strong> → 平衡性、多元化產品特色</li>
              <li><strong>積極型客戶</strong> → 成長性、機會型產品特色</li>
            </ul>
          </div>
          
          <div className="bg-[#F5F7FA] p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2">經濟環境維度</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>經濟擴張期</strong> → 成長導向產品特色</li>
              <li><strong>高通膨環境</strong> → 通膨防禦產品特色</li>
              <li><strong>市場波動期</strong> → 風險控制產品特色</li>
              <li><strong>低利率環境</strong> → 收益增強產品特色</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
