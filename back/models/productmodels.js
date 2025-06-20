const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    altText: {
      type: String
    }
  }],
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String
  }],
  discountPrice: {
    type: Number
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
   sku: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  brand: {
    type: String
  },
  sizes: {
    type: [String],
    required: function() {
      return this.category === 'clothing';
    }
  },
  colors: {
    type: [String],
    required: function() {
      return this.category === 'clothing';
    }
  },
  collectionName: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unisex']
  },
  tags: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);