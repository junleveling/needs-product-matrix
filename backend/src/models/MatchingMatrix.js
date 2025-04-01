const mongoose = require('mongoose');

const MatchingMatrixSchema = new mongoose.Schema({
  matrixType: {
    type: String,
    required: true,
    enum: [
      'basic-financial-needs', 'extended-financial-needs', 'special-situation-needs',
      'economic-environment', 'lifecycle-stage', 'risk-preference'
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
  columns: [{
    name: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    }
  }],
  rows: [{
    category: {
      type: String,
      required: true
    },
    items: [{
      name: {
        type: String,
        required: true
      },
      values: {
        type: Map,
        of: String
      },
      productMatch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      compatibilityScore: {
        type: Number,
        min: 0,
        max: 100
      }
    }]
  }],
  dimensionExplanation: {
    type: String
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

module.exports = mongoose.model('MatchingMatrix', MatchingMatrixSchema);
