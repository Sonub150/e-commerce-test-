// addSpecificCoupon.js
// This script adds the specific coupon mentioned by the user
const mongoose = require('mongoose');
const Coupon = require('./models/Coupon');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function addSpecificCoupon() {
  try {
    // Check if coupon already exists
    const existingCoupon = await Coupon.findOne({ code: 'wlecomesWB4DAUD6Y' });
    
    if (existingCoupon) {
      console.log('✅ Coupon wlecomesWB4DAUD6Y already exists');
      console.log('📋 Current details:');
      console.log(`   Code: ${existingCoupon.code}`);
      console.log(`   Valid From: ${existingCoupon.validFrom.toLocaleDateString()}`);
      console.log(`   Valid Until: ${existingCoupon.validUntil.toLocaleDateString()}`);
      console.log(`   Active: ${existingCoupon.isActive}`);
      
      // Update dates to make it valid
      const now = new Date();
      const validFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      const validUntil = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
      
      existingCoupon.validFrom = validFrom;
      existingCoupon.validUntil = validUntil;
      await existingCoupon.save();
      
      console.log('\n✅ Updated coupon dates to make it valid');
      return;
    }
    
    // Create the coupon as specified by the user
    const now = new Date();
    const validFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const validUntil = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
    
    const coupon = new Coupon({
      code: 'wlecomesWB4DAUD6Y',
      discountType: 'percentage',
      discountValue: 70,
      minOrderAmount: 100,
      maxDiscountAmount: 50,
      validFrom: validFrom,
      validUntil: validUntil,
      isActive: true,
      usageLimit: 1,
      usedCount: 0
    });
    
    await coupon.save();
    
    console.log('✅ Created coupon wlecomesWB4DAUD6Y');
    console.log('📋 Details:');
    console.log(`   Code: ${coupon.code}`);
    console.log(`   Type: ${coupon.discountType}`);
    console.log(`   Value: ${coupon.discountValue}%`);
    console.log(`   Min Order: $${coupon.minOrderAmount}`);
    console.log(`   Max Discount: $${coupon.maxDiscountAmount}`);
    console.log(`   Valid From: ${validFrom.toLocaleDateString()}`);
    console.log(`   Valid Until: ${validUntil.toLocaleDateString()}`);
    console.log(`   Active: ${coupon.isActive}`);
    console.log(`   Usage Limit: ${coupon.usageLimit}`);
    
    console.log('\n💡 Now you can test with: wlecomesWB4DAUD6Y');
    console.log('   • 70% off on orders over $100');
    console.log('   • Maximum discount: $50');
    console.log('   • Usage limit: 1 time');
    
  } catch (error) {
    console.error('❌ Error adding coupon:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the script
addSpecificCoupon(); 