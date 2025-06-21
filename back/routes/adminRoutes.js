// routes/adminRoutes.js
// Admin-specific routes for admin panel functionality
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/userauth');
const User = require('../models/user.models');
const Product = require('../models/productmodels');
const Coupon = require('../models/Coupon');

// Apply admin authentication middleware to all routes
router.use(protect);
router.use(admin);

/**
 * GET /api/admin/dashboard
 * Get admin dashboard statistics
 */
router.get('/dashboard', async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments({ isAdmin: false });
    
    // Get total products count
    const totalProducts = await Product.countDocuments();
    
    // Get total coupons count
    const totalCoupons = await Coupon.countDocuments();
    
    // Get active coupons count
    const activeCoupons = await Coupon.countDocuments({ isActive: true });
    
    // Get recent users (last 5)
    const recentUsers = await User.find({ isAdmin: false })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email createdAt');

    // Get recent products (last 5)
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name price images createdAt');

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalCoupons,
        activeCoupons
      },
      recentUsers,
      recentProducts
    });
  } catch (error) {
    console.error('❌ Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
});

/**
 * GET /api/admin/users
 * Get all users (for admin management)
 */
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    // Build search query
    const searchQuery = search 
      ? {
          $or: [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ],
          isAdmin: false // Exclude admin users from results
        }
      : { isAdmin: false };

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get users with pagination
    const users = await User.find(searchQuery)
      .select('-password -verifyOtp -otpExpires -resetOtp -resetOtpExpire')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalUsers = await User.countDocuments(searchQuery);

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNextPage: page * limit < totalUsers,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('❌ Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

/**
 * PUT /api/admin/users/:id/verify
 * Verify a user's email (admin can manually verify users)
 */
router.put('/users/:id/verify', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User verified successfully',
      user
    });
  } catch (error) {
    console.error('❌ Verify user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify user'
    });
  }
});

/**
 * DELETE /api/admin/users/:id
 * Delete a user (admin can delete users)
 */
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
});

/**
 * GET /api/admin/profile
 * Get admin profile information
 */
router.get('/profile', async (req, res) => {
  try {
    const admin = await User.findById(req.user._id)
      .select('-password -verifyOtp -otpExpires -resetOtp -resetOtpExpire');

    res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('❌ Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin profile'
    });
  }
});

/**
 * GET /api/admin/coupons
 * Get all coupons with pagination and search
 */
router.get('/coupons', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    
    // Build search query
    let searchQuery = {};
    
    if (search) {
      searchQuery.code = { $regex: search, $options: 'i' };
    }
    
    if (status === 'active') {
      searchQuery.isActive = true;
    } else if (status === 'inactive') {
      searchQuery.isActive = false;
    } else if (status === 'expired') {
      searchQuery.validUntil = { $lt: new Date() };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get coupons with pagination
    const coupons = await Coupon.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalCoupons = await Coupon.countDocuments(searchQuery);

    res.json({
      success: true,
      coupons,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCoupons / limit),
        totalCoupons,
        hasNextPage: page * limit < totalCoupons,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('❌ Get coupons error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch coupons'
    });
  }
});

/**
 * POST /api/admin/coupons
 * Create a new coupon
 */
router.post('/coupons', async (req, res) => {
  try {
    const {
      discountType,
      discountValue,
      minOrderAmount = 0,
      maxDiscountAmount,
      validFrom,
      validUntil,
      usageLimit,
      prefix = ''
    } = req.body;

    // Validate required fields
    if (!discountType || !discountValue || !validFrom || !validUntil) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate discount type
    if (!['percentage', 'fixed'].includes(discountType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid discount type. Must be "percentage" or "fixed"'
      });
    }

    // Validate discount value
    if (discountValue <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Discount value must be greater than 0'
      });
    }

    // Validate percentage discount
    if (discountType === 'percentage' && discountValue > 100) {
      return res.status(400).json({
        success: false,
        message: 'Percentage discount cannot exceed 100%'
      });
    }

    // Validate dates
    const startDate = new Date(validFrom);
    const endDate = new Date(validUntil);
    
    if (startDate >= endDate) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    // Generate unique coupon code
    const { generateCouponCode } = require('../controller/couponGenerator');
    const couponCode = generateCouponCode(prefix);

    // Create coupon
    const coupon = new Coupon({
      code: couponCode,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      validFrom: startDate,
      validUntil: endDate,
      usageLimit
    });

    await coupon.save();

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      coupon
    });
  } catch (error) {
    console.error('❌ Create coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create coupon',
      error: error.message
    });
  }
});

