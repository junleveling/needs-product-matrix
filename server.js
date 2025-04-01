const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// 引入路由
const productsRoutes = require('./routes/products');
const customersRoutes = require('./routes/customers');
const marketingRoutes = require('./routes/marketing');
const matrixRoutes = require('./routes/matrix');

// 初始化Express應用
const app = express();
const PORT = process.env.PORT || 5000;

// 中間件
app.use(cors());
app.use(express.json());

// 連接MongoDB
mongoose.connect('mongodb://localhost:27017/customer-product-matching', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB連接成功'))
.catch(err => console.error('MongoDB連接失敗:', err));

// 路由
app.use('/api/products', productsRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/matrix', matrixRoutes);

// 根路由
app.get('/', (req, res) => {
  res.send('客戶需求與產品訴求互動網站API服務運行中');
});

// 初始化種子數據
const initializeData = async () => {
  try {
    // 引入模型
    const Product = require('./models/Product');
    const CustomerProfile = require('./models/CustomerProfile');
    const MarketingAngle = require('./models/MarketingAngle');
    const MatchingMatrix = require('./models/MatchingMatrix');
    
    // 檢查是否已有數據
    const productsCount = await Product.countDocuments();
    const customersCount = await CustomerProfile.countDocuments();
    const marketingCount = await MarketingAngle.countDocuments();
    const matrixCount = await MatchingMatrix.countDocuments();
    
    // 如果沒有數據，則導入種子數據
    if (productsCount === 0) {
      const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/seed/products.json'), 'utf8'));
      await Product.insertMany(productsData);
      console.log('產品種子數據導入成功');
    }
    
    if (customersCount === 0) {
      const customersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/seed/customers.json'), 'utf8'));
      await CustomerProfile.insertMany(customersData);
      console.log('客戶樣貌種子數據導入成功');
    }
    
    if (marketingCount === 0) {
      const marketingData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/seed/marketing.json'), 'utf8'));
      await MarketingAngle.insertMany(marketingData);
      console.log('行銷切角種子數據導入成功');
    }
    
    if (matrixCount === 0) {
      const matrixData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/seed/matrix.json'), 'utf8'));
      await MatchingMatrix.insertMany(matrixData);
      console.log('配對矩陣種子數據導入成功');
    }
    
    console.log('所有種子數據初始化完成');
  } catch (err) {
    console.error('種子數據初始化失敗:', err);
  }
};

// 啟動服務器
app.listen(PORT, () => {
  console.log(`服務器運行在端口 ${PORT}`);
  initializeData();
});

module.exports = app;
