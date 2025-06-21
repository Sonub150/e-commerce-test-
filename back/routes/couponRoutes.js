// routes/couponRoutes.js
// This file contains all the API routes for coupon management
// Routes handle creating, validating, applying, and managing coupons
const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon'); // Import the Coupon model
const { generateCouponCode } = require('../controller/couponGenerator'); // Import coupon code generator

/**
 * POST /api/coupons
 * Create a new coupon
 * 
 * Request Body:
 * {
 *   "discountType": "percentage" | "fixed",
 *   "discountValue": number,
 *   "minOrderAmount": number (optional, default: 0),
 *   "maxDiscountAmount": number (optional),
 *   "validFrom": "2024-01-01",
 *   "validUntil": "2024-12-31",
 *   "usageLimit": number (optional),
 *   "prefix": "SAVE" (optional)
 * }
 * 
 * Response: Created coupon object
 */
router.post('/', async (req, res) => {
  try {
    // Extract coupon details from request body
    const {
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      validFrom,
      validUntil,
      usageLimit,
      prefix = '' // Default to empty string if no prefix provided
    } = req.body;

    // Generate a unique coupon code using the provided prefix
    const couponCode = generateCouponCode(prefix);

    // Create a new coupon instance with the provided data
    const coupon = new Coupon({
      code: couponCode,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      validFrom: new Date(validFrom), // Convert string to Date object
      validUntil: new Date(validUntil), // Convert string to Date object
      usageLimit
    });

    // Save the coupon to the database
    await coupon.save();
    
    // Return the created coupon with 201 status (Created)
    res.status(201).json(coupon);
  } catch (error) {
    // If there's an error (e.g., validation failed), return 400 status
    res.status(400).json({ message: error.message });
  }
});

/**
 * POST /api/coupons/validate
 * Validate a coupon without applying it (check if it can be used)
 * 
 * Request Body:
 * {
 *   "code": "SAVE20",
 *   "orderAmount": 100
 * }
 * 
 * Response:
 * {
 *   "valid": true/false,
 *   "coupon": couponObject,
 *   "discountAmount": 20,
 *   "finalAmount": 80
 * }
 */
router.post('/validate', async (req, res) => {
  try {
    const { code, orderAmount = 0 } = req.body;
    
    // Find the coupon by its code
    const coupon = await Coupon.findOne({ code });

    // Check if coupon exists
    if (!coupon) {
      return res.status(404).json({ valid: false, message: 'Coupon not found' });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return res.status(400).json({ valid: false, message: 'Coupon is inactive' });
    }

    const now = new Date();
    
    // Check if coupon is not yet valid (start date hasn't been reached)
    if (now < new Date(coupon.validFrom)) {
      return res.status(400).json({ valid: false, message: 'Coupon is not yet valid' });
    }

    // Check if coupon has expired (end date has passed)
    if (now > new Date(coupon.validUntil)) {
      return res.status(400).json({ valid: false, message: 'Coupon has expired' });
    }

    // Check if usage limit has been reached
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ valid: false, message: 'Coupon usage limit reached' });
    }

    // Check if order amount meets minimum requirement
    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        valid: false,
        message: `Minimum order amount of ${coupon.minOrderAmount} required`
      });
    }

    // Calculate the discount amount based on coupon type
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      // For percentage discounts: calculate percentage of order amount
      discountAmount = (orderAmount * coupon.discountValue) / 100;
      
      // If there's a maximum discount amount, don't exceed it
      if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
        discountAmount = coupon.maxDiscountAmount;
      }
    } else {
      // For fixed discounts: use the fixed amount, but don't exceed order amount
      discountAmount = Math.min(coupon.discountValue, orderAmount);
    }

    // Return validation result with calculated amounts
    res.json({
      valid: true,
      coupon,
      discountAmount,
      finalAmount: orderAmount - discountAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /api/coupons/apply
 * Apply a coupon (marks it as used and increments usage count)
 * 
 * Request Body:
 * {
 *   "code": "SAVE20",
 *   "orderAmount": 100
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "coupon": couponObject,
 *   "discountAmount": 20,
 *   "finalAmount": 80
 * }
 */
router.post('/apply', async (req, res) => {
  try {
    const { code, orderAmount = 0 } = req.body;
    
    // Find the coupon by its code
    const coupon = await Coupon.findOne({ code });

    // Check if coupon exists
    if (!coupon) {
      return res.status(404).json({ valid: false, message: 'Coupon not found' });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return res.status(400).json({ valid: false, message: 'Coupon is inactive' });
    }

    const now = new Date();
    
    // Check if coupon is not yet valid
    if (now < new Date(coupon.validFrom)) {
      return res.status(400).json({ valid: false, message: 'Coupon is not yet valid' });
    }

    // Check if coupon has expired
    if (now > new Date(coupon.validUntil)) {
      return res.status(400).json({ valid: false, message: 'Coupon has expired' });
    }

    // Check if usage limit has been reached
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ valid: false, message: 'Coupon usage limit reached' });
    }

    // Check if order amount meets minimum requirement
    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        valid: false,
        message: `Minimum order amount of ${coupon.minOrderAmount} required`
      });
    }

    // Calculate the discount amount (same logic as validate endpoint)
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (orderAmount * coupon.discountValue) / 100;
      if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
        discountAmount = coupon.maxDiscountAmount;
      }
    } else {
      discountAmount = Math.min(coupon.discountValue, orderAmount);
    }

    // Increment the usage count since we're applying the coupon
    coupon.usedCount += 1;
    await coupon.save();

    // Return success response with calculated amounts
    res.json({ 
      success: true, 
      coupon,
      discountAmount,
      finalAmount: orderAmount - discountAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /api/coupons
 * Get all coupons (for admin dashboard)
 * 
 * Response: Array of all coupon objects
 */
router.get('/', async (req, res) => {
  try {
    // Find all coupons and sort by creation date (newest first)
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /api/coupons/:id
 * Get a specific coupon by its ID
 * 
 * URL Parameters:
 * - id: The coupon's MongoDB ObjectId
 * 
 * Response: Single coupon object
 */
router.get('/:id', async (req, res) => {
  try {
    // Find coupon by its ID
    const coupon = await Coupon.findById(req.params.id);
    
    // If coupon not found, return 404
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * PUT /api/coupons/:id
 * Update a specific coupon
 * 
 * URL Parameters:
 * - id: The coupon's MongoDB ObjectId
 * 
 * Request Body: Any coupon fields to update
 * 
 * Response: Updated coupon object
 */
router.put('/:id', async (req, res) => {
  try {
    // Find and update the coupon by ID
    // { new: true } returns the updated document
    // { runValidators: true } ensures schema validation runs on update
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    // If coupon not found, return 404
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    res.json(coupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE /api/coupons/:id
 * Delete a specific coupon
 * 
 * URL Parameters:
 * - id: The coupon's MongoDB ObjectId
 * 
 * Response: Success message
 */
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete the coupon by ID
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    
    // If coupon not found, return 404
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
