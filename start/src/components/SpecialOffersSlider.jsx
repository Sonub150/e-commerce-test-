import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiHeart, FiStar, FiShoppingCart, FiEye, FiGift, FiClock, FiZap } from 'react-icons/fi';

const SpecialOffersSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const specialOffers = [
    {
      id: 1,
      name: "Premium Wireless Earbuds",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      price: 59.99,
      originalPrice: 149.99,
      discount: 60,
      rating: 4.9,
      reviews: 234,
      category: "Electronics",
      badge: "Flash Sale",
      timeLeft: "2h 15m",
      sold: 89,
      total: 100
    },
    {
      id: 2,
      name: "Designer Sunglasses Collection",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      price: 79.99,
      originalPrice: 199.99,
      discount: 60,
      rating: 4.8,
      reviews: 156,
      category: "Fashion",
      badge: "Limited Time",
      timeLeft: "4h 30m",
      sold: 67,
      total: 80
    },
    {
      id: 3,
      name: "Smart Home Security Camera",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      price: 89.99,
      originalPrice: 179.99,
      discount: 50,
      rating: 4.7,
      reviews: 189,
      category: "Electronics",
      badge: "Hot Deal",
      timeLeft: "6h 45m",
      sold: 123,
      total: 150
    },
    {
      id: 4,
      name: "Organic Skincare Set",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      price: 34.99,
      originalPrice: 89.99,
      discount: 61,
      rating: 4.9,
      reviews: 278,
      category: "Beauty",
      badge: "Best Seller",
      timeLeft: "8h 20m",
      sold: 234,
      total: 300
    },
    {
      id: 5,
      name: "Premium Coffee Maker",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop",
      price: 129.99,
      originalPrice: 299.99,
      discount: 57,
      rating: 4.8,
      reviews: 145,
      category: "Home",
      badge: "Flash Sale",
      timeLeft: "3h 10m",
      sold: 45,
      total: 60
    },
    {
      id: 6,
      name: "Fitness Tracker Smartwatch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      price: 149.99,
      originalPrice: 349.99,
      discount: 57,
      rating: 4.9,
      reviews: 312,
      category: "Electronics",
      badge: "Limited Stock",
      timeLeft: "5h 55m",
      sold: 178,
      total: 200
    },
    {
      id: 7,
      name: "Luxury Perfume Set",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      price: 69.99,
      originalPrice: 159.99,
      discount: 56,
      rating: 4.8,
      reviews: 167,
      category: "Beauty",
      badge: "Exclusive",
      timeLeft: "7h 25m",
      sold: 89,
      total: 120
    },
    {
      id: 8,
      name: "Portable Bluetooth Speaker",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      price: 39.99,
      originalPrice: 99.99,
      discount: 60,
      rating: 4.7,
      reviews: 198,
      category: "Electronics",
      badge: "Flash Sale",
      timeLeft: "1h 40m",
      sold: 156,
      total: 180
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(specialOffers.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(specialOffers.length / 4)) % Math.ceil(specialOffers.length / 4));
  };

  const addToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
    // Add to cart functionality
  };

  const addToWishlist = (productId) => {
    console.log(`Added product ${productId} to wishlist`);
    // Add to wishlist functionality
  };

  const quickView = (productId) => {
    console.log(`Quick view product ${productId}`);
    // Quick view functionality
  };

  // Auto-scroll every 4 seconds (faster for flash sales)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const visibleProducts = specialOffers.slice(currentIndex * 4, (currentIndex * 4) + 4);

  return (
    <div className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-yellow-400/20 to-red-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 animate-pulse"
          >
            <FiZap className="w-4 h-4" />
            <span>Flash Sales & Deals</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Special Offers
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Limited time deals with massive discounts - don't miss out!
          </motion.p>
        </div>

        {/* Products Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 z-10 bg-white/90 backdrop-blur-md hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl border border-gray-200/50 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 z-10 bg-white/90 backdrop-blur-md hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl border border-gray-200/50 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
            <AnimatePresence mode="wait">
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative">
                    {/* Flash Sale Badge */}
                    <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      {product.badge}
                    </div>

                    {/* Timer */}
                    <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <FiClock className="w-3 h-3" />
                      {product.timeLeft}
                    </div>

                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Overlay with Actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToWishlist(product.id);
                            }}
                            className="bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                          >
                            <FiHeart className="w-5 h-5" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              quickView(product.id);
                            }}
                            className="bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-500 transition-all duration-300"
                          >
                            <FiEye className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Category Tag */}
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </div>

                      {/* Progress Bar */}
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                        {product.sold}/{product.total} sold
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(product.sold / product.total) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-400 w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-red-600">${product.price}</span>
                        <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">
                          -{product.discount}%
                        </span>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                      >
                        <FiShoppingCart className="w-5 h-5" />
                        Buy Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(specialOffers.length / 4) }).map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 scale-125 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:shadow-2xl hover:shadow-red-500/25 flex items-center gap-3 mx-auto"
          >
            <FiGift className="w-6 h-6" />
            View All Special Offers
            <FiArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default SpecialOffersSlider; 