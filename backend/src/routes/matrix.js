const express = require('express');
const router = express.Router();
const MatchingMatrix = require('../models/MatchingMatrix');

// 獲取所有配對矩陣
router.get('/', async (req, res) => {
  try {
    const matrices = await MatchingMatrix.find();
    res.json(matrices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 根據矩陣類型獲取配對矩陣
router.get('/type/:matrixType', async (req, res) => {
  try {
    const matrix = await MatchingMatrix.findOne({ matrixType: req.params.matrixType });
    if (!matrix) {
      return res.status(404).json({ message: '找不到配對矩陣' });
    }
    res.json(matrix);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 獲取單個配對矩陣
router.get('/:id', async (req, res) => {
  try {
    const matrix = await MatchingMatrix.findById(req.params.id);
    if (!matrix) {
      return res.status(404).json({ message: '找不到配對矩陣' });
    }
    res.json(matrix);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 創建配對矩陣
router.post('/', async (req, res) => {
  const matrix = new MatchingMatrix(req.body);
  try {
    const newMatrix = await matrix.save();
    res.status(201).json(newMatrix);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新配對矩陣
router.put('/:id', async (req, res) => {
  try {
    const updatedMatrix = await MatchingMatrix.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    if (!updatedMatrix) {
      return res.status(404).json({ message: '找不到配對矩陣' });
    }
    res.json(updatedMatrix);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 刪除配對矩陣
router.delete('/:id', async (req, res) => {
  try {
    const matrix = await MatchingMatrix.findByIdAndDelete(req.params.id);
    if (!matrix) {
      return res.status(404).json({ message: '找不到配對矩陣' });
    }
    res.json({ message: '配對矩陣已刪除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 根據客戶需求和產品特性生成配對結果
router.post('/match', async (req, res) => {
  try {
    const { 
      customerNeeds, 
      riskPreference, 
      lifeCycleStage, 
      economicEnvironment,
      matrixType 
    } = req.body;
    
    // 獲取指定類型的矩陣
    const matrix = await MatchingMatrix.findOne({ matrixType: matrixType || 'basic-financial-needs' });
    
    if (!matrix) {
      return res.status(404).json({ message: '找不到配對矩陣' });
    }
    
    // 根據客戶需求篩選矩陣行
    let matchedRows = [];
    
    if (customerNeeds && customerNeeds.length > 0) {
      matrix.rows.forEach(row => {
        let matchedItems = row.items.filter(item => 
          customerNeeds.includes(item.name)
        );
        
        if (matchedItems.length > 0) {
          matchedRows.push({
            category: row.category,
            items: matchedItems
          });
        }
      });
    } else {
      // 如果沒有指定需求，返回完整矩陣
      matchedRows = matrix.rows;
    }
    
    // 構建響應
    const result = {
      matrixType: matrix.matrixType,
      title: matrix.title,
      description: matrix.description,
      columns: matrix.columns,
      rows: matchedRows,
      dimensionExplanation: matrix.dimensionExplanation
    };
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
