
import { useEffect, useState } from 'react';

export default function ProductFeatures() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/json/product_features_full.json')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-green-700">產品特色總覽</h1>
      {products.map(p => (
        <div key={p.id} className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold text-green-800">{p.name}</h2>
          <div className="text-sm text-gray-800 mt-2">
            <p><strong>基本特色：</strong>{p.features.basic?.join('、')}</p>
            <p><strong>延伸價值：</strong>{p.features.extended?.join('、')}</p>
            <p><strong>差異化優勢：</strong>{p.features.differentiated?.join('、')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
