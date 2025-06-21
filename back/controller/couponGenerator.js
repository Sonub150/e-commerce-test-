// utils/couponGenerator.js
// This file contains utility functions for generating coupon codes and managing coupon lifecycle
const shortid = require('shortid'); // Library for generating short, unique IDs
const cron = require('node-cron'); // Library for scheduling recurring tasks
const Coupon = require('../models/Coupon'); // Import the Coupon model

/**
 * Generates a unique coupon code
 * @param {string} prefix - Optional prefix to add to the coupon code (e.g., "SAVE", "WELCOME")
 * @returns {string} - A unique coupon code (e.g., "SAVE_ABC123", "WELCOME_XYZ789")
 * 
 * Example:
 * generateCouponCode("SAVE") → "SAVE_ABC123"
 * generateCouponCode() → "ABC123"
 */
function generateCouponCode(prefix = '') {
  // Generate a random string using shortid and convert to uppercase
  // shortid generates something like "abc123" → "ABC123"
  const randomPart = shortid.generate().toUpperCase();
  
  // Combine prefix with random part, or just return random part if no prefix
  return `${prefix}${randomPart}`;
}

/**
 * Deactivates all expired coupons by setting isActive to false
 * This function is designed to run as a scheduled task (cron job)
 * It finds all coupons where validUntil date has passed and isActive is still true
 */
const deactivateExpiredCoupons = async () => {
  try {
    // Find all coupons that have expired but are still marked as active
    // $lt means "less than" - find coupons where validUntil < current date
    const result = await Coupon.updateMany(
      { 
        validUntil: { $lt: new Date() }, // Expired coupons
        isActive: true // But still marked as active
      },
      { 
        $set: { isActive: false } // Set them to inactive
      }
    );
    
    // Log how many coupons were deactivated
    console.log(`Deactivated ${result.nModified} expired coupons`);
  } catch (error) {
    console.error('Error deactivating expired coupons:', error);
  }
};

/**
 * Schedule the deactivateExpiredCoupons function to run daily at midnight
 * Cron pattern: '0 0 * * *'
 * - 0: minute (0-59)
 * - 0: hour (0-23) 
 * - *: day of month (1-31)
 * - *: month (1-12)
 * - *: day of week (0-7, where 0 and 7 are Sunday)
 * 
 * So '0 0 * * *' means "at 00:00 (midnight) every day"
 */
cron.schedule('0 0 * * *', deactivateExpiredCoupons);

// Export the functions so they can be used in other files
module.exports = {
  generateCouponCode,
  deactivateExpiredCoupons
};