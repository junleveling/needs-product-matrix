'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// API基礎URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// 客戶樣貌API
export const analyzeCustomerProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customers/analyze`, profileData);
    return response.data;
  } catch (error) {
    console.error('分析客戶樣貌失敗:', error);
    throw error;
  }
};

export const createCustomerProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customers`, profileData);
    return response.data;
  } catch (error) {
    console.error('創建客戶樣貌失敗:', error);
    throw error;
  }
};

// 產品API
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('獲取產品列表失敗:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`獲取${category}類別產品失敗:`, error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('獲取產品詳情失敗:', error);
    throw error;
  }
};

export const recommendProducts = async (customerNeeds) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products/recommend`, customerNeeds);
    return response.data;
  } catch (error) {
    console.error('產品推薦失敗:', error);
    throw error;
  }
};

// 行銷切角API
export const getMarketingAnglesByType = async (angleType) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/marketing/type/${angleType}`);
    return response.data;
  } catch (error) {
    console.error('獲取行銷切角失敗:', error);
    throw error;
  }
};

export const generateMarketingCopy = async (params) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/marketing/generate`, params);
    return response.data;
  } catch (error) {
    console.error('生成行銷文案失敗:', error);
    throw error;
  }
};

// 配對矩陣API
export const getMatrixByType = async (matrixType) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matrix/type/${matrixType}`);
    return response.data;
  } catch (error) {
    console.error('獲取配對矩陣失敗:', error);
    throw error;
  }
};

export const generateMatrixMatch = async (params) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/matrix/match`, params);
    return response.data;
  } catch (error) {
    console.error('生成配對結果失敗:', error);
    throw error;
  }
};

// 通用API錯誤處理Hook
export const useApiWithErrorHandling = (apiFunction, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || err.message || '發生未知錯誤');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
