import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft, FiStar, FiClock, FiTrendingUp, FiZap, FiShoppingCart, FiHeart, FiEye, FiX } from 'react-icons/fi';
import axios from 'axios';
import { useWishlist } from '../context/Appcontext';

const NewArrivalsSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { wishlist, setWishlist } = useWishlist();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/products/new-arrivals?limit=8');
        const productsData = response.data.data?.products || [];
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching new arrivals:', err);
        setError('Failed to load new arrivals');
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === Math.max(0, products.length - 4) ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, products.length - 4) : prevIndex - 1
    );
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
    // Add to cart functionality
    console.log('Adding to cart:', product.name);
    // You can integrate with your cart context here
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

  // Auto-scroll functionality
  useEffect(() => {
    if (products.length === 0 || isHovered) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length, isHovered]);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading amazing new arrivals...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !products.length) {
    return null;
  }

  return (
    <section 
      className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full">
                <FiTrendingUp className="text-2xl" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                New Arrivals
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the latest trends and newest products that just arrived in our store
            </p>
          </motion.div>
        </div>

        {/* Products Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <FiArrowRight className="text-xl" />
          </button>

          {/* Products Grid */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4"
                >
                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                    {/* Product Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.images?.[0]?.url || product.images?.[0] || product.image || "https://via.placeholder.com/300x300?text=New+Arrival"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      />
                      
                      {/* New Arrival Badge */}
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                        <FiZap className="text-yellow-300" />
                        NEW
                      </div>

                      {/* Discount Badge */}
                      {product.discountPrice && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                        </div>
                      )}

                      {/* Quick Action Buttons */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickView(product);
                          }}
                          className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                          title="Quick View"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                          title="Add to Cart"
                        >
                          <FiShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToWishlist(product);
                          }}
                          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                          title="Add to Wishlist"
                        >
                          <FiHeart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 
                          className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={() => handleProductClick(product)}
                        >
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {product.description}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl font-bold text-gray-900">
                          ${product.discountPrice || product.price}
                        </span>
                        {product.discountPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.price}
                          </span>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            ({product.numReviews || 0})
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {product.brand}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleProductClick(product)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center font-semibold text-sm"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => handleAddToWishlist(product)}
                          className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
                          title="Add to Wishlist"
                        >
                          <FiHeart className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Stock Status */}
                      <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {product.countInStock > 0 ? (
                          <span className="text-green-600">In Stock ({product.countInStock})</span>
                        ) : (
                          <span className="text-red-600">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(products.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/category/Fashion')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All New Arrivals
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
                      src={selectedProduct.images?.[0]?.url || selectedProduct.images?.[0] || selectedProduct.image || "https://via.placeholder.com/400x400"}
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
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
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
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
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
    </section>
  );
};

export default NewArrivalsSlider; 