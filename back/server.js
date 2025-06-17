require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./mongoos');
const userRoutes = require('./routes/userRoutes');

// Import routes
const authRoutes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend URL
  credentials: true // Allow sending cookies
}));
app.use(express.json()); // ✅ Parses application/json
app.use(cookieParser()); // ✅ Parses cookies from requests

// ✅ Connect to MongoDB
connectDB();
// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
