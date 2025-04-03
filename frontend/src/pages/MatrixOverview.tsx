
import { useEffect, useState } from 'react';

export default function MatrixOverview() {
  const [matrix, setMatrix] = useState<any>({});
  const [dimension, setDimension] = useState('matrix_risk_time');

  useEffect(() => {
    fetch(`/json/${dimension}.json`)
      .then(res => res.json())
      .then(setMatrix);
  }, [dimension]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">配對矩陣總覽</h1>
      <label className="block mb-2 text-green-800 font-medium">選擇矩陣維度：</label>
      <select value={dimension} onChange={(e) => setDimension(e.target.value)} className="border p-2 mb-4 rounded">
        <option value="matrix_risk_time">風險偏好與時間</option>
        <option value="matrix_life_stage">人生階段與需求層次</option>
        <option value="matrix_product_type">產品類型與需求層次</option>
        <option value="matrix_scenario_features">特殊情境與產品特色</option>
      </select>
      <div className="overflow-auto border rounded">
        <pre className="text-sm p-4 text-gray-800 bg-gray-50 whitespace-pre-wrap">
          {JSON.stringify(matrix, null, 2)}
        </pre>
      </div>
    </div>
  );
}
