const mongoose = require('mongoose');

const MarketingAngleSchema = new mongoose.Schema({
  angleType: {
    type: String,
    required: true,
    enum: [
      'life-scenario', 'functional-value', 'emotional-appeal', 
      'social-recognition', 'professional-analysis', 'educational', 
      'problem-solving', 'future-vision', 'data-driven', 'value-connection'
    ]
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  suitableProducts: [{
    type: String,
    required: true
  }],
  suitableCustomers: [{
    type: String,
    required: true
  }],
  keyElements: [{
    type: String,
    required: true
  }],
  suggestedCopy: [{
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    targetProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    targetCustomerType: {
      type: String
    }
  }],
  effectivenessMetrics: {
    customerUnderstanding: {
      type: Number,
      min: 1,
      max: 5
    },
    emotionalResonance: {
      type: Number,
      min: 1,
      max: 5
    },
    differentiation: {
      type: Number,
      min: 1,
      max: 5
    },
    callToAction: {
      type: Number,
      min: 1,
      max: 5
    }
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

module.exports = mongoose.model('MarketingAngle', MarketingAngleSchema);
