'use client';

import { useState } from 'react';

interface CustomerProfileFormProps {
  onSubmit: (data: any) => void;
}

export default function CustomerProfileForm({ onSubmit }: CustomerProfileFormProps) {
  const [formData, setFormData] = useState({
    ageGroup: '',
    familyStatus: '',
    incomeLevel: '',
    assetLevel: '',
    debtLevel: '',
    riskPreference: '',
    financialLiteracy: '',
    basicNeeds: [] as string[],
    extendedNeeds: [] as string[],
    specialNeeds: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        [category]: [...formData[category as keyof typeof formData] as string[], value]
      });
    } else {
      setFormData({
        ...formData,
        [category]: (formData[category as keyof typeof formData] as string[]).filter(item => item !== value)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">客戶基本資料</h2>
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">年齡段</label>
              <select 
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded bg-white"
              >
                <option value="">請選擇</option>
                <option value="22-30">22-30歲</option>
                <option value="30-40">30-40歲</option>
                <option value="35-50">35-50歲</option>
                <option value="45-55">45-55歲</option>
                <option value="50-65">50-65歲</option>
                <option value="65+">65歲以上</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">家庭狀況</label>
              <select 
                name="familyStatus"
                value={formData.familyStatus}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded bg-white"
              >
                <option value="">請選擇</option>
                <option value="single">單身</option>
                <option value="married-no-children">新婚無子女</option>
                <option value="with-minor-children">有未成年子女</option>
                <option value="with-adult-children">有成年子女</option>
                <option value="empty-nest">空巢期</option>
              </select>
            </div>
          </div>
          
          {/* 其他表單元素 */}
          {/* ... */}
        </div>
      </section>
      
      <div className="text-center mb-8">
        <button type="submit" className="btn-primary px-8 py-2">提交資料</button>
      </div>
    </form>
  );
}
