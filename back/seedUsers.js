const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.models');

// Sample users array
const users = [
  {
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@example.com',
    mobNo: '9876543210',
    password: 'password123', // Will be hashed
    address: {
      addressLine1: '456 Elm St',
      addressLine2: 'Suite 2A',
      city: 'Los Angeles',
      state: 'CA',
      pincode: '90001'
    }
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com',
    mobNo: '1234567890',
    password: 'password456', // Will be hashed
    address: {
      addressLine1: '123 Main St',
      addressLine2: '',
      city: 'New York',
      state: 'NY',
      pincode: '10001'
    }
  }
];

async function seedUsers() {
  try {
    await mongoose.connect('process.env.MONGO_URI', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    // Hash passwords
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    // Clear existing users
    await User.deleteMany({});
    // Insert sample users
    await User.insertMany(users);
    console.log('Sample users seeded!');
    process.exit();
  } catch (err) {
    console.error('Seeder error:', err);
    process.exit(1);
  }
}

seedUsers();

// Instructions:
// 1. Replace 'yourdbname' with your actual MongoDB database name.
// 2. Run this script with: node seedUsers.js 