import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiTag, FiArrowRight, FiEye, FiGift, FiX, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { couponsAPI } from "../services/api";

const Cart = () => {
  const { cart, removeFromCart, updateCartItem, clearCart } = useCart();
  const [loadingId, setLoadingId] = useState(null);
  const [clearing, setClearing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cart && cart.cartItems
    ? cart.cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0)
    : 0;

  // Calculate discount amount
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;

  // Calculate tax (8% of subtotal)
  const tax = subtotal * 0.08;

  // Calculate total after discount and tax
  const total = subtotal - discountAmount + tax;

  const handleIncrease = async (item) => {
    setLoadingId(item.productId._id);
    await updateCartItem(item.productId._id, item.quantity + 1);
    setLoadingId(null);
  };

  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      setLoadingId(item.productId._id);
      await updateCartItem(item.productId._id, item.quantity - 1);
      setLoadingId(null);
    }
  };

  const handleClearCart = async () => {
    setClearing(true);
    await clearCart();
    setClearing(false);
  };

  // Handle coupon application
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setCouponLoading(true);
    setCouponError("");
    setCouponSuccess("");

    try {
      const response = await couponsAPI.validate(couponCode, subtotal);
      
      if (response.data.valid) {
        setAppliedCoupon({
          code: couponCode,
          discountAmount: response.data.discountAmount,
          coupon: response.data.coupon
        });
        setCouponSuccess(`Coupon applied! You saved $${response.data.discountAmount.toFixed(2)}`);
        setCouponCode("");
        setTimeout(() => setCouponSuccess(""), 3000);
      } else {
        setCouponError(response.data.message || "Invalid coupon code");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setCouponError(error.response?.data?.message || "Failed to apply coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    setCouponSuccess("");
  };

  // Navigate to product category
  const navigateToProductCategory = (category) => {
    const categoryMap = {
      'Fashion': 'Fashion',
      'Electronics': 'Electronics',
      'Smartphones': 'Smartphones',
      'Laptops': 'Laptops',
      'Footwear': 'Footwear',
      'Home Appliances': 'Home Appliances',
      'Sports': 'Sports',
      'Beauty & Fashion': 'Beauty & Fashion'
    };
    
    const mappedCategory = categoryMap[category] || category;
    navigate(`/category/${mappedCategory}`);
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <FiShoppingBag className="text-indigo-600" />
              Your Shopping Cart
            </h2>
            {cart?.cartItems?.length > 0 && (
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                {cart.cartItems.length} {cart.cartItems.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          
          {(!cart || !cart.cartItems || cart.cartItems.length === 0) ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-100"
            >
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-200 to-pink-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <FiShoppingBag className="text-indigo-400 text-3xl" />
              </div>
              <p className="text-2xl font-bold text-gray-700 mb-2">Your cart is feeling lonely</p>
              <p className="text-lg text-gray-500 mb-6">Add some products to make it happy!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/" 
                  className="inline-block bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Continue Shopping
                </Link>
                <Link 
                  to="/category/Fashion" 
                  className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Browse Fashion
                </Link>
              </div>
            </motion.div>
          ) : (
            <ul className="space-y-4">
              <AnimatePresence>
                {cart.cartItems.map(item => (
                  <motion.li 
                    key={item.productId._id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                        <img 
                          src={item.productId.images?.[0]?.url} 
                          alt={item.productId.name} 
                          className="w-full h-full object-cover rounded-lg border-2 border-indigo-100 shadow-sm"
                        />
                        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm">
                          <button
                            onClick={() => removeFromCart(item.productId._id)}
                            className="text-gray-500 hover:text-red-500 transition-colors p-1"
                            title="Remove"
                            disabled={loadingId === item.productId._id}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/category/${item.productId.category}`}
                            className="font-semibold text-lg text-indigo-700 hover:underline mb-1 line-clamp-2 block transition-colors duration-200"
                          >
                            {item.productId.name}
                          </Link>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                              <FiTag className="inline-block" /> {item.productId.brand}
                            </span>
                            <span className="bg-pink-50 text-pink-600 text-xs font-medium px-2 py-1 rounded-full">
                              {item.productId.category}
                            </span>
                          </div>
                          <p className="text-indigo-600 font-medium text-base mb-3">
                            ${item.productId.price.toFixed(2)}
                          </p>
                          {/* Navigation to product category */}
                          <button
                            onClick={() => navigateToProductCategory(item.productId.category)}
                            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
                          >
                            <FiEye size={14} />
                            View More {item.productId.category} Products
                            <FiArrowRight size={12} />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1">
                            <button
                              onClick={() => handleDecrease(item)}
                              className={`text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                              disabled={item.quantity === 1 || loadingId === item.productId._id}
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="font-semibold text-gray-800 w-6 text-center">
                              {loadingId === item.productId._id ? (
                                <span className="inline-block w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <button
                              onClick={() => handleIncrease(item)}
                              className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                              disabled={loadingId === item.productId._id}
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>
                          <div className="font-bold text-lg text-gray-900 w-20 text-right">
                            ${(item.productId.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
        
        {/* Order Summary */}
        {cart?.cartItems?.length > 0 && (
          <div className="w-full lg:w-96">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-indigo-50 via-pink-50 to-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900 pb-2 border-b border-gray-100">
                Order Summary
              </h3>
              
              {/* Coupon Section */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <div className="flex items-center gap-2 mb-3">
                  <FiGift className="text-purple-600" />
                  <h4 className="font-semibold text-gray-900">Have a Coupon?</h4>
                </div>
                
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        disabled={couponLoading}
                      />
                      <button
                        type="submit"
                        disabled={couponLoading || !couponCode.trim()}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {couponLoading ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Applying...
                          </>
                        ) : (
                          <>
                            <FiCheck className="w-4 h-4" />
                            Apply
                          </>
                        )}
                      </button>
                    </div>
                    
                    {couponError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-200"
                      >
                        {couponError}
                      </motion.div>
                    )}
                    
                    {couponSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-600 text-sm bg-green-50 p-2 rounded-lg border border-green-200"
                      >
                        {couponSuccess}
                      </motion.div>
                    )}
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-lg p-3 border border-green-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FiCheck className="text-green-600 w-4 h-4" />
                        <span className="font-mono text-sm font-medium text-gray-900">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-green-600 text-sm font-medium">
                          -${appliedCoupon.discountAmount.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove coupon"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {appliedCoupon.coupon.discountType === 'percentage' 
                        ? `${appliedCoupon.coupon.discountValue}% off`
                        : `$${appliedCoupon.coupon.discountValue} off`
                      }
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-indigo-600">${total.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="text-sm text-green-600 mt-1 text-right">
                      You saved ${discountAmount.toFixed(2)}!
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                  Proceed to Checkout
                </button>
                <button
                  onClick={handleClearCart}
                  disabled={clearing}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                >
                  {clearing ? 'Clearing...' : 'Clear Cart'}
                </button>
              </div>
              
              {/* Continue Shopping Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Continue Shopping</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    to="/category/Fashion"
                    className="text-xs bg-pink-50 text-pink-700 px-3 py-2 rounded-lg hover:bg-pink-100 transition-colors text-center"
                  >
                    Fashion
                  </Link>
                  <Link 
                    to="/category/Electronics"
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-center"
                  >
                    Electronics
                  </Link>
                  <Link 
                    to="/category/Footwear"
                    className="text-xs bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors text-center"
                  >
                    Shoes
                  </Link>
                  <Link 
                    to="/category/Home Appliances"
                    className="text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors text-center"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;