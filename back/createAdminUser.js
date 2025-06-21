const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.models');
require('dotenv').config();

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists. Updating to admin privileges...');
      
      // Update existing user to have admin privileges
      await User.findByIdAndUpdate(existingAdmin._id, {
        isAdmin: true,
        isVerified: true
      });
      
      console.log('✅ Existing user updated to admin privileges');
      console.log('📧 Email: admin@example.com');
      console.log('🔑 Password: admin123');
    } else {
      console.log('🆕 Creating new admin user...');
      
      // Create new admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        mobNo: '1234567890',
        password: hashedPassword,
        address: {
          addressLine1: 'Admin Address',
          addressLine2: '',
          city: 'Admin City',
          state: 'Admin State',
          pincode: '12345'
        },
        isAdmin: true,
        isVerified: true
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: admin@example.com');
      console.log('🔑 Password: admin123');
    }

    // Also create a regular user for testing
    const existingUser = await User.findOne({ email: 'user@example.com' });
    
    if (!existingUser) {
      console.log('🆕 Creating regular user for testing...');
      
      const hashedUserPassword = await bcrypt.hash('user123', 10);
      
      const regularUser = new User({
        firstName: 'Regular',
        lastName: 'User',
        email: 'user@example.com',
        mobNo: '9876543210',
        password: hashedUserPassword,
        address: {
          addressLine1: 'User Address',
          addressLine2: '',
          city: 'User City',
          state: 'User State',
          pincode: '54321'
        },
        isAdmin: false,
        isVerified: true
      });
      
      await regularUser.save();
      console.log('✅ Regular user created successfully');
      console.log('📧 Email: user@example.com');
      console.log('🔑 Password: user123');
    }

    console.log('\n🎉 Setup complete!');
    console.log('\n📋 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👑 Admin User:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Regular User:');
    console.log('   Email: user@example.com');
    console.log('   Password: user123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
    process.exit(1);
  }
}

createAdminUser(); 