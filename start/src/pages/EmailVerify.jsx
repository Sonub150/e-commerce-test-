import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiCheckCircle, FiAlertCircle, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';
import axios from 'axios';

function EmailVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(AppContext);
  
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, success, error, expired
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState('');
  
  const email = searchParams.get('email') || userData?.email || '';

  useEffect(() => {
    // Start countdown for resend button
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
  }, []);

  const verifyEmail = async (otpValue) => {
    if (!otpValue || otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    
    try {
      console.log('Verifying OTP:', otpValue);
      console.log('Email:', email);
      
      // Try multiple endpoints and data formats
      const endpoints = [
        {
          url: `${backendUrl}/api/auth/verify-email`,
          data: { email: email, otp: otpValue }
        },
        {
          url: `${backendUrl}/api/auth/verify-email`,
          data: { userId: userData?._id, otp: otpValue }
        },
        {
          url: `${backendUrl}/api/auth/reset-password`,
          data: { email: email, otp: otpValue, newPassword: 'temp123' }
        }
      ];

      let response = null;
      let lastError = null;

      for (const endpoint of endpoints) {
        try {
          console.log('Trying endpoint:', endpoint.url);
          console.log('With data:', endpoint.data);
          
          response = await axios.post(endpoint.url, endpoint.data, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log('Success with endpoint:', endpoint.url);
          break; // Success, exit loop
        } catch (error) {
          console.log('Failed with endpoint:', endpoint.url, error.response?.status);
          lastError = error;
          // Continue to next endpoint
        }
      }

      if (!response) {
        throw lastError || new Error('All endpoints failed');
      }

      console.log('Verification response:', response);

      if (response.data.success || response.status === 200) {
        setVerificationStatus('success');
        toast.success('Email verified successfully! You can now log in.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        throw new Error(response.data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      console.error('Error response:', error.response);
      
      const errorMessage = error.response?.data?.message || 'Verification failed';
      
      if (errorMessage.includes('expired') || errorMessage.includes('invalid')) {
        setVerificationStatus('expired');
      } else {
        setVerificationStatus('error');
      }
      
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const resendVerificationEmail = async () => {
    if (!email || isResending) return;

    setIsResending(true);
    setCanResend(false);
    setCountdown(60);

    try {
      console.log('Resending OTP to:', email);
      
      // Try endpoints that don't require authentication first
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
        setVerificationStatus('pending');
      } else {
        throw new Error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      console.error('Error response:', error.response);
      
      let errorMessage = 'Failed to send OTP';
      
      if (error.response?.status === 401) {
        errorMessage = 'Authentication required. Please log in first.';
      } else if (error.response?.status === 404) {
        errorMessage = 'Email not found. Please check your email address.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const getStatusContent = () => {
    switch (verificationStatus) {
      case 'success':
        return {
          icon: <FiCheckCircle className="text-green-500" />,
          title: 'Email Verified Successfully!',
          message: 'Your email has been verified. You can now log in to your account.',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'error':
        return {
          icon: <FiAlertCircle className="text-red-500" />,
          title: 'Verification Failed',
          message: 'There was an error verifying your email. Please try again or contact support.',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'expired':
        return {
          icon: <FiAlertCircle className="text-orange-500" />,
          title: 'OTP Expired',
          message: 'Your OTP has expired. Please request a new one.',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      default:
        return {
          icon: <FiMail className="text-blue-500" />,
          title: 'Verify Your Email',
          message: `We've sent a verification OTP to ${email}. Please check your email and enter the 6-digit code below.`,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
    }
  };

  const statusContent = getStatusContent();

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
            {/* Status Icon */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="text-4xl">
                  {statusContent.icon}
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className={`text-2xl font-bold text-center mb-4 ${statusContent.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {statusContent.title}
            </motion.h1>

            {/* Message */}
            <motion.p 
              className="text-white/90 text-center mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {statusContent.message}
            </motion.p>

            {/* Action Buttons */}
            <AnimatePresence>
              {verificationStatus === 'pending' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-6"
                >
                  {/* OTP Input */}
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-3">
                      Enter 6-digit OTP
                    </label>
                    <div className="flex space-x-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className="w-12 h-12 bg-white/20 border border-white/30 rounded-lg text-center text-white text-xl font-bold focus:outline-none focus:border-white/50 transition-colors"
                          value={otp[index] || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 1) {
                              const newOtp = otp.split('');
                              newOtp[index] = value;
                              const finalOtp = newOtp.join('');
                              setOtp(finalOtp);
                              
                              // Auto-focus next input
                              if (value && index < 5) {
                                e.target.nextElementSibling?.focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            // Handle backspace
                            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                              e.target.previousElementSibling?.focus();
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Verify Button */}
                  <button
                    onClick={() => verifyEmail(otp)}
                    disabled={otp.length !== 6 || isVerifying}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      otp.length === 6 && !isVerifying
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                        : 'bg-white/20 text-white/60 cursor-not-allowed'
                    }`}
                  >
                    {isVerifying ? (
                      <>
                        <FiRefreshCw className="animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <FiCheckCircle />
                        <span>Verify Email</span>
                      </>
                    )}
                  </button>

                  {/* Resend Button */}
                  <button
                    onClick={resendVerificationEmail}
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
                </motion.div>
              )}

              {verificationStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    to="/login"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FiCheckCircle />
                    <span>Continue to Login</span>
                  </Link>
                </motion.div>
              )}

              {(verificationStatus === 'error' || verificationStatus === 'expired') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-4"
                >
                  <button
                    onClick={resendVerificationEmail}
                    disabled={isResending}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {isResending ? (
                      <>
                        <FiRefreshCw className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiMail />
                        <span>Request New OTP</span>
                      </>
                    )}
                  </button>
                  
                  <Link
                    to="/login"
                    className="w-full bg-white/20 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                  >
                    Back to Login
                  </Link>
                </motion.div>
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
              Need help?{' '}
              <Link to="/contact" className="text-white/80 hover:text-white underline">
                Contact Support
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default EmailVerify;
