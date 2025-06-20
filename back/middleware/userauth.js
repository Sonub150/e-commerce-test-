const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const Product = require('../models/productmodels');

const userAuth = (req, res, next) => {
  // 1. Get token from HTTP-only cookie
  const { token } = req.cookies;

  // 2. Check if token exists
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Authentication failed: No token provided' 
    });
  }

  try {
    // 3. Verify JWT token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Validate token payload contains userId
    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: Invalid token payload'
      });
    }

    // 5. Attach userId to request object for downstream use
    req.userId = decoded.userId;
    
    // 6. Proceed to next middleware/controller
    next();

  } catch (error) {
    // Handle specific JWT errors
    let errorMessage = 'Authentication failed';
    
    if (error.name === 'TokenExpiredError') {
      errorMessage = 'Session expired, please login again';
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid authentication token';
    }

    console.error('Authentication error:', error.message);
    return res.status(401).json({
      success: false,
      message: errorMessage
    });
  }
};

const admin = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized as admin' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { protect: userAuth, admin };