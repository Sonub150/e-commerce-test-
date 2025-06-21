import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRotateCcw, FiShare2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  wishlist
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || "");
      setSelectedColor(product.colors?.[0] || "");
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
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

  const handleAddToCart = async () => {
    await addToCart(product);
    onClose();
    toast.success('Added to cart!', {
      position: 'top-center',
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      style: { fontSize: '1.1rem', fontWeight: 600 }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Header Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 rounded-t-3xl mb-2" />
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white/80 rounded-t-3xl">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {product.name}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 rounded-b-3xl">
              {/* Image Slider */}
              <div className="space-y-4 flex flex-col items-center">
                <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg w-full max-w-md mx-auto">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[currentImageIndex]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500"
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
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    {product.category}
                  </div>
                </div>
                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 justify-center">
                    {product.images.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all w-16 h-16 ${
                          currentImageIndex === index ? 'border-purple-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image?.url}
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
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.discountPrice && product.price && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                      -{Math.round(100 - (product.discountPrice / product.price) * 100)}%
                    </span>
                  )}
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow">
                    {product.brand}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium shadow">
                    {product.gender}
                  </span>
                </div>
                {/* Rating and Stock */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <FiStar className="text-yellow-400 w-5 h-5 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-500">({product.numReviews} reviews)</span>
                  </div>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  {product.discountPrice && (
                    <span className="text-xl text-gray-500 line-through">${product.discountPrice}</span>
                  )}
                </div>
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                {/* Features */}
                {product.features && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Size Selection */}
                {product.sizes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Size</h3>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all mb-1 ${
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
                    <div className="flex gap-2 flex-wrap">
                      {product.colors.map((color) => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all mb-1 ${
                            selectedColor === color
                              ? 'border-pink-500 bg-pink-50 text-pink-600'
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
                {/* Add to Cart & Wishlist */}
                <div className="flex gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    disabled={product.countInStock === 0}
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggleWishlist(product._id)}
                    className={`bg-white border border-gray-200 text-pink-500 py-3 px-5 rounded-xl font-semibold flex items-center gap-2 shadow hover:bg-pink-50 transition-all ${wishlist.includes(product._id) ? "bg-red-500 text-white" : ""}`}
                  >
                    <FiHeart className="w-5 h-5" />
                    {wishlist.includes(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
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