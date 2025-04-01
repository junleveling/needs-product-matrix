const express = require('express');
const router = express.Router();
const MarketingAngle = require('../models/MarketingAngle');

// 獲取所有行銷切角
router.get('/', async (req, res) => {
  try {
    const angles = await MarketingAngle.find();
    res.json(angles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 根據切角類型獲取行銷切角
router.get('/type/:angleType', async (req, res) => {
  try {
    const angles = await MarketingAngle.find({ angleType: req.params.angleType });
    res.json(angles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 獲取單個行銷切角
router.get('/:id', async (req, res) => {
  try {
    const angle = await MarketingAngle.findById(req.params.id);
    if (!angle) {
      return res.status(404).json({ message: '找不到行銷切角' });
    }
    res.json(angle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 創建行銷切角
router.post('/', async (req, res) => {
  const angle = new MarketingAngle(req.body);
  try {
    const newAngle = await angle.save();
    res.status(201).json(newAngle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新行銷切角
router.put('/:id', async (req, res) => {
  try {
    const updatedAngle = await MarketingAngle.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    if (!updatedAngle) {
      return res.status(404).json({ message: '找不到行銷切角' });
    }
    res.json(updatedAngle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 刪除行銷切角
router.delete('/:id', async (req, res) => {
  try {
    const angle = await MarketingAngle.findByIdAndDelete(req.params.id);
    if (!angle) {
      return res.status(404).json({ message: '找不到行銷切角' });
    }
    res.json({ message: '行銷切角已刪除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 根據產品和客戶類型生成行銷文案
router.post('/generate', async (req, res) => {
  try {
    const { productId, customerType, angleType } = req.body;
    
    // 構建查詢條件
    let query = {};
    
    if (angleType) {
      query.angleType = angleType;
    }
    
    // 查詢行銷切角
    const angles = await MarketingAngle.find(query);
    
    // 篩選適合的文案
    let suggestedCopies = [];
    
    angles.forEach(angle => {
      angle.suggestedCopy.forEach(copy => {
        if ((!productId || copy.targetProduct == productId) && 
            (!customerType || copy.targetCustomerType == customerType || !copy.targetCustomerType)) {
          suggestedCopies.push({
            title: copy.title,
            content: copy.content,
            angleType: angle.angleType,
            angleTitle: angle.title
          });
        }
      });
    });
    
    // 如果沒有完全匹配的文案，返回通用文案
    if (suggestedCopies.length === 0) {
      angles.forEach(angle => {
        angle.suggestedCopy.forEach(copy => {
          if (!copy.targetProduct && !copy.targetCustomerType) {
            suggestedCopies.push({
              title: copy.title,
              content: copy.content,
              angleType: angle.angleType,
              angleTitle: angle.title
            });
          }
        });
      });
    }
    
    res.json(suggestedCopies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
