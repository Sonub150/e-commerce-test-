import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiHeart, FiStar, FiShoppingCart, FiEye, FiGift, FiClock, FiZap } from 'react-icons/fi';
import axios from 'axios';

const SpecialOffersSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/api/products?category=Footwear')
      .then(res => {
        // Ensure we get an array from the response
        const productData = Array.isArray(res.data) ? res.data : (res.data.products || []);
        setProducts(productData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (products.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / 4));
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!Array.isArray(products) || products.length === 0) return <div>No products found</div>;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(products.length / 4)) % Math.ceil(products.length / 4));
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

  const visibleProducts = products.slice(currentIndex * 4, (currentIndex * 4) + 4);

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6"
          >
            <FiZap className="w-4 h-4" />
            <span>Special Offers</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Flash Sales & Deals
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Don't miss out on these incredible deals! Limited time offers with massive discounts on premium products.
          </motion.p>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
          >
            <FiArrowRight className="w-6 h-6 rotate-180" />
          </motion.button>

          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(products.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-red-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
          >
            <FiArrowRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Product Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images?.[0]?.url || "https://via.placeholder.com/400x400?text=No+Image"}
                      alt={product.images?.[0]?.altText || product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(product._id);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 cursor-pointer"
                      >
                        <FiHeart className="w-4 h-4 text-gray-600" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          quickView(product._id);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 cursor-pointer"
                      >
                        <FiEye className="w-4 h-4 text-gray-600" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product._id);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 cursor-pointer"
                      >
                        <FiShoppingCart className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Flash Sale
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.numReviews || 0})</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">${product.discountPrice || product.price}</span>
                      {product.discountPrice && (
                        <span className="text-lg text-gray-400 line-through">${product.price}</span>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product._id);
                      }}
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Special Offers
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffersSlider; 