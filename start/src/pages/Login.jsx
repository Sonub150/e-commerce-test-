import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiMapPin, FiArrowRight, FiLogIn, FiUserPlus, FiShield, FiCheckCircle, FiAlertCircle, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl, setisLoggedIn, setUserData } = useContext(AppContext);

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

  // Forgot password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

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
      const loginPayload = {
        email: loginData.email,
        password: loginData.password
      };

      console.log('Backend URL:', backendUrl);
      console.log('Login data:', loginPayload);

      // Try different possible endpoints
      let response;
      let endpoint = '';
      
      try {
        // Try the original endpoint first
        endpoint = `${backendUrl}/api/auth/login`;
        console.log('Trying login endpoint:', endpoint);
        response = await axios.post(endpoint, loginPayload, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (firstError) {
        console.log('First login endpoint failed, trying alternatives...');
        
        // Try alternative endpoints
        const alternativeEndpoints = [
          `${backendUrl}/auth/login`,
          `${backendUrl}/api/login`,
          `${backendUrl}/login`,
          `${backendUrl}/user/login`
        ];
        
        for (const altEndpoint of alternativeEndpoints) {
          try {
            console.log('Trying alternative login endpoint:', altEndpoint);
            response = await axios.post(altEndpoint, loginPayload, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            });
            endpoint = altEndpoint;
            break;
          } catch (altError) {
            console.log(`Login endpoint ${altEndpoint} failed:`, altError.message);
            continue;
          }
        }
        
        if (!response) {
          throw firstError; // Throw the original error if all alternatives fail
        }
      }

      console.log('Successful login response:', response);
      console.log('Used login endpoint:', endpoint);

      // Handle different response structures
      const isSuccess = response.data.success || 
                       response.data.status === 'success' || 
                       response.status === 200;

      if (isSuccess) {
        setisLoggedIn(true);
        
        // Store user data if available
        if (response.data.user) {
          setUserData(response.data.user);
        } else if (response.data.data) {
          setUserData(response.data.data);
        }
        
        navigate('/');
        toast.success('Login successful!');
      } else {
        throw new Error(response.data.message || response.data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      
      // Provide more specific error messages
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Invalid email or password.';
        } else if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Invalid login data.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      setLoginErrors({ general: errorMessage });
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail || !/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      setForgotPasswordMessage('Please enter a valid email address.');
      return;
    }

    setIsForgotPasswordLoading(true);
    setForgotPasswordMessage('');

    try {
      const forgotPasswordPayload = {
        email: forgotPasswordEmail
      };

      console.log('Backend URL:', backendUrl);
      console.log('Forgot password data:', forgotPasswordPayload);

      // Try the correct endpoint first
      let response;
      let endpoint = '';
      
      try {
        // Try the correct endpoint first
        endpoint = `${backendUrl}/api/auth/send-reset-otp`;
        console.log('Trying forgot password endpoint:', endpoint);
        response = await axios.post(endpoint, forgotPasswordPayload, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (firstError) {
        console.log('First forgot password endpoint failed, trying alternatives...');
        
        // Try alternative endpoints
        const alternativeEndpoints = [
          `${backendUrl}/api/auth/forgot-password`,
          `${backendUrl}/api/auth/send-otp`,
          `${backendUrl}/auth/forgot-password`,
          `${backendUrl}/api/forgot-password`
        ];
        
        for (const altEndpoint of alternativeEndpoints) {
          try {
            console.log('Trying alternative forgot password endpoint:', altEndpoint);
            response = await axios.post(altEndpoint, forgotPasswordPayload, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            });
            endpoint = altEndpoint;
            break;
          } catch (altError) {
            console.log(`Forgot password endpoint ${altEndpoint} failed:`, altError.message);
            continue;
          }
        }
        
        if (!response) {
          throw firstError; // Throw the original error if all alternatives fail
        }
      }

      console.log('Successful forgot password response:', response);
      console.log('Used forgot password endpoint:', endpoint);

      // Handle different response structures
      const isSuccess = response.data.success || 
                       response.data.status === 'success' || 
                       response.status === 200;

      if (isSuccess) {
        setForgotPasswordMessage('Password reset OTP sent to your email!');
        
        // Redirect to reset password page with email
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotPasswordMessage('');
          // Navigate to reset password page with email as query parameter
          navigate(`/reset-password?email=${encodeURIComponent(forgotPasswordEmail)}`);
        }, 2000);
      } else {
        throw new Error(response.data.message || response.data.error || 'Failed to send reset OTP');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send reset OTP. Please try again.';
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Email not found. Please check your email address.';
        } else if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Invalid email address.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setForgotPasswordMessage(errorMessage);
    } finally {
      setIsForgotPasswordLoading(false);
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
      // Prepare registration data - simplified structure
      const registrationData = {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        mobNo: registerData.mobNo, // Changed back to mobNo to match schema
        password: registerData.password,
        address: {
          addressLine1: registerData.address.addressLine1,
          addressLine2: registerData.address.addressLine2 || "", // Default empty string
          city: registerData.address.city,
          state: registerData.address.state,
          pincode: registerData.address.pincode
        }
      };

      console.log('Backend URL:', backendUrl);
      console.log('Registration data:', registrationData);
      console.log('Registration data JSON:', JSON.stringify(registrationData, null, 2));

      // Try different possible endpoints
      let response;
      let endpoint = '';
      
      try {
        // Try the original endpoint first
        endpoint = `${backendUrl}/api/auth/register`;
        console.log('Trying endpoint:', endpoint);
        console.log('Request headers:', {
          'Content-Type': 'application/json',
          'withCredentials': true
        });
        
        response = await axios.post(endpoint, registrationData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Raw response:', response);
        console.log('Response data:', response.data);
        console.log('Response status:', response.status);
      } catch (firstError) {
        console.log('First endpoint failed, trying alternatives...');
        
        // Try alternative endpoints
        const alternativeEndpoints = [
          `${backendUrl}/auth/register`,
          `${backendUrl}/api/register`,
          `${backendUrl}/register`,
          `${backendUrl}/user/register`
        ];
        
        for (const altEndpoint of alternativeEndpoints) {
          try {
            console.log('Trying alternative endpoint:', altEndpoint);
            response = await axios.post(altEndpoint, registrationData, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            });
            endpoint = altEndpoint;
            break;
          } catch (altError) {
            console.log(`Endpoint ${altEndpoint} failed:`, altError.message);
            continue;
          }
        }
        
        if (!response) {
          throw firstError; // Throw the original error if all alternatives fail
        }
      }

      console.log('Successful registration response:', response);
      console.log('Used endpoint:', endpoint);

      // Handle different response structures
      const isSuccess = response.data.success || 
                       response.data.status === 'success' || 
                       response.status === 200 || 
                       response.status === 201;

      if (isSuccess) {
        // Store user data in context for email verification
        setUserData({
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email
        });
        
        // Redirect to email verification page
        navigate(`/email-verify?email=${encodeURIComponent(registerData.email)}`);
        toast.success('Registration successful! Please check your email for verification.');
      } else {
        throw new Error(response.data.message || response.data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Error response headers:', error.response?.headers);
      
      // Provide more specific error messages
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = 'User with this email already exists.';
        } else if (error.response.status === 400) {
          errorMessage = error.response.data.message || error.response.data.error || 'Invalid registration data.';
          console.error('400 Bad Request details:', error.response.data);
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      setRegisterErrors({ general: errorMessage });
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 blur-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl">
              <FiShield className="text-white text-3xl" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-blue-100 text-lg max-w-md mx-auto">
              Sign in to your account or create a new one to get started
            </p>
          </motion.div>

          {/* Main Form Container */}
          <motion.div 
            className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Tab Navigation */}
            <div className="flex mb-8 bg-white/10 rounded-2xl p-1 backdrop-blur-sm">
              <motion.button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 relative ${
                  activeTab === 'login'
                    ? 'text-white'
                    : 'text-blue-200 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === 'login' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center">
                  <FiLogIn className="mr-2" />
                  Sign In
                </span>
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 relative ${
                  activeTab === 'register'
                    ? 'text-white'
                    : 'text-blue-200 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === 'register' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center">
                  <FiUserPlus className="mr-2" />
                  Sign Up
                </span>
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'login' && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleLoginSubmit} className="space-y-6">
                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-semibold text-white mb-3">
                        Email Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative">
                          <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300" />
                          <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                              loginErrors.email ? 'border-red-400 ring-red-400' : ''
                            }`}
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                      {loginErrors.email && (
                        <motion.p 
                          className="mt-2 text-sm text-red-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {loginErrors.email}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-semibold text-white mb-3">
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative">
                          <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" />
                          <input
                            type={showLoginPassword ? 'text' : 'password'}
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            className={`w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                              loginErrors.password ? 'border-red-400 ring-red-400' : ''
                            }`}
                            placeholder="Enter your password"
                          />
                          <motion.button
                            type="button"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {showLoginPassword ? <FiEyeOff /> : <FiEye />}
                          </motion.button>
                        </div>
                      </div>
                      {loginErrors.password && (
                        <motion.p 
                          className="mt-2 text-sm text-red-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {loginErrors.password}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Forgot Password Link */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
                      >
                        Forgot your password?
                      </button>
                    </div>

                    {/* General Error */}
                    {loginErrors.general && (
                      <motion.div 
                        className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <p className="text-sm text-red-300">{loginErrors.general}</p>
                      </motion.div>
                    )}

                    {/* Verify Email Link */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => navigate('/email-verify')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
                      >
                        Need to verify your email?
                      </button>
                    </div>

                    {/* Login Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoginLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-400/30 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isLoginLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoginLoading ? 1 : 0.98 }}
                    >
                      {isLoginLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Signing In...
                        </div>
                      ) : (
                        'Sign In'
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'register' && (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleRegisterSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div>
                        <label className="block text-sm font-semibold text-white mb-3">
                          First Name
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                          <div className="relative">
                            <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-300" />
                            <input
                              type="text"
                              name="firstName"
                              value={registerData.firstName}
                              onChange={handleRegisterChange}
                              className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 ${
                                registerErrors.firstName ? 'border-red-400 ring-red-400' : ''
                              }`}
                              placeholder="First name"
                            />
                          </div>
                        </div>
                        {registerErrors.firstName && (
                          <motion.p 
                            className="mt-2 text-sm text-red-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {registerErrors.firstName}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-3">
                          Last Name
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                          <div className="relative">
                            <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300" />
                            <input
                              type="text"
                              name="lastName"
                              value={registerData.lastName}
                              onChange={handleRegisterChange}
                              className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                                registerErrors.lastName ? 'border-red-400 ring-red-400' : ''
                              }`}
                              placeholder="Last name"
                            />
                          </div>
                        </div>
                        {registerErrors.lastName && (
                          <motion.p 
                            className="mt-2 text-sm text-red-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {registerErrors.lastName}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div>
                        <label className="block text-sm font-semibold text-white mb-3">
                          Email Address
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                          <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" />
                            <input
                              type="email"
                              name="email"
                              value={registerData.email}
                              onChange={handleRegisterChange}
                              className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                                registerErrors.email ? 'border-red-400 ring-red-400' : ''
                              }`}
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                        {registerErrors.email && (
                          <motion.p 
                            className="mt-2 text-sm text-red-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {registerErrors.email}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-3">
                          Mobile Number
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                          <div className="relative">
                            <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-300" />
                            <input
                              type="tel"
                              name="mobNo"
                              value={registerData.mobNo}
                              onChange={handleRegisterChange}
                              className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 ${
                                registerErrors.mobNo ? 'border-red-400 ring-red-400' : ''
                              }`}
                              placeholder="10-digit mobile number"
                            />
                          </div>
                        </div>
                        {registerErrors.mobNo && (
                          <motion.p 
                            className="mt-2 text-sm text-red-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {registerErrors.mobNo}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div>
                        <label className="block text-sm font-semibold text-white mb-3">
                          Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                          <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300" />
                            <input
                              type={showRegisterPassword ? 'text' : 'password'}
                              name="password"
                              value={registerData.password}
                              onChange={handleRegisterChange}
                              className={`w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 ${
                                registerErrors.password ? 'border-red-400 ring-red-400' : ''
                              }`}
                              placeholder="Create a password"
                            />
                            <motion.button
                              type="button"
                              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-white transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {showRegisterPassword ? <FiEyeOff /> : <FiEye />}
                            </motion.button>
                          </div>
                        </div>
                        {registerErrors.password && (
                          <motion.p 
                            className="mt-2 text-sm text-red-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {registerErrors.password}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-3">
                          Confirm Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                          <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-300" />
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={registerData.confirmPassword}
                              onChange={handleRegisterChange}
                              className={`w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 ${
                                registerErrors.confirmPassword ? 'border-red-400 ring-red-400' : ''
                              }`}
                              placeholder="Confirm your password"
                            />
                            <motion.button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-300 hover:text-white transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </motion.button>
                          </div>
                        </div>
                        {registerErrors.confirmPassword && (
                          <motion.p 
                            className="mt-2 text-sm text-red-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {registerErrors.confirmPassword}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    {/* Address Section */}
                    <motion.div 
                      className="border-t border-white/20 pt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <FiMapPin className="mr-2 text-blue-300" />
                        Address Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-white mb-3">
                            Address Line 1
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative">
                              <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-300" />
                              <input
                                type="text"
                                name="address.addressLine1"
                                value={registerData.address.addressLine1}
                                onChange={handleRegisterChange}
                                className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 ${
                                  registerErrors['address.addressLine1'] ? 'border-red-400 ring-red-400' : ''
                                }`}
                                placeholder="Street address, P.O. box"
                              />
                            </div>
                          </div>
                          {registerErrors['address.addressLine1'] && (
                            <motion.p 
                              className="mt-2 text-sm text-red-300"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              {registerErrors['address.addressLine1']}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white mb-3">
                            Address Line 2 (Optional)
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative">
                              <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
                              <input
                                type="text"
                                name="address.addressLine2"
                                value={registerData.address.addressLine2}
                                onChange={handleRegisterChange}
                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                placeholder="Apartment, suite, unit, etc."
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-white mb-3">
                              City
                            </label>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="address.city"
                                  value={registerData.address.city}
                                  onChange={handleRegisterChange}
                                  className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 ${
                                    registerErrors['address.city'] ? 'border-red-400 ring-red-400' : ''
                                  }`}
                                  placeholder="City"
                                />
                              </div>
                            </div>
                            {registerErrors['address.city'] && (
                              <motion.p 
                                className="mt-2 text-sm text-red-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                {registerErrors['address.city']}
                              </motion.p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-white mb-3">
                              State
                            </label>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="address.state"
                                  value={registerData.address.state}
                                  onChange={handleRegisterChange}
                                  className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                                    registerErrors['address.state'] ? 'border-red-400 ring-red-400' : ''
                                  }`}
                                  placeholder="State"
                                />
                              </div>
                            </div>
                            {registerErrors['address.state'] && (
                              <motion.p 
                                className="mt-2 text-sm text-red-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                {registerErrors['address.state']}
                              </motion.p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-white mb-3">
                              Pincode
                            </label>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="address.pincode"
                                  value={registerData.address.pincode}
                                  onChange={handleRegisterChange}
                                  className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                                    registerErrors['address.pincode'] ? 'border-red-400 ring-red-400' : ''
                                  }`}
                                  placeholder="6-digit pincode"
                                />
                              </div>
                            </div>
                            {registerErrors['address.pincode'] && (
                              <motion.p 
                                className="mt-2 text-sm text-red-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                {registerErrors['address.pincode']}
                              </motion.p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* General Error */}
                    {registerErrors.general && (
                      <motion.div 
                        className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <p className="text-sm text-red-300">{registerErrors.general}</p>
                      </motion.div>
                    )}

                    {/* Verify Email Link */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => navigate('/email-verify')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
                      >
                        Need to verify your email?
                      </button>
                    </div>

                    {/* Register Button */}
                    <motion.button
                      type="submit"
                      disabled={isRegisterLoading}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isRegisterLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isRegisterLoading ? 1 : 0.98 }}
                    >
                      {isRegisterLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Creating Account...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="text-center text-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-white hover:text-blue-300 underline transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-white hover:text-blue-300 underline transition-colors">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForgotPassword(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h3>
                <p className="text-gray-600">Enter your email to receive a password reset link</p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="forgot-email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {forgotPasswordMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    forgotPasswordMessage.includes('sent') 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {forgotPasswordMessage}
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotPasswordLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isForgotPasswordLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;