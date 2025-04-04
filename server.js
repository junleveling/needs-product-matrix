// 簡單的Express伺服器，用於Zeabur部署
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 設置靜態文件目錄
app.use(express.static(path.join(__dirname, 'src')));

// 設置數據API路由
app.get('/api/data/:filename', (req, res) => {
  const filename = req.params.filename;
  const allowedFiles = ['risk_time_matrix.json', 'life_stage_need_matrix.json', 'product_need_matrix.json', 'situation_feature_matrix.json'];
  
  if (allowedFiles.includes(filename)) {
    res.sendFile(path.join(__dirname, 'data', filename));
  } else {
    res.status(404).send('File not found');
  }
});

// 處理所有其他路由，返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
