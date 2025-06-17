import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const Beauty = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const handleMenuToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const beautyProducts = [
    { id: 1, name: "MAC Lipstick Ruby Woo", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 19.99, originalPrice: 24.99, discount: 20, rating: 4.8, reviews: 234, category: "Makeup" },
    { id: 2, name: "La Mer Moisturizer", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 299.99, originalPrice: 349.99, discount: 14, rating: 4.9, reviews: 189, category: "Skincare" },
    { id: 3, name: "Dyson Hair Dryer", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 399.99, originalPrice: 449.99, discount: 11, rating: 4.7, reviews: 156, category: "Hair" },
    { id: 4, name: "Chanel N°5 Perfume", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 129.99, originalPrice: 159.99, discount: 19, rating: 4.8, reviews: 123, category: "Fragrance" },
    { id: 5, name: "Estée Lauder Foundation", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 44.99, originalPrice: 54.99, discount: 18, rating: 4.6, reviews: 98, category: "Makeup" },
    { id: 6, name: "SK-II Facial Essence", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 159.99, originalPrice: 189.99, discount: 16, rating: 4.7, reviews: 167, category: "Skincare" },
    { id: 7, name: "Dior Mascara", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 29.99, originalPrice: 39.99, discount: 25, rating: 4.5, reviews: 145, category: "Makeup" },
    { id: 8, name: "Olaplex Hair Treatment", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 28.99, originalPrice: 38.99, discount: 26, rating: 4.6, reviews: 134, category: "Hair" },
    { id: 9, name: "Tom Ford Lipstick", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 54.99, originalPrice: 64.99, discount: 15, rating: 4.8, reviews: 89, category: "Makeup" },
    { id: 10, name: "CeraVe Moisturizer", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 19.99, originalPrice: 24.99, discount: 20, rating: 4.4, reviews: 178, category: "Skincare" },
    { id: 11, name: "YSL Black Opium", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 89.99, originalPrice: 109.99, discount: 18, rating: 4.7, reviews: 123, category: "Fragrance" },
    { id: 12, name: "Anastasia Brow Wiz", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 23.99, originalPrice: 28.99, discount: 17, rating: 4.6, reviews: 156, category: "Makeup" },
    { id: 13, name: "The Ordinary Serum", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 12.99, originalPrice: 17.99, discount: 28, rating: 4.5, reviews: 234, category: "Skincare" },
    { id: 14, name: "GHD Hair Straightener", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 199.99, originalPrice: 249.99, discount: 20, rating: 4.8, reviews: 98, category: "Hair" },
    { id: 15, name: "NARS Blush", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", price: 34.99, originalPrice: 44.99, discount: 22, rating: 4.7, reviews: 167, category: "Makeup" }
  ];

  const categories = ['All', 'Makeup', 'Skincare', 'Hair', 'Fragrance'];

  const filteredProducts = selectedCategory === 'All' 
    ? beautyProducts 
    : beautyProducts.filter(product => product.category === selectedCategory);

  const goToProductDetail = (productId) => {
    navigate(`/beauty/${productId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className="flex-1 bg-gray-50">
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-bold mb-4">Beauty Collection</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl opacity-90">Discover your natural beauty</motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <motion.button key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-200'}`}>{category}</motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.05 }} whileHover={{ y: -5 }} className="group cursor-pointer" onClick={() => goToProductDetail(product.id)}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img src={product.image} alt={product.name} className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">-{product.discount}%</div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{product.category}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-400 w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12 text-gray-600">Showing {filteredProducts.length} of {beautyProducts.length} products</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Beauty; 