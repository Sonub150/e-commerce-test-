// checkCoupons.js
// This script checks what coupons exist in the database
const mongoose = require('mongoose');
const Coupon = require('./models/Coupon');

// Connect to MongoDB - Use the same database as your .env file
mongoose.connect('mongodb://127.0.0.1:27017/test1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function checkCoupons() {
  try {
    // Get all coupons
    const coupons = await Coupon.find({});
    
    console.log(`\n📋 Found ${coupons.length} coupons in database:\n`);
    
    if (coupons.length === 0) {
      console.log('❌ No coupons found in database');
      return;
    }
    
    coupons.forEach((coupon, index) => {
      console.log(`${index + 1}. Code: '${coupon.code}'`);
      console.log(`   Type: ${coupon.discountType}`);
      console.log(`   Value: ${coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}`);
      console.log(`   Min Order: $${coupon.minOrderAmount}`);
      console.log(`   Valid: ${new Date(coupon.validFrom).toLocaleDateString()} - ${new Date(coupon.validUntil).toLocaleDateString()}`);
      console.log(`   Active: ${coupon.isActive ? '✅' : '❌'}`);
      console.log(`   Usage: ${coupon.usedCount}/${coupon.usageLimit || '∞'}`);
      console.log('');
    });
    
    // Check for specific coupon
    const specificCoupon = await Coupon.findOne({ code: 'WELCOMEWB4DAUD6Y' });
    if (specificCoupon) {
      console.log('✅ Found WELCOMEWB4DAUD6Y coupon!');
      console.log(specificCoupon);
    } else {
      console.log('❌ WELCOMEWB4DAUD6Y coupon not found');
      console.log('\n💡 Available test coupons:');
      console.log('   • WELCOME20');
      console.log('   • SAVE10');
      console.log('   • SUMMER50');
      console.log('   • FREESHIP');
      console.log('   • NEWUSER25');
    }
    
  } catch (error) {
    console.error('❌ Error checking coupons:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the check
checkCoupons(); 