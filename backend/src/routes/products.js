const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 獲取所有產品
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 根據類別獲取產品
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 獲取單個產品
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: '找不到產品' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 創建產品
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新產品
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: '找不到產品' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 刪除產品
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: '找不到產品' });
    }
    res.json({ message: '產品已刪除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 根據客戶需求推薦產品
router.post('/recommend', async (req, res) => {
  try {
    const { basicNeeds, extendedNeeds, specialNeeds, riskPreference } = req.body;
    
    // 構建查詢條件
    let query = {};
    
    // 根據風險偏好篩選
    if (riskPreference) {
      if (riskPreference === 'conservative') {
        query.riskLevel = { $in: ['low', 'medium-low'] };
      } else if (riskPreference === 'moderate') {
        query.riskLevel = { $in: ['medium-low', 'medium', 'medium-high'] };
      } else if (riskPreference === 'aggressive') {
        query.riskLevel = { $in: ['medium-high', 'high'] };
      }
    }
    
    // 查詢產品
    let products = await Product.find(query);
    
    // 計算適配度
    const recommendedProducts = products.map(product => {
      let compatibilityScore = 0;
      let matchedNeeds = 0;
      
      // 檢查基本需求匹配
      if (basicNeeds && basicNeeds.length > 0) {
        product.suitableNeeds.forEach(need => {
          if (need.needType === 'basic' && basicNeeds.includes(need.needName)) {
            compatibilityScore += need.compatibilityLevel;
            matchedNeeds++;
          }
        });
      }
      
      // 檢查延伸需求匹配
      if (extendedNeeds && extendedNeeds.length > 0) {
        product.suitableNeeds.forEach(need => {
          if (need.needType === 'extended' && extendedNeeds.includes(need.needName)) {
            compatibilityScore += need.compatibilityLevel;
            matchedNeeds++;
          }
        });
      }
      
      // 檢查特殊需求匹配
      if (specialNeeds && specialNeeds.length > 0) {
        product.suitableNeeds.forEach(need => {
          if (need.needType === 'special' && specialNeeds.includes(need.needName)) {
            compatibilityScore += need.compatibilityLevel;
            matchedNeeds++;
          }
        });
      }
      
      // 計算平均適配度
      const avgCompatibility = matchedNeeds > 0 ? compatibilityScore / matchedNeeds : 0;
      
      return {
        ...product.toObject(),
        compatibilityScore: Math.round(avgCompatibility)
      };
    });
    
    // 按適配度排序
    recommendedProducts.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    
    res.json(recommendedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
