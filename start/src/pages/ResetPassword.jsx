import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff, FiMail, FiCheckCircle, FiAlertCircle, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';
import axios from 'axios';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  
  const [step, setStep] = useState('request'); // request, otp, reset
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Request step state
  const [email, setEmail] = useState('');
  
  // OTP step state
  const [otp, setOtp] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // Reset step state
  const [resetData, setResetData] = useState({
    password: '',
    confirmPassword: ''
  });

  // Check for email in URL parameters on component mount
  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
      setStep('otp'); // Automatically go to OTP step if email is provided
      setCanResend(false);
      setCountdown(60);
      // Show success message that OTP was sent
      toast.success('OTP sent successfully! Please check your email.');
    }
  }, [searchParams]);

  useEffect(() => {
    // Start countdown for resend button when in OTP step
    if (step === 'otp') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step]);

  const validateRequestForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtpForm = () => {
    const newErrors = {};
    
    if (!otp || otp.length !== 6) {
      newErrors.otp = 'Please enter a valid 6-digit OTP';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetForm = () => {
    const newErrors = {};
    
    if (!resetData.password) {
      newErrors.password = 'Password is required';
    } else if (resetData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!resetData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (resetData.password !== resetData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    
    if (!validateRequestForm()) return;
    
    setIsLoading(true);
    
    try {
      console.log('Requesting password reset for:', email);
      console.log('Backend URL:', backendUrl);
      
      const requestData = { email: email };
      console.log('Request data:', requestData);
      
      // Try multiple endpoints in case one fails
      const endpoints = [
        `${backendUrl}/api/auth/send-reset-otp`,
        `${backendUrl}/api/auth/forgot-password`,
        `${backendUrl}/api/auth/send-otp`
      ];

      let response = null;
      let lastError = null;

      for (const endpoint of endpoints) {
        try {
          console.log('Trying endpoint:', endpoint);
          
          response = await axios.post(endpoint, requestData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log('Success with endpoint:', endpoint);
          break; // Success, exit loop
        } catch (error) {
          console.log('Failed with endpoint:', endpoint, error.response?.status);
          lastError = error;
          // Continue to next endpoint
        }
      }

      if (!response) {
        throw lastError || new Error('All endpoints failed');
      }

      console.log('Reset OTP response:', response);

      if (response.data.success || response.status === 200) {
        toast.success('Password reset OTP sent to your email!');
        setStep('otp');
        setCanResend(false);
        setCountdown(60);
      } else {
        throw new Error(response.data.message || 'Failed to send reset OTP');
      }
    } catch (error) {
      console.error('Request reset error:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      let errorMessage = 'Failed to send reset OTP. Please try again.';
      
      if (error.response?.status === 404) {
        errorMessage = 'Email not found. Please check your email address.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!validateOtpForm()) return;
    
    setIsLoading(true);
    
    try {
      console.log('Verifying OTP for password reset:', otp);
      console.log('Email:', email);
      
      // For password reset, we don't need to verify OTP separately
      // We'll verify it when setting the new password
      // Just move to the reset step
      setStep('reset');
      toast.success('OTP accepted! Please enter your new password.');
      
    } catch (error) {
      console.error('OTP verification error:', error);
      console.error('Error response:', error.response);
      
      let errorMessage = 'OTP verification failed. Please try again.';
      
      if (error.response?.status === 400) {
        errorMessage = 'Invalid OTP. Please check and try again.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validateResetForm()) return;
    
    setIsLoading(true);
    
    try {
      console.log('Resetting password for:', email);
      
      const response = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email: email,
        otp: otp,
        newPassword: resetData.password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Reset password response:', response);

      if (response.data.success || response.status === 200) {
        toast.success('Password reset successfully! You can now log in with your new password.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      console.error('Error response:', error.response);
      
      let errorMessage = 'Password reset failed. Please try again.';
      
      if (error.response?.status === 400) {
        errorMessage = 'Invalid OTP or email. Please check and try again.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!email || isResending) return;

    setIsResending(true);
    setCanResend(false);
    setCountdown(60);

    try {
      console.log('Resending OTP to:', email);
      
      // Try multiple endpoints in case one fails
      const endpoints = [
        `${backendUrl}/api/auth/send-reset-otp`,
        `${backendUrl}/api/auth/forgot-password`,
        `${backendUrl}/api/auth/send-otp`
      ];

      let response = null;
      let lastError = null;

      for (const endpoint of endpoints) {
        try {
          console.log('Trying endpoint:', endpoint);
          
          response = await axios.post(endpoint, {
            email: email
          }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log('Success with endpoint:', endpoint);
          break; // Success, exit loop
        } catch (error) {
          console.log('Failed with endpoint:', endpoint, error.response?.status);
          lastError = error;
          // Continue to next endpoint
        }
      }

      if (!response) {
        throw lastError || new Error('All endpoints failed');
      }

      console.log('Resend OTP response:', response);

      if (response.data.success || response.status === 200) {
        toast.success('OTP sent successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      console.error('Error response:', error.response);
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsResending(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'otp') {
      setOtp(value);
    } else {
      setResetData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 'request':
        return {
          title: 'Reset Your Password',
          subtitle: 'Enter your email address and we\'ll send you an OTP to reset your password.',
          icon: <FiMail className="text-blue-500" />
        };
      case 'otp':
        return {
          title: 'Enter OTP',
          subtitle: `We've sent a 6-digit OTP to ${email}. Please enter it below.`,
          icon: <FiCheckCircle className="text-green-500" />
        };
      case 'reset':
        return {
          title: 'Set New Password',
          subtitle: 'Enter your new password below.',
          icon: <FiLock className="text-purple-500" />
        };
      default:
        return {
          title: 'Reset Password',
          subtitle: 'Reset your password',
          icon: <FiLock className="text-blue-500" />
        };
    }
  };

  const stepContent = getStepContent();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
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
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Button */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/login"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Login
            </Link>
          </motion.div>

          {/* Main Card */}
          <motion.div 
            className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Icon */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="text-4xl">
                  {stepContent.icon}
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-2xl font-bold text-center mb-2 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {stepContent.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-white/80 text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {stepContent.subtitle}
            </motion.p>

            {/* Forms */}
            <AnimatePresence mode="wait">
              {step === 'request' && (
                <motion.form
                  key="request"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleRequestReset}
                  className="space-y-6"
                >
                  {/* Email Input */}
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className={`w-full bg-white/20 border ${
                          errors.email ? 'border-red-400' : 'border-white/30'
                        } rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <FiAlertCircle className="mr-1" />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <FiRefreshCw className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiMail />
                        <span>Send OTP</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {step === 'otp' && (
                <motion.form
                  key="otp"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleVerifyOtp}
                  className="space-y-6"
                >
                  {/* OTP Input */}
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      OTP
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="otp"
                        value={otp}
                        onChange={handleInputChange}
                        className={`w-full bg-white/20 border ${
                          errors.otp ? 'border-red-400' : 'border-white/30'
                        } rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors`}
                        placeholder="Enter 6-digit OTP"
                      />
                      {errors.otp && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <FiAlertCircle className="mr-1" />
                          {errors.otp}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <FiRefreshCw className="animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <FiCheckCircle />
                        <span>Verify OTP</span>
                      </>
                    )}
                  </button>

                  {/* Resend OTP Button */}
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={!canResend || isResending}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      canResend && !isResending
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                        : 'bg-white/20 text-white/60 cursor-not-allowed'
                    }`}
                  >
                    {isResending ? (
                      <>
                        <FiRefreshCw className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiMail />
                        <span>
                          {canResend ? 'Resend OTP' : `Resend in ${countdown}s`}
                        </span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {step === 'reset' && (
                <motion.form
                  key="reset"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleResetPassword}
                  className="space-y-6"
                >
                  {/* New Password Input */}
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={resetData.password}
                        onChange={handleInputChange}
                        className={`w-full bg-white/20 border ${
                          errors.password ? 'border-red-400' : 'border-white/30'
                        } rounded-xl px-4 py-3 pr-12 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors`}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <FiAlertCircle className="mr-1" />
                          {errors.password}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={resetData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full bg-white/20 border ${
                          errors.confirmPassword ? 'border-red-400' : 'border-white/30'
                        } rounded-xl px-4 py-3 pr-12 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors`}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <FiAlertCircle className="mr-1" />
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <FiRefreshCw className="animate-spin" />
                        <span>Resetting...</span>
                      </>
                    ) : (
                      <>
                        <FiLock />
                        <span>Reset Password</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Additional Help */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-white/60 text-sm">
              Remember your password?{' '}
              <Link to="/login" className="text-white/80 hover:text-white underline">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ResetPassword;
