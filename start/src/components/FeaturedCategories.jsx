import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiSmartphone, FiHome, FiHeart, FiZap } from 'react-icons/fi';

const FeaturedCategories = () => {
  const [clickedCategory, setClickedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Fashion",
      description: "Trendy clothing and accessories",
      icon: <FiShoppingBag className="text-4xl" />,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "from-pink-500 to-rose-500",
      textColor: "text-pink-600",
      route: "/category/Fashion"
    },
    {
      id: 2,
      name: "Electronics",
      description: "Latest gadgets and devices",
      icon: <FiSmartphone className="text-4xl" />,
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "from-blue-500 to-indigo-500",
      textColor: "text-blue-600",
      route: "/category/Electronics"
    },
    {
      id: 3,
      name: "Home Appliances",
      description: "Furniture and home decor",
      icon: <FiHome className="text-4xl" />,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "from-green-500 to-emerald-500",
      textColor: "text-green-600",
      route: "/category/Home Appliances"
    },
    {
      id: 4,
      name: "Beauty & Fashion",
      description: "Cosmetics and personal care",
      icon: <FiHeart className="text-4xl" />,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-600",
      route: "/category/Beauty & Fashion"
    },
    {
      id: 5,
      name: "Sports",
      description: "Athletic gear and equipment",
      icon: <FiZap className="text-4xl" />,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "from-orange-500 to-red-500",
      textColor: "text-orange-600",
      route: "/category/Sports"
    },
    {
      id: 6,
      name: "Footwear",
      description: "Shoes for every occasion",
      icon: <FiShoppingBag className="text-4xl" />,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
      color: "from-teal-500 to-cyan-500",
      textColor: "text-teal-600",
      route: "/category/Footwear"
    }
  ];

  const handleCategoryClick = async (category) => {
    if (isLoading) return;
    
    setClickedCategory(category.id);
    setIsLoading(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      navigate(category.route);
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
      setClickedCategory(null);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections and find exactly what you're looking for
            </p>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              {/* Loading Overlay */}
              {clickedCategory === category.id && isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center"
                >
                  <div className="bg-white rounded-full p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                </motion.div>
              )}

              {/* Background Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Category Icon */}
                <div className={`absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-3 rounded-full ${category.textColor}`}>
                  {category.icon}
                </div>

                {/* Click Indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: clickedCategory === category.id ? 1 : 0,
                    scale: clickedCategory === category.id ? 1 : 0
                  }}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full"
                >
                  <FiArrowRight className="text-white w-5 h-5" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-4 text-sm">
                  {category.description}
                </p>
                
                {/* Action Button */}
                <motion.div
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${category.color} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:translate-x-1`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Shop {category.name}</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full scale-0"
                animate={{
                  scale: clickedCategory === category.id ? 2 : 0,
                  opacity: clickedCategory === category.id ? 0 : 1,
                }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories; 