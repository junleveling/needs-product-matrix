
import { useEffect, useState } from 'react';

type Item = { label: string; description: string };
type SubCategory = { [sub: string]: Item[] };
type NeedsData = { [category: string]: SubCategory };

export default function CustomerNeeds() {
  const [data, setData] = useState<NeedsData>({});

  useEffect(() => {
    fetch('/json/customer_needs_full.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-green-700">客戶需求總覽</h1>
      {Object.entries(data).map(([category, subcategories]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold text-green-800 border-b pb-1 mb-2">{category}</h2>
          {Object.entries(subcategories).map(([sub, items]) => (
            <div key={sub} className="mb-4 pl-4 border-l-4 border-green-200">
              <h3 className="font-medium text-green-800">{sub}</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {items.map((item, i) => (
                  <li key={i}>
                    <strong>{item.label}</strong>：{item.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
