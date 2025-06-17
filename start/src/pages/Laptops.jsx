import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const Laptops = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const handleMenuToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const laptopsProducts = [
    { id: 1, name: "MacBook Pro 16", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 2499.99, originalPrice: 2799.99, discount: 11, rating: 4.9, reviews: 156, category: "Gaming" },
    { id: 2, name: "Dell XPS 15", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 1899.99, originalPrice: 2199.99, discount: 14, rating: 4.8, reviews: 234, category: "Business" },
    { id: 3, name: "HP Spectre x360", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 1299.99, originalPrice: 1599.99, discount: 19, rating: 4.7, reviews: 189, category: "Convertible" },
    { id: 4, name: "Lenovo ThinkPad X1", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 1699.99, originalPrice: 1999.99, discount: 15, rating: 4.8, reviews: 123, category: "Business" },
    { id: 5, name: "ASUS ROG Strix", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 1499.99, originalPrice: 1799.99, discount: 17, rating: 4.6, reviews: 98, category: "Gaming" },
    { id: 6, name: "Acer Swift 3", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 699.99, originalPrice: 899.99, discount: 22, rating: 4.5, reviews: 167, category: "Budget" },
    { id: 7, name: "Laptop Cooling Pad", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 24.99, originalPrice: 39.99, discount: 38, rating: 4.2, reviews: 167, category: "Accessories" },
    { id: 8, name: "Laptop Sleeve", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 19.99, originalPrice: 34.99, discount: 43, rating: 4.2, reviews: 156, category: "Accessories" },
    { id: 9, name: "Laptop Docking Station", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 199.99, originalPrice: 299.99, discount: 33, rating: 4.7, reviews: 123, category: "Accessories" },
    { id: 10, name: "Laptop Battery Pack", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 89.99, originalPrice: 129.99, discount: 31, rating: 4.6, reviews: 89, category: "Accessories" },
    { id: 11, name: "Laptop Stand", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 44.99, originalPrice: 64.99, discount: 31, rating: 4.5, reviews: 98, category: "Accessories" },
    { id: 12, name: "Laptop Monitor", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop", price: 299.99, originalPrice: 399.99, discount: 25, rating: 4.7, reviews: 98, category: "Accessories" },
    { id: 13, name: "Laptop Keyboard", image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop", price: 129.99, originalPrice: 179.99, discount: 28, rating: 4.8, reviews: 156, category: "Accessories" },
    { id: 14, name: "Laptop Mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", price: 49.99, originalPrice: 79.99, discount: 38, rating: 4.5, reviews: 267, category: "Accessories" },
    { id: 15, name: "Laptop Bag", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", price: 79.99, originalPrice: 119.99, discount: 33, rating: 4.6, reviews: 145, category: "Accessories" }
  ];

  const categories = ['All', 'Gaming', 'Business', 'Convertible', 'Budget', 'Accessories'];

  const filteredProducts = selectedCategory === 'All' 
    ? laptopsProducts 
    : laptopsProducts.filter(product => product.category === selectedCategory);

  const goToProductDetail = (productId) => {
    navigate(`/laptops/${productId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className="flex-1 bg-gray-50">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-bold mb-4">Laptops Collection</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl opacity-90">Powerful computers for work and play</motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <motion.button key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'}`}>{category}</motion.button>
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
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">{product.name}</h3>
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
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12 text-gray-600">Showing {filteredProducts.length} of {laptopsProducts.length} products</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Laptops; 