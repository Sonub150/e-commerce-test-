import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiMapPin, FiArrowRight, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  // Set initial tab based on route
  const [activeTab, setActiveTab] = useState(location.pathname === '/register' ? 'register' : 'login');

  // Update tab if route changes
  useEffect(() => {
    setActiveTab(location.pathname === '/register' ? 'register' : 'login');
  }, [location.pathname]);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});

  // Register form state
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobNo: '',
    password: '',
    confirmPassword: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: ''
    }
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});

  // ==================== LOGIN FUNCTIONS ====================
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    if (loginErrors[name]) {
      setLoginErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateLoginForm = () => {
    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;

    setIsLoginLoading(true);
    
    try {
      // ==================== BACKEND INTEGRATION - LOGIN ====================
      // TODO: Replace this with actual API call
      // Example:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(loginData)
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Login attempt:', loginData);
      
      // TODO: Handle successful login
      // - Store JWT token in localStorage
      // - Update user context/state
      // - Redirect to dashboard/home
      alert('Login successful!');
      
    } catch (error) {
      console.error('Login error:', error);
      setLoginErrors({ general: 'Invalid email or password' });
    } finally {
      setIsLoginLoading(false);
    }
  };

  // ==================== REGISTER FUNCTIONS ====================
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setRegisterData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setRegisterData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (registerErrors[name]) {
      setRegisterErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateRegisterForm = () => {
    const newErrors = {};

    // Personal Information validation
    if (!registerData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!registerData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!registerData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!registerData.mobNo) {
      newErrors.mobNo = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(registerData.mobNo)) {
      newErrors.mobNo = 'Please enter a valid 10-digit mobile number';
    }

    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Address validation
    if (!registerData.address.addressLine1.trim()) {
      newErrors['address.addressLine1'] = 'Address line 1 is required';
    }

    if (!registerData.address.city.trim()) {
      newErrors['address.city'] = 'City is required';
    }

    if (!registerData.address.state.trim()) {
      newErrors['address.state'] = 'State is required';
    }

    if (!registerData.address.pincode) {
      newErrors['address.pincode'] = 'Pincode is required';
    } else if (!/^\d{6}$/.test(registerData.address.pincode)) {
      newErrors['address.pincode'] = 'Please enter a valid 6-digit pincode';
    }

    setRegisterErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;

    setIsRegisterLoading(true);
    
    try {
      // ==================== BACKEND INTEGRATION - REGISTER ====================
      // TODO: Replace this with actual API call
      // Example:
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(registerData)
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration attempt:', registerData);
      
      // TODO: Handle successful registration
      // - Show success message
      // - Send verification email
      // - Optionally auto-login or redirect to login
      alert('Registration successful! Please check your email for verification.');
      
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        {/* Logo - Click to navigate back to home page */}
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center mb-4 cursor-pointer"
            onClick={() => {
              console.log('Login page logo clicked - navigating to home page');
              navigate('/');
            }}
          >
            <span className="bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-xl px-3 py-1 mr-3 text-xl shadow-lg">
              ✨
            </span>
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              LuxeCart
            </span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to LuxeCart</h1>
          <p className="text-gray-600">Sign in to your account or create a new one</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg">
            <div className="flex">
              <button
                onClick={() => setActiveTab('login')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === 'login'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FiLogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === 'register'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FiUserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {activeTab === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto"
            >
              {/* Login Form */}
              {loginErrors.general && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                >
                  {loginErrors.general}
                </motion.div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="login-email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                        loginErrors.email ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {loginErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {loginErrors.email}
                    </motion.p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      id="login-password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                        loginErrors.password ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showLoginPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {loginErrors.password}
                    </motion.p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="flex items-center justify-between">
                  <Link
                    to="/resetPassword"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoginLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isLoginLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isLoginLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                {/* Create Account Option */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-center"
                >
                  <p className="text-gray-600 mb-3">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2 transition-colors"
                    >
                      Create account
                    </button>
                  </p>
                </motion.div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
            >
              {/* Register Form */}
              {registerErrors.general && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                >
                  {registerErrors.general}
                </motion.div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FiUser className="mr-2" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={registerData.firstName}
                        onChange={handleRegisterChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                          registerErrors.firstName ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                        }`}
                        placeholder="Enter first name"
                      />
                      {registerErrors.firstName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {registerErrors.firstName}
                        </motion.p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                          registerErrors.lastName ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                        }`}
                        placeholder="Enter last name"
                      />
                      {registerErrors.lastName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {registerErrors.lastName}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="register-email"
                          name="email"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                            registerErrors.email ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                          }`}
                          placeholder="Enter your email"
                        />
                      </div>
                      {registerErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {registerErrors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label htmlFor="mobNo" className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="mobNo"
                          name="mobNo"
                          value={registerData.mobNo}
                          onChange={handleRegisterChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                            registerErrors.mobNo ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                          }`}
                          placeholder="Enter mobile number"
                        />
                      </div>
                      {registerErrors.mobNo && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {registerErrors.mobNo}
                        </motion.p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showRegisterPassword ? 'text' : 'password'}
                          id="register-password"
                          name="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                            registerErrors.password ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                          }`}
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showRegisterPassword ? (
                            <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {registerErrors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {registerErrors.password}
                        </motion.p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                            registerErrors.confirmPassword ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                          }`}
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {registerErrors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {registerErrors.confirmPassword}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FiMapPin className="mr-2" />
                    Address Information
                  </h2>
                  <div className="space-y-4">
                    {/* Address Line 1 */}
                    <div>
                      <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        id="addressLine1"
                        name="address.addressLine1"
                        value={registerData.address.addressLine1}
                        onChange={handleRegisterChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                          registerErrors['address.addressLine1'] ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                        }`}
                        placeholder="Enter address line 1"
                      />
                      {registerErrors['address.addressLine1'] && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {registerErrors['address.addressLine1']}
                        </motion.p>
                      )}
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        id="addressLine2"
                        name="address.addressLine2"
                        value={registerData.address.addressLine2}
                        onChange={handleRegisterChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        placeholder="Enter address line 2 (optional)"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* City */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="address.city"
                          value={registerData.address.city}
                          onChange={handleRegisterChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                            registerErrors['address.city'] ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                          }`}
                          placeholder="Enter city"
                        />
                        {registerErrors['address.city'] && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-600"
                          >
                            {registerErrors['address.city']}
                          </motion.p>
                        )}
                      </div>

                      {/* State */}
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="address.state"
                          value={registerData.address.state}
                          onChange={handleRegisterChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                            registerErrors['address.state'] ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                          }`}
                          placeholder="Enter state"
                        />
                        {registerErrors['address.state'] && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-600"
                          >
                            {registerErrors['address.state']}
                          </motion.p>
                        )}
                      </div>

                      {/* Pincode */}
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="address.pincode"
                          value={registerData.address.pincode}
                          onChange={handleRegisterChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                            registerErrors['address.pincode'] ? 'border-red-300 focus:ring-red-400' : 'border-gray-300'
                          }`}
                          placeholder="Enter pincode"
                        />
                        {registerErrors['address.pincode'] && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-600"
                          >
                            {registerErrors['address.pincode']}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isRegisterLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isRegisterLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isRegisterLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                {/* Login Option */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-center"
                >
                  <p className="text-gray-600 mb-3">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2 transition-colors"
                    >
                      Login here
                    </button>
                  </p>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Login;
