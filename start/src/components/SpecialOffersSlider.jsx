import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiHeart, FiStar, FiShoppingCart, FiEye, FiGift, FiClock, FiZap, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../context/Appcontext';

const SpecialOffersSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { wishlist, setWishlist } = useWishlist();

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
    if (products.length === 0 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / 4));
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length, isHovered]);

  if (loading) return (
    <div className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading special offers...</p>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    </div>
  );
  
  if (!Array.isArray(products) || products.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(products.length / 4)) % Math.ceil(products.length / 4));
  };

  // Enhanced click functions
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleQuickView = (product) => {
    navigate(`/category/${product.category}?product=${product._id}`);
  };

  const handleAddToCart = (product) => {
    console.log(`Added product ${product._id} to cart`);
    // Add to cart functionality - integrate with your cart context
  };

  const handleAddToWishlist = (product) => {
    setWishlist(prev => 
      prev.includes(product._id) 
        ? prev.filter(id => id !== product._id)
        : [...prev, product._id]
    );
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const visibleProducts = products.slice(currentIndex * 4, (currentIndex * 4) + 4);

  return (
    <div 
      className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                  onClick={() => handleProductClick(product)}
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
                          handleAddToWishlist(product);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 cursor-pointer"
                        title="Add to Wishlist"
                      >
                        <FiHeart className="w-4 h-4 text-gray-600" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickView(product);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 cursor-pointer"
                        title="Quick View"
                      >
                        <FiEye className="w-4 h-4 text-gray-600" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 cursor-pointer"
                        title="Add to Cart"
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
                        handleAddToCart(product);
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
            onClick={() => navigate('/category/Footwear')}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Special Offers
          </motion.button>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {showModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedProduct.images?.[0]?.url || "https://via.placeholder.com/400x400"}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ${selectedProduct.discountPrice || selectedProduct.price}
                      </span>
                      {selectedProduct.discountPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          ${selectedProduct.price}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => {
                          handleAddToCart(selectedProduct);
                          closeModal();
                        }}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          handleAddToWishlist(selectedProduct);
                        }}
                        className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FiHeart className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => {
                        handleQuickView(selectedProduct);
                        closeModal();
                      }}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 px-4 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpecialOffersSlider; 