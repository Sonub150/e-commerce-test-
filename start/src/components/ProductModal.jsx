import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRotateCcw, FiShare2, FiMinus, FiPlus } from 'react-icons/fi';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const addToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const addToWishlist = () => {
    console.log(`Added ${product.name} to wishlist`);
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Image Slider */}
              <div className="space-y-4">
                <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
                      >
                        <FiChevronLeft className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
                      >
                        <FiChevronRight className="w-5 h-5" />
                      </motion.button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index ? 'border-purple-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400 w-5 h-5 fill-current" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-gray-500">({product.reviews} reviews)</span>
                    </div>
                    <span className="text-green-600 font-medium">In Stock</span>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -{product.discount}%
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <ul className="space-y-2">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size Selection */}
                {product.sizes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Size</h3>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedSize === size
                              ? 'border-purple-500 bg-purple-50 text-purple-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {product.colors && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Color</h3>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedColor === color
                              ? 'border-purple-500 bg-purple-50 text-purple-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {color}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-100"
                      >
                        <FiMinus className="w-4 h-4" />
                      </motion.button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <FiPlus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addToCart}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addToWishlist}
                    className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <FiHeart className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={shareProduct}
                    className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <FiShare2 className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Product Info */}
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <FiTruck className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiShield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">2-year warranty included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiRotateCcw className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">30-day return policy</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal; 