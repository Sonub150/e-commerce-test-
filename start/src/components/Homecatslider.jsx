import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiHeart, FiStar, FiTrendingUp, FiZap, FiAward, FiShield, FiTruck, FiGift, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HomeCatSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      description: "Latest gadgets and tech innovations",
      itemCount: "2.5k+ items",
      discount: "Up to 40% off",
      color: "from-blue-500 to-blue-600",
      icon: "📱",
      rating: 4.9,
      reviews: "1.2k",
      featured: true,
      route: "/electronics"
    },
    {
      id: 2,
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      description: "Trendy clothing & accessories",
      itemCount: "1.8k+ items",
      discount: "Up to 50% off",
      color: "from-pink-500 to-pink-600",
      icon: "👗",
      rating: 4.8,
      reviews: "856",
      featured: true,
      route: "/fashion"
    },
    {
      id: 3,
      name: "Phones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      description: "Smartphones & mobile accessories",
      itemCount: "1.2k+ items",
      discount: "Up to 35% off",
      color: "from-green-500 to-green-600",
      icon: "📱",
      rating: 4.7,
      reviews: "1.5k",
      featured: false,
      route: "/phones"
    },
    {
      id: 4,
      name: "Laptops",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
      description: "Computers & laptops",
      itemCount: "800+ items",
      discount: "Up to 45% off",
      color: "from-orange-500 to-orange-600",
      icon: "💻",
      rating: 4.8,
      reviews: "723",
      featured: true,
      route: "/laptops"
    },
    {
      id: 5,
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
      description: "Footwear for everyone",
      itemCount: "2.1k+ items",
      discount: "Up to 60% off",
      color: "from-purple-500 to-purple-600",
      icon: "👟",
      rating: 4.9,
      reviews: "2.1k",
      featured: false,
      route: "/shoes"
    },
    {
      id: 6,
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
      description: "Self-care essentials & wellness",
      itemCount: "2.8k+ items",
      discount: "Up to 55% off",
      color: "from-red-500 to-red-600",
      icon: "💄",
      rating: 4.8,
      reviews: "1.8k",
      featured: true,
      route: "/beauty"
    },
    {
      id: 7,
      name: "Sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "Sports equipment & gear",
      itemCount: "1.2k+ items",
      discount: "Up to 30% off",
      color: "from-gray-500 to-gray-600",
      icon: "⚽",
      rating: 4.6,
      reviews: "445",
      featured: false,
      route: "/sports"
    },
    {
      id: 8,
      name: "Home Appliances",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      description: "Kitchen & home essentials",
      itemCount: "1.9k+ items",
      discount: "Up to 65% off",
      color: "from-yellow-500 to-yellow-600",
      icon: "🏠",
      rating: 4.7,
      reviews: "1.3k",
      featured: false,
      route: "/home-appliances"
    },
    {
      id: 9,
      name: "Gaming",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      description: "Gaming consoles & accessories",
      itemCount: "1.6k+ items",
      discount: "Up to 70% off",
      color: "from-indigo-500 to-indigo-600",
      icon: "🎮",
      rating: 4.9,
      reviews: "892",
      featured: true,
      route: "/electronics"
    },
    {
      id: 10,
      name: "Books",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      description: "Books & literature",
      itemCount: "2.3k+ items",
      discount: "Up to 40% off",
      color: "from-teal-500 to-teal-600",
      icon: "📚",
      rating: 4.8,
      reviews: "1.1k",
      featured: false,
      route: "/fashion"
    },
    {
      id: 11,
      name: "Toys",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop",
      description: "Toys & games for all ages",
      itemCount: "1.9k+ items",
      discount: "Up to 50% off",
      color: "from-rose-500 to-rose-600",
      icon: "🧸",
      rating: 4.7,
      reviews: "678",
      featured: false,
      route: "/fashion"
    },
    {
      id: 12,
      name: "Automotive",
      image: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&h=300&fit=crop",
      description: "Car parts & accessories",
      itemCount: "1.4k+ items",
      discount: "Up to 45% off",
      color: "from-cyan-500 to-cyan-600",
      icon: "🚗",
      rating: 4.8,
      reviews: "567",
      featured: true,
      route: "/electronics"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(categories.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(categories.length / 4)) % Math.ceil(categories.length / 4));
  };

  const goToCategory = (route) => {
    navigate(route);
  };

  // Auto-scroll every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const visibleCategories = categories.slice(currentIndex * 4, (currentIndex * 4) + 4);

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6"
          >
            <FiZap className="w-4 h-4" />
            <span>Discover Amazing Categories</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent"
          >
            Shop by Category
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Explore our curated collection of premium products across all categories with exclusive discounts and fast delivery
          </motion.p>
        </div>

        {/* Enhanced Categories Slider */}
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

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            <AnimatePresence mode="wait">
              {visibleCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => goToCategory(category.route)}
                  onMouseEnter={() => setIsHovered(category.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform overflow-hidden border border-white/50 relative">
                    {/* Featured Badge */}
                    {category.featured && (
                      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        <FiAward className="inline w-3 h-3 mr-1" />
                        Featured
                      </div>
                    )}

                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Enhanced Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-${category.color.split('-')[1]}-600/90 via-${category.color.split('-')[1]}-500/30 to-transparent`}></div>
                      
                      {/* Category Icon */}
                      <motion.div 
                        className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-2xl">{category.icon}</span>
                      </motion.div>

                      {/* Discount Badge */}
                      <motion.div 
                        className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.discount}
                      </motion.div>

                      {/* Item Count */}
                      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium">
                        {category.itemCount}
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                        <FiStar className="text-yellow-400 w-4 h-4 fill-current" />
                        <span>{category.rating}</span>
                        <span className="text-gray-500">({category.reviews})</span>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                      
                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <motion.button 
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                          whileHover={{ x: 5 }}
                        >
                          Shop Now
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                        
                        {/* Quick Stats */}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FiTruck className="w-3 h-3" />
                          <span>Free Shipping</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Hover Effect Border */}
                    <motion.div 
                      className={`absolute inset-0 rounded-3xl border-2 border-transparent pointer-events-none`}
                      animate={{
                        borderColor: isHovered === category.id ? `hsl(${Math.random() * 360}, 70%, 60%)` : 'transparent'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Enhanced Dots Indicator */}
        <div className="flex justify-center mt-12 space-x-3">
          {Array.from({ length: Math.ceil(categories.length / 4) }).map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Enhanced View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/categories'}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:shadow-2xl hover:shadow-purple-500/25 flex items-center gap-4 mx-auto"
          >
            <FiShoppingBag className="w-6 h-6" />
            Explore All Categories
            <FiArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20"
        >
          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
              <FiTrendingUp className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">25K+</h3>
            <p className="text-gray-600 font-medium">Premium Products</p>
          </motion.div>
          
          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
              <FiStar className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9</h3>
            <p className="text-gray-600 font-medium">Customer Rating</p>
          </motion.div>
          
          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
              <FiHeart className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">75K+</h3>
            <p className="text-gray-600 font-medium">Happy Customers</p>
          </motion.div>

          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
              <FiShield className="w-10 h-10 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600 font-medium">Secure Shopping</p>
          </motion.div>
        </motion.div>

        {/* Special Offers Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 text-white text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FiGift className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Special Offers</h3>
            </div>
            <p className="text-lg mb-6 opacity-90">Get exclusive discounts and free shipping on your first order!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300"
            >
              Claim Offer Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeCatSlider;
