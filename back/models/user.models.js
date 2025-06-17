const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  mobNo: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false // Don't include password in queries by default
  },
  address: {
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  // Email verification OTP fields
  verifyOtp: {
    type: String,
    default: null
  },
  otpExpires: {
    type: Date,
    default: null
  },
  // Password reset OTP fields
  resetOtp: {
    type: String,
    default: null
  },
  resetOtpExpire: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);