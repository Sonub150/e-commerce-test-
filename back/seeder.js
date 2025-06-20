const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Product = require('./models/productmodels');
const User = require('./models/user.models');
const Products = require('./data/Product');
const connectDB = require('./mongoos');
const Cart=require('./models/cart.models')

dotenv.config();

const seedData = async () => {
  try {
    // 1. Connect to DB first
    await connectDB();
    console.log('Connected to database...');

    // 2. Clear existing data
    await Product.deleteMany();
    await Product.deleteMany({ sku: null });
    await User.deleteMany();
    await Cart.deleteMany();
    console.log('Old data cleared...');

    // 3. Create admin user with hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt); // Change to secure password
    
    const createdUser = await User.create({
      firstName: 'Sonu',
      lastName: 'Nigam',
      email: 'nigamsonu150@gmail.com',
      password: hashedPassword,
      mobNo: '1234567890',
      role: 'admin',
      isVerified: true, // If your model has verification
      address: {
        addressLine1: '123 Main St',
        city: 'YourCity',
        state: 'YourState',
        pincode: '123456'
      }
    });

    console.log('Admin user created:', createdUser.email);

    // 4. Create products with user reference
    const sampleProducts = Products.map(product => ({
      ...product,
      user: createdUser._id
    }));

    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} products seeded successfully!`);
    process.exit();

  } catch (error) {
    console.error('Seeding error:');
    console.error('- Message:', error.message);
    console.error('- Stack:', process.env.NODE_ENV === 'development' ? error.stack : 'Hidden in production');
    process.exit(1);
  }
};

// Execute seeding
seedData();