/**
 * PUT /api/admin/coupons/:id
 * Update a coupon
 */
router.put('/coupons/:id', async (req, res) => {
  try {
    const {
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      validFrom,
      validUntil,
      usageLimit,
      isActive
    } = req.body;

    // Validate discount type if provided
    if (discountType && !['percentage', 'fixed'].includes(discountType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid discount type. Must be "percentage" or "fixed"'
      });
    }

    // Validate discount value if provided
    if (discountValue !== undefined && discountValue <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Discount value must be greater than 0'
      });
    }

    // Validate percentage discount if provided
    if (discountType === 'percentage' && discountValue > 100) {
      return res.status(400).json({
        success: false,
        message: 'Percentage discount cannot exceed 100%'
      });
    }

    // Validate dates if provided
    if (validFrom && validUntil) {
      const startDate = new Date(validFrom);
      const endDate = new Date(validUntil);
      
      if (startDate >= endDate) {
        return res.status(400).json({
          success: false,
          message: 'End date must be after start date'
        });
      }
    }

    // Update coupon
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.json({
      success: true,
      message: 'Coupon updated successfully',
      coupon
    });
  } catch (error) {
    console.error('❌ Update coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update coupon',
      error: error.message
    });
  }
});

/**
 * DELETE /api/admin/coupons/:id
 * Delete a coupon
 */
router.delete('/coupons/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.json({
      success: true,
      message: 'Coupon deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete coupon'
    });
  }
});

/**
 * PUT /api/admin/coupons/:id/toggle
 * Toggle coupon active status
 */
router.put('/coupons/:id/toggle', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    // Toggle the active status
    coupon.isActive = !coupon.isActive;
    await coupon.save();

    res.json({
      success: true,
      message: `Coupon ${coupon.isActive ? 'activated' : 'deactivated'} successfully`,
      coupon
    });
  } catch (error) {
    console.error('❌ Toggle coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle coupon status'
    });
  }
});

/**
 * GET /api/admin/coupons/stats
 * Get coupon statistics for dashboard
 */
router.get('/coupons/stats', async (req, res) => {
  try {
    const totalCoupons = await Coupon.countDocuments();
    const activeCoupons = await Coupon.countDocuments({ isActive: true });
    const expiredCoupons = await Coupon.countDocuments({ 
      validUntil: { $lt: new Date() } 
    });
    const expiringSoon = await Coupon.countDocuments({
      validUntil: { 
        $gte: new Date(), 
        $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
      }
    });

    res.json({
      success: true,
      stats: {
        totalCoupons,
        activeCoupons,
        expiredCoupons,
        expiringSoon
      }
    });
  } catch (error) {
    console.error('❌ Get coupon stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch coupon statistics'
    });
  }
});

// =============================================
// Product Management Routes
// =============================================

/**
 * GET /api/admin/products
 * Get all products with pagination, search, and filtering
 */
router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category = '' } = req.query;

    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts
      }
    });
  } catch (error) {
    console.error('❌ Get products error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

/**
 * POST /api/admin/products
 * Create a new product
 */
router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    console.error('❌ Create product error:', error);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
});

/**
 * PUT /api/admin/products/:id
 * Update an existing product
 */
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('❌ Update product error:', error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

/**
 * DELETE /api/admin/products/:id
 * Delete a product
 */
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('❌ Delete product error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

module.exports = router; 