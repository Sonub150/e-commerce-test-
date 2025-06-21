// models/Coupon.js
// This file defines the MongoDB schema for coupons/discount codes
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  // Unique coupon code that users will enter (e.g., "SAVE20", "WELCOME50")
  code: {
    type: String,
    required: true,
    unique: true // Ensures no duplicate coupon codes
  },
  
  // Type of discount: 'percentage' (e.g., 20% off) or 'fixed' (e.g., $10 off)
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'], // Only these two values are allowed
    required: true
  },
  
  // The actual discount value
  // For percentage: 20 means 20% discount
  // For fixed: 20 means $20 discount
  discountValue: {
    type: Number,
    required: true,
    min: 0 // Discount cannot be negative
  },
  
  // Minimum order amount required to use this coupon
  // If order total is less than this, coupon cannot be applied
  minOrderAmount: {
    type: Number,
    default: 0 // Default to 0 (no minimum)
  },
  
  // Maximum discount amount (mainly for percentage discounts)
  // Example: 20% off with max $50 means maximum discount is $50
  maxDiscountAmount: {
    type: Number,
    required: false // Optional field
  },
  
  // When the coupon becomes valid (start date)
  validFrom: {
    type: Date,
    required: true
  },
  
  // When the coupon expires (end date)
  validUntil: {
    type: Date,
    required: true
  },
  
  // Whether the coupon is currently active
  // Can be manually deactivated or automatically deactivated when expired
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Maximum number of times this coupon can be used
  // If null/undefined, there's no limit
  usageLimit: {
    type: Number,
    required: false
  },
  
  // How many times this coupon has been used so far
  usedCount: {
    type: Number,
    default: 0
  },
  
  // When this coupon was created
  createdAt: {
    type: Date,
    default: Date.now
  },

  

} );

// Create and export the Coupon model
module.exports = mongoose.model('Coupon', couponSchema);