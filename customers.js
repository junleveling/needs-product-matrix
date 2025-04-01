const express = require('express');
const router = express.Router();
const CustomerProfile = require('../models/CustomerProfile');

// 獲取所有客戶樣貌
router.get('/', async (req, res) => {
  try {
    const profiles = await CustomerProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 獲取單個客戶樣貌
router.get('/:id', async (req, res) => {
  try {
    const profile = await CustomerProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: '找不到客戶樣貌' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 創建客戶樣貌
router.post('/', async (req, res) => {
  const profile = new CustomerProfile(req.body);
  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新客戶樣貌
router.put('/:id', async (req, res) => {
  try {
    const updatedProfile = await CustomerProfile.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: '找不到客戶樣貌' });
    }
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 刪除客戶樣貌
router.delete('/:id', async (req, res) => {
  try {
    const profile = await CustomerProfile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: '找不到客戶樣貌' });
    }
    res.json({ message: '客戶樣貌已刪除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 分析客戶樣貌
router.post('/analyze', async (req, res) => {
  try {
    const { 
      ageGroup, 
      familyStatus, 
      financialStatus, 
      riskPreference, 
      financialLiteracy,
      needs 
    } = req.body;
    
    // 分析客戶特徵
    let analysis = {
      customerType: '',
      primaryNeeds: [],
      riskProfile: '',
      lifeCycleStage: '',
      recommendedProductCategories: []
    };
    
    // 根據年齡和家庭狀況確定生命週期階段
    if (ageGroup === '22-30' && (familyStatus === 'single' || familyStatus === 'married-no-children')) {
      analysis.lifeCycleStage = '家庭成立期';
    } else if ((ageGroup === '30-40' || ageGroup === '35-50') && 
               (familyStatus === 'with-minor-children')) {
      analysis.lifeCycleStage = '子女教育期';
    } else if ((ageGroup === '35-50' || ageGroup === '45-55') && 
               (familyStatus === 'with-minor-children' || familyStatus === 'with-adult-children')) {
      analysis.lifeCycleStage = '事業高峰期';
    } else if ((ageGroup === '45-55' || ageGroup === '50-65') && 
               (familyStatus === 'with-adult-children' || familyStatus === 'empty-nest')) {
      analysis.lifeCycleStage = '退休準備期';
    } else if (ageGroup === '65+') {
      analysis.lifeCycleStage = '退休生活期';
    }
    
    // 根據風險偏好和財務狀況確定客戶類型
    if (riskPreference === 'conservative') {
      analysis.riskProfile = '保守型投資者';
      if (financialStatus.assetLevel === 'high' || financialStatus.assetLevel === 'medium-high') {
        analysis.customerType = '保守型高資產客戶';
      } else {
        analysis.customerType = '保守型一般客戶';
      }
    } else if (riskPreference === 'moderate') {
      analysis.riskProfile = '穩健型投資者';
      if (financialStatus.assetLevel === 'high' || financialStatus.assetLevel === 'medium-high') {
        analysis.customerType = '穩健型高資產客戶';
      } else {
        analysis.customerType = '穩健型一般客戶';
      }
    } else if (riskPreference === 'aggressive') {
      analysis.riskProfile = '積極型投資者';
      if (financialStatus.assetLevel === 'high' || financialStatus.assetLevel === 'medium-high') {
        analysis.customerType = '積極型高資產客戶';
      } else {
        analysis.customerType = '積極型一般客戶';
      }
    }
    
    // 分析主要需求
    if (needs && needs.basicNeeds) {
      analysis.primaryNeeds = needs.basicNeeds;
    }
    
    // 根據客戶特徵推薦產品類別
    if (analysis.lifeCycleStage === '家庭成立期') {
      if (analysis.riskProfile === '保守型投資者') {
        analysis.recommendedProductCategories = ['savings', 'credit-card'];
      } else if (analysis.riskProfile === '穩健型投資者') {
        analysis.recommendedProductCategories = ['credit-card', 'loan', 'investment'];
      } else {
        analysis.recommendedProductCategories = ['investment', 'credit-card'];
      }
    } else if (analysis.lifeCycleStage === '子女教育期') {
      if (analysis.riskProfile === '保守型投資者') {
        analysis.recommendedProductCategories = ['savings', 'insurance'];
      } else if (analysis.riskProfile === '穩健型投資者') {
        analysis.recommendedProductCategories = ['loan', 'insurance', 'investment'];
      } else {
        analysis.recommendedProductCategories = ['investment', 'insurance'];
      }
    } else if (analysis.lifeCycleStage === '事業高峰期') {
      if (analysis.riskProfile === '保守型投資者') {
        analysis.recommendedProductCategories = ['savings', 'wealth-management'];
      } else if (analysis.riskProfile === '穩健型投資者') {
        analysis.recommendedProductCategories = ['wealth-management', 'investment'];
      } else {
        analysis.recommendedProductCategories = ['investment', 'wealth-management'];
      }
    } else if (analysis.lifeCycleStage === '退休準備期' || analysis.lifeCycleStage === '退休生活期') {
      if (analysis.riskProfile === '保守型投資者') {
        analysis.recommendedProductCategories = ['savings', 'insurance'];
      } else if (analysis.riskProfile === '穩健型投資者') {
        analysis.recommendedProductCategories = ['wealth-management', 'insurance'];
      } else {
        analysis.recommendedProductCategories = ['investment', 'wealth-management'];
      }
    }
    
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
