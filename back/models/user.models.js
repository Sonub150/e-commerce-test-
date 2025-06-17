const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobNo: { type: String, required: true },
  password: { type: String, required: true, select: false },
  
  address: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, default: "" },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },

  // ✅ OTP and verification fields (correct location)
  verifyOtp: { type: String, default: "" },
  otpExpire: { type: Date }, // Should be Date, not Number
  isVerified: { type: Boolean, default: false },

  resetOtp: { type: String, default: "" },
  resetOtpExpire: { type: Date },
  resetPassword: { type: Boolean, default: false }

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
