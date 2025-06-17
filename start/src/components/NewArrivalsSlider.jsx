import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiHeart, FiStar, FiShoppingCart, FiEye, FiClock, FiTag } from 'react-icons/fi';

const NewArrivalsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const newArrivals = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      price: 89.99,
      originalPrice: 129.99,
      discount: 31,
      rating: 4.8,
      reviews: 124,
      isNew: true,
      category: "Electronics",
      badge: "New"
    },
    {
      id: 2,
      name: "Premium Leather Handbag",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      rating: 4.9,
      reviews: 89,
      isNew: true,
      category: "Fashion",
      badge: "Hot"
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      price: 249.99,
      originalPrice: 349.99,
      discount: 29,
      rating: 4.7,
      reviews: 156,
      isNew: true,
      category: "Electronics",
      badge: "Trending"
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      price: 29.99,
      originalPrice: 49.99,
      discount: 40,
      rating: 4.6,
      reviews: 203,
      isNew: true,
      category: "Fashion",
      badge: "New"
    },
    {
      id: 5,
      name: "Ceramic Coffee Mug Set",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop",
      price: 34.99,
      originalPrice: 59.99,
      discount: 42,
      rating: 4.8,
      reviews: 78,
      isNew: true,
      category: "Home",
      badge: "Limited"
    },
    {
      id: 6,
      name: "Wireless Gaming Mouse",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      price: 79.99,
      originalPrice: 119.99,
      discount: 33,
      rating: 4.9,
      reviews: 92,
      isNew: true,
      category: "Electronics",
      badge: "Hot"
    },
    {
      id: 7,
      name: "Yoga Mat Premium",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      price: 44.99,
      originalPrice: 69.99,
      discount: 36,
      rating: 4.7,
      reviews: 134,
      isNew: true,
      category: "Sports",
      badge: "New"
    },
    {
      id: 8,
      name: "Sunglasses Designer",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      price: 159.99,
      originalPrice: 229.99,
      discount: 30,
      rating: 4.8,
      reviews: 67,
      isNew: true,
      category: "Fashion",
      badge: "Trending"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(newArrivals.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(newArrivals.length / 4)) % Math.ceil(newArrivals.length / 4));
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

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const visibleProducts = newArrivals.slice(currentIndex * 4, (currentIndex * 4) + 4);

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6"
          >
            <FiClock className="w-4 h-4" />
            <span>Fresh & New</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            New Arrivals
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover the latest products that just arrived in our store
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
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.badge}
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
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
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
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
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
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                      >
                        <FiShoppingCart className="w-5 h-5" />
                        Add to Cart
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
          {Array.from({ length: Math.ceil(newArrivals.length / 4) }).map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 scale-125 shadow-lg' 
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
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:shadow-2xl hover:shadow-green-500/25 flex items-center gap-3 mx-auto"
          >
            <FiTag className="w-6 h-6" />
            View All New Arrivals
            <FiArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NewArrivalsSlider; 