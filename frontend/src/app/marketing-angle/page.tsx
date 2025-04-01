'use client';

import { useState, useEffect } from 'react';
import Chart from '@/components/Chart';
import MarketingAngleSelector from '@/components/MarketingAngleSelector';
import { getMarketingAnglesByType, generateMarketingCopy, useApiWithErrorHandling } from '@/utils/api';

export default function MarketingAngle() {
  const [selectedAngleType, setSelectedAngleType] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [angleDetails, setAngleDetails] = useState<any>(null);
  const [marketingCopies, setMarketingCopies] = useState<any[]>([]);
  
  const { loading: loadingAngle, error: angleError, fetchData: fetchAngle } = useApiWithErrorHandling(getMarketingAnglesByType);
  const { loading: loadingCopy, error: copyError, fetchData: fetchCopy } = useApiWithErrorHandling(generateMarketingCopy);
  
  const handleAngleSelect = async (angleType: string) => {
    setSelectedAngleType(angleType);
    
    try {
      // 呼叫API獲取行銷切角詳情
      const result = await fetchAngle(angleType);
      
      if (result && result.length > 0) {
        const angle = result[0]; // 假設API返回一個數組，取第一個元素
        
        // 轉換API返回的數據為圖表所需格式
        const effectivenessData = [
          { name: '客戶理解度', value: angle.effectivenessMetrics?.customerUnderstanding || 3 },
          { name: '情感共鳴度', value: angle.effectivenessMetrics?.emotionalResonance || 3 },
          { name: '差異化程度', value: angle.effectivenessMetrics?.differentiation || 3 },
          { name: '行動促發力', value: angle.effectivenessMetrics?.callToAction || 3 }
        ];
        
        // 合併API返回的結果與圖表數據
        setAngleDetails({
          ...angle,
          effectivenessData
        });
        
        // 如果已選擇產品，則生成行銷文案
        if (selectedProduct) {
          generateCopy(angleType, selectedProduct);
        }
      }
    } catch (err) {
      console.error('獲取行銷切角詳情時發生錯誤:', err);
    }
  };
  
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
    
    // 如果已選擇切角類型，則生成行銷文案
    if (selectedAngleType && productId) {
      generateCopy(selectedAngleType, productId);
    }
  };
  
  const generateCopy = async (angleType: string, productId: string) => {
    try {
      // 呼叫API生成行銷文案
      const result = await fetchCopy({
        angleType,
        productId,
        customerType: 'all' // 可以根據實際需求設置特定客戶類型
      });
      
      if (result) {
        setMarketingCopies(result);
      }
    } catch (err) {
      console.error('生成行銷文案時發生錯誤:', err);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">行銷切角</h1>
      
      <p className="mb-6">
        本頁面根據客戶樣貌和選定產品提供行銷切角和文案建議，幫助您為不同客戶類型選擇最適合的行銷訴求方式。
      </p>
      
      {/* 產品選擇區 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">產品選擇</h2>
        <div className="card">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">選擇產品</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded bg-white"
              value={selectedProduct}
              onChange={handleProductChange}
            >
              <option value="">請選擇產品</option>
              <option value="cash-back-card">超級現金回饋卡</option>
              <option value="digital-savings">數位活存帳戶</option>
              <option value="balanced-fund">平衡型基金</option>
              <option value="mortgage">房屋貸款方案</option>
              <option value="retirement-plan">退休投資組合</option>
            </select>
          </div>
        </div>
      </section>
      
      {/* 載入中狀態 - 行銷切角 */}
      {loadingAngle && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1A365D]"></div>
          <p className="mt-2">正在獲取行銷切角詳情...</p>
        </div>
      )}
      
      {/* 錯誤訊息 - 行銷切角 */}
      {angleError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>獲取行銷切角詳情時發生錯誤: {angleError}</p>
        </div>
      )}
      
      {/* 行銷切角選擇器 */}
      <MarketingAngleSelector onSelect={handleAngleSelect} productId={selectedProduct} />
      
      {/* 切角效果評估 */}
      {angleDetails && !loadingAngle && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">切角效果評估</h2>
          <div className="card">
            <div className="mb-6">
              <Chart 
                chartType="radar" 
                data={{
                  indicators: [
                    { name: '客戶理解度', max: 5 },
                    { name: '情感共鳴度', max: 5 },
                    { name: '差異化程度', max: 5 },
                    { name: '行動促發力', max: 5 }
                  ],
                  values: angleDetails.effectivenessData.map((item: any) => item.value),
                  name: '切角效果評估'
                }}
                options={{
                  title: '切角效果評估雷達圖'
                }}
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">評估指標</th>
                    <th className="py-2 px-4 text-left">評分</th>
                    <th className="py-2 px-4 text-left">說明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2 px-4">客戶理解度</td>
                    <td className="py-2 px-4">{angleDetails.effectivenessData[0].value}/5</td>
                    <td className="py-2 px-4">
                      {angleDetails.effectivenessData[0].value >= 4 ? '切角內容易於理解，產品功能清晰' : 
                       angleDetails.effectivenessData[0].value >= 3 ? '切角內容較易理解，產品功能較清晰' : 
                       '切角內容理解難度較高，產品功能不夠清晰'}
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">情感共鳴度</td>
                    <td className="py-2 px-4">{angleDetails.effectivenessData[1].value}/5</td>
                    <td className="py-2 px-4">
                      {angleDetails.effectivenessData[1].value >= 4 ? '切角內容有強烈情感共鳴，連結深刻' : 
                       angleDetails.effectivenessData[1].value >= 3 ? '切角內容有一定情感共鳴，連結可加強' : 
                       '切角內容情感共鳴不足，連結較弱'}
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">差異化程度</td>
                    <td className="py-2 px-4">{angleDetails.effectivenessData[2].value}/5</td>
                    <td className="py-2 px-4">
                      {angleDetails.effectivenessData[2].value >= 4 ? '切角內容具有明顯差異化，突出產品特色' : 
                       angleDetails.effectivenessData[2].value >= 3 ? '切角內容差異化程度中等，可增加獨特性' : 
                       '切角內容差異化不足，較為通用'}
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">行動促發力</td>
                    <td className="py-2 px-4">{angleDetails.effectivenessData[3].value}/5</td>
                    <td className="py-2 px-4">
                      {angleDetails.effectivenessData[3].value >= 4 ? '切角內容有強烈行動促發力，明確展示價值' : 
                       angleDetails.effectivenessData[3].value >= 3 ? '切角內容有一定行動促發力，價值展示可加強' : 
                       '切角內容行動促發力不足，價值展示不明確'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      
      {/* 載入中狀態 - 行銷文案 */}
      {loadingCopy && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1A365D]"></div>
          <p className="mt-2">正在生成行銷文案...</p>
        </div>
      )}
      
      {/* 錯誤訊息 - 行銷文案 */}
      {copyError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>生成行銷文案時發生錯誤: {copyError}</p>
        </div>
      )}
      
      {/* 文案建議區 */}
      {marketingCopies.length > 0 && !loadingCopy && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">文案建議</h2>
          
          <div className="space-y-4">
            {marketingCopies.map((copy, index) => (
              <div key={index} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium mb-2">文案建議 {index + 1}</h3>
                    <p className="text-gray-700">{copy.content}</p>
                  </div>
                  <button 
                    className="btn-secondary"
                    onClick={() => navigator.clipboard.writeText(copy.content)}
                  >
                    複製
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
