import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const Fashion = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const handleMenuToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const fashionProducts = [
    // Box 1
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      rating: 4.8,
      reviews: 156,
      category: "T-Shirts"
    },
    {
      id: 2,
      name: "Classic Denim Jeans",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.7,
      reviews: 234,
      category: "Jeans"
    },
    {
      id: 3,
      name: "Casual Hoodie",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.6,
      reviews: 189,
      category: "Hoodies"
    },
    // Box 2
    {
      id: 4,
      name: "Formal Dress Shirt",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      rating: 4.9,
      reviews: 123,
      category: "Shirts"
    },
    {
      id: 5,
      name: "Summer Dress",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      price: 69.99,
      originalPrice: 89.99,
      discount: 22,
      rating: 4.5,
      reviews: 98,
      category: "Dresses"
    },
    {
      id: 6,
      name: "Leather Jacket",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.8,
      reviews: 167,
      category: "Jackets"
    },
    // Box 3
    {
      id: 7,
      name: "Sneakers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      rating: 4.7,
      reviews: 145,
      category: "Shoes"
    },
    {
      id: 8,
      name: "Winter Coat",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      rating: 4.6,
      reviews: 134,
      category: "Coats"
    },
    {
      id: 9,
      name: "Polo Shirt",
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
      price: 39.99,
      originalPrice: 49.99,
      discount: 20,
      rating: 4.4,
      reviews: 78,
      category: "Shirts"
    },
    // Box 4
    {
      id: 10,
      name: "Skirt",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      price: 49.99,
      originalPrice: 69.99,
      discount: 29,
      rating: 4.5,
      reviews: 89,
      category: "Skirts"
    },
    {
      id: 11,
      name: "Sweater",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      price: 69.99,
      originalPrice: 89.99,
      discount: 22,
      rating: 4.6,
      reviews: 112,
      category: "Sweaters"
    },
    {
      id: 12,
      name: "Blazer",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
      price: 129.99,
      originalPrice: 159.99,
      discount: 19,
      rating: 4.8,
      reviews: 156,
      category: "Blazers"
    },
    // Box 5
    {
      id: 13,
      name: "Tank Top",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      rating: 4.3,
      reviews: 67,
      category: "Tops"
    },
    {
      id: 14,
      name: "Shorts",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      price: 34.99,
      originalPrice: 44.99,
      discount: 22,
      rating: 4.4,
      reviews: 93,
      category: "Shorts"
    },
    {
      id: 15,
      name: "Cardigan",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.7,
      reviews: 128,
      category: "Cardigans"
    }
  ];

  const categories = ['All', 'T-Shirts', 'Jeans', 'Hoodies', 'Shirts', 'Dresses', 'Jackets', 'Shoes', 'Coats', 'Skirts', 'Sweaters', 'Blazers', 'Tops', 'Shorts', 'Cardigans'];

  const filteredProducts = selectedCategory === 'All' 
    ? fashionProducts 
    : fashionProducts.filter(product => product.category === selectedCategory);

  const addToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
  };

  const addToWishlist = (productId) => {
    console.log(`Added product ${productId} to wishlist`);
  };

  const quickView = (productId) => {
    console.log(`Quick view product ${productId}`);
  };

  const goToProductDetail = (productId) => {
    navigate(`/fashion/${productId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Fashion Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl opacity-90"
            >
              Discover the latest trends in fashion and style
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-pink-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => goToProductDetail(product.id)}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
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

                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </div>

                    {/* Category Tag */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
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
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id);
                      }}
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-12 text-gray-600">
            Showing {filteredProducts.length} of {fashionProducts.length} products
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Fashion; 