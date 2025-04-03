
export default function MatchingModelInfo() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-green-700">3.1 多維度配對模型</h1>
      <p>本模型採用多維度策略，從不同面向比對客戶需求與產品特色，包括：</p>
      <ul className="list-disc pl-6 text-gray-700">
        <li><strong>層次維度：</strong>基本特色 ↔ 基本財務需求，延伸價值 ↔ 延伸財務需求，差異化優勢 ↔ 隱性/特殊情境需求</li>
        <li><strong>時間維度：</strong>短期（1 年內）、中期（1-5 年）、長期（5 年以上）</li>
        <li><strong>風險偏好維度：</strong>保守型、穩健型、積極型客戶對應不同資產配置</li>
        <li><strong>人生階段維度：</strong>從初入社會期到退休生活期，對應不同需求與產品建議</li>
        <li><strong>特殊情境維度：</strong>例如跨國生活、稅務規劃、被動收入需求等</li>
      </ul>
      <p>所有配對皆建立於資料驅動的矩陣上，透過矩陣內部映射推薦對應產品與解決方案。</p>
    </div>
  );
}
