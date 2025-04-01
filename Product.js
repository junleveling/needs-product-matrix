const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['credit-card', 'savings', 'loan', 'investment', 'insurance', 'wealth-management'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  basicFeatures: [{
    type: String,
    required: true
  }],
  extendedFeatures: [{
    type: String
  }],
  suitableNeeds: [{
    needType: {
      type: String,
      enum: ['basic', 'extended', 'special'],
      required: true
    },
    needName: {
      type: String,
      required: true
    },
    compatibilityLevel: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    }
  }],
  economicConsiderations: {
    type: String
  },
  targetCustomers: [{
    type: String
  }],
  riskLevel: {
    type: String,
    enum: ['low', 'medium-low', 'medium', 'medium-high', 'high'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
