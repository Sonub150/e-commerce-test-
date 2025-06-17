const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../auth/nodemailer');
const User = require('../models/user.models');

// ===============================
// Verify SMTP at Startup
// ===============================
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection Error:', error);
  } else {
    console.log('✅ SMTP Server is ready to send emails');
  }
});

// ===============================
// Register New User
// ===============================
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, mobNo, password, address } = req.body;
    const { addressLine1, addressLine2 = "", city, state, pincode } = address || {};

    // Validate required fields
    if (!firstName || !lastName || !email || !mobNo || !password ||
        !addressLine1 || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      mobNo,
      password: hashedPassword,
      address: { addressLine1, addressLine2, city, state, pincode },
      isVerified: false
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    // Send welcome email (optional)
    try {
      await transporter.sendMail({
        from: `"Your App" <${process.env.SENDER_EMAIL}>`,
        to: newUser.email,
        subject: 'Welcome to Our Service',
        html: `<h1>Welcome, ${firstName}!</h1><p>Your account was created successfully.</p>`
      });
    } catch (emailError) {
      console.error('📧 Email sending failed:', emailError);
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        mobNo: newUser.mobNo,
        address: newUser.address,
        isVerified: newUser.isVerified
      },
      token
    });

  } catch (error) {
    console.error("❌ Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// ===============================
// User Login
// ===============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user and check password
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Check email verification
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobNo: user.mobNo,
        address: user.address,
        isVerified: user.isVerified
      },
      token
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// ===============================
// Logout User
// ===============================
const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};

// ===============================
// Send Verification OTP
// ===============================
const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.isVerified) return res.status(400).json({ success: false, message: "User already verified" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    user.verifyOtp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const mailOptions = {
      from: `"Your App" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: 'Email Verification OTP',
      text: `Your OTP for email verification is: ${otp}\n\nIt is valid for 15 minutes.`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("❌ Email send error:", error);
        return res.status(500).json({ success: false, message: "Failed to send OTP" });
      }
      return res.status(200).json({ success: true, message: "OTP sent successfully", userId: user._id });
    });

  } catch (error) {
    console.error("❌ OTP sending error:", error);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// ===============================
// Verify Email Using OTP
// ===============================
const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ success: false, message: "User ID and OTP are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.isVerified) return res.status(400).json({ success: false, message: "User already verified" });

    if (user.verifyOtp !== otp.trim()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    user.isVerified = true;
    user.verifyOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("❌ Email verification error:", error);
    return res.status(500).json({ success: false, message: "Email verification failed" });
  }
};

// ===============================
// Authenticated Route Check
// ===============================
const userAuthenticated = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "User authenticated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Authentication check failed" });
  }
};

// ===============================
// Send Reset Password OTP
// ===============================
const sendResetotp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Please provide your email" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    user.resetOtp = otp;
    user.resetOtpExpire = otpExpire;
    await user.save();

    const mailOptions = {
      from: `"Your App" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: 'Reset Password OTP',
      text: `Your OTP for resetting password is: ${otp}\n\nThis OTP is valid for 10 minutes.`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("❌ Email send error:", error);
        return res.status(500).json({ success: false, message: "Failed to send OTP" });
      }
      res.status(200).json({ success: true, message: "OTP sent successfully to your email" });
    });
  } catch (error) {
    console.error("❌ sendResetotp error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ===============================
// Reset User Password
// ===============================
const resetUserPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: "Please provide all the required fields" });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (!user.resetOtpExpire || new Date(user.resetOtpExpire) < new Date()) {
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpire = null;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error("❌ Reset password error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ===============================
// Export Controllers
// ===============================
const authController = {
  register,
  login,
  logout,
  sendOtp,
  verifyEmail,
  userAuthenticated,
  sendResetotp,
  resetUserPassword
};

module.exports = authController;
