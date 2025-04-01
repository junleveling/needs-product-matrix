const mongoose = require('mongoose');

const CustomerProfileSchema = new mongoose.Schema({
  ageGroup: {
    type: String,
    required: true,
    enum: ['22-30', '30-40', '35-50', '45-55', '50-65', '65+']
  },
  familyStatus: {
    type: String,
    required: true,
    enum: ['single', 'married-no-children', 'with-minor-children', 'with-adult-children', 'empty-nest']
  },
  financialStatus: {
    incomeLevel: {
      type: String,
      required: true,
      enum: ['low', 'medium-low', 'medium', 'medium-high', 'high']
    },
    assetLevel: {
      type: String,
      required: true,
      enum: ['low', 'medium-low', 'medium', 'medium-high', 'high']
    },
    debtLevel: {
      type: String,
      required: true,
      enum: ['none', 'low', 'medium', 'high']
    }
  },
  riskPreference: {
    type: String,
    required: true,
    enum: ['conservative', 'moderate', 'aggressive']
  },
  financialLiteracy: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  needs: {
    basicNeeds: [{
      type: String,
      enum: [
        '短期資金存放', '緊急備用金', '日常交易便利性', 
        '購屋資金', '教育資金', '消費融資', 
        '資產增值', '退休規劃', '財富傳承'
      ]
    }],
    extendedNeeds: [{
      type: String,
      enum: [
        '投資風險分散', '資產保值', '匯率風險規避', 
        '通膨防禦', '生活便利性', '社會地位認同', 
        '子女教育規劃', '退休生活保障'
      ]
    }],
    specialNeeds: [{
      type: String,
      enum: [
        '海外資產配置', '跨境資金調度', '合法節稅', 
        '遺產稅規劃', '投資安全感', '財務自主感'
      ]
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CustomerProfile', CustomerProfileSchema);
