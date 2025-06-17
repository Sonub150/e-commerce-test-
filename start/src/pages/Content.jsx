import React from 'react';
import { motion } from 'framer-motion';

function Content() {
  return (
    <main className="flex-grow p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            Welcome to LuxeCart
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the finest collection of luxury items, from fashion to electronics, 
            all curated for the discerning shopper.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Shop Now
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { name: 'Electronics', icon: '📱', color: 'from-blue-500 to-cyan-500' },
            { name: 'Fashion', icon: '👗', color: 'from-pink-500 to-rose-500' },
            { name: 'Home & Garden', icon: '🏠', color: 'from-green-500 to-emerald-500' },
            { name: 'Beauty', icon: '💄', color: 'from-purple-500 to-violet-500' },
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-gradient-to-br ${category.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-white/80 text-sm">Explore our collection</p>
            </motion.div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">New Arrivals</h2>
            <p className="text-gray-600 mb-6">
              Discover the latest trends and newest additions to our luxury collection. 
              Stay ahead with our curated selection of premium items.
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              View All New Arrivals →
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Special Offers</h2>
            <p className="text-gray-600 mb-6">
              Take advantage of our exclusive deals and limited-time offers. 
              Save big on luxury items you love.
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              View All Deals →
            </button>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join the Luxury Experience</h2>
          <p className="text-xl mb-6 opacity-90">
            Sign up for exclusive access to premium products and personalized recommendations.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </main>
  );
}

export default Content; 