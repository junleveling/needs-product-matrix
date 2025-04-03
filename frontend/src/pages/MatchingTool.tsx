
import { useEffect, useState } from 'react';

export default function MatchingTool() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [dimension, setDimension] = useState('matrix_risk_time');
  const [result, setResult] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/json/customer_needs_full.json')
      .then(res => res.json())
      .then(data => {
        const all = [];
        Object.values(data).forEach((cat: any) =>
          Object.values(cat).forEach((group: any) =>
            group.forEach((item: any) => all.push(item.label))
          )
        );
        setNeeds(all);
      });

    fetch('/json/product_features_full.json')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const match = () => {
    fetch(`/json/${dimension}.json`)
      .then(res => res.json())
      .then((matrix) => {
        const matched = new Set<string>();
        Object.values(matrix).forEach((group: any) =>
          Object.values(group).forEach((items: any) =>
            items.forEach((p: string) => matched.add(p))
          )
        );
        setResult(Array.from(matched).slice(0, 3));
      });
  };

  const getProductFeatures = (name: string) => {
    const product = products.find(p => p.name === name);
    if (!product) return null;
    return product.features;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-green-700">適配工具</h1>

      <div className="space-y-2">
        <label className="block font-medium text-green-800">選擇需求：</label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border p-2 rounded">
          {needs.map((n) => (
            <label key={n} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(n)}
                onChange={() =>
                  setSelected(prev => prev.includes(n)
                    ? prev.filter(x => x !== n)
                    : [...prev, n])
                }
              />
              {n}
            </label>
          ))}
        </div>

        <label className="block font-medium text-green-800">選擇配對維度：</label>
        <select value={dimension} onChange={(e) => setDimension(e.target.value)} className="border p-2 rounded">
          <option value="matrix_risk_time">風險偏好與時間</option>
          <option value="matrix_life_stage">人生階段與需求層次</option>
          <option value="matrix_product_type">產品類型與需求層次</option>
          <option value="matrix_scenario_features">特殊情境與產品特色</option>
        </select>

        <button onClick={match} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          配對推薦
        </button>
      </div>

      <div>
        <h2 className="text-green-700 font-semibold mt-6">推薦產品</h2>
        <ul className="space-y-4">
          {result.map(name => {
            const features = getProductFeatures(name);
            return (
              <li key={name} className="border p-3 rounded bg-green-50">
                <h3 className="font-bold text-green-800">{name}</h3>
                {features ? (
                  <div className="text-sm">
                    <p><strong>基本特色：</strong> {features.basic?.join('、')}</p>
                    <p><strong>延伸價值：</strong> {features.extended?.join('、')}</p>
                    <p><strong>差異化優勢：</strong> {features.differentiated?.join('、')}</p>
                  </div>
                ) : <p className="text-sm text-gray-500">查無產品資料</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
