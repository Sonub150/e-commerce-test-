import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiTag, FiArrowRight, FiGift, FiTrendingUp, FiZap } from 'react-icons/fi';

const SpecialDeals = () => {
  const [currentDeal, setCurrentDeal] = useState(0);

  const deals = [
    {
      id: 1,
      title: "Flash Sale",
      subtitle: "Up to 70% Off",
      description: "Limited time offer on premium fashion items",
      category: "Fashion",
      discount: "70%",
      originalPrice: "$299",
      salePrice: "$89",
      timeLeft: "2:45:30",
      icon: <FiZap className="text-yellow-500" />,
      bgGradient: "from-red-500 to-pink-500",
      textColor: "text-white",
      link: "/category/Fashion"
    },
    {
      id: 2,
      title: "Tech Deals",
      subtitle: "Save $200",
      description: "Latest smartphones and laptops at unbeatable prices",
      category: "Electronics",
      discount: "40%",
      originalPrice: "$999",
      salePrice: "$599",
      timeLeft: "5:20:15",
      icon: <FiTrendingUp className="text-blue-500" />,
      bgGradient: "from-blue-500 to-purple-500",
      textColor: "text-white",
      link: "/category/Electronics"
    },
    {
      id: 3,
      title: "Beauty Bonanza",
      subtitle: "Buy 2 Get 1 Free",
      description: "Premium beauty products with amazing deals",
      category: "Beauty & Fashion",
      discount: "33%",
      originalPrice: "$150",
      salePrice: "$100",
      timeLeft: "1:30:45",
      icon: <FiGift className="text-pink-500" />,
      bgGradient: "from-pink-500 to-rose-500",
      textColor: "text-white",
      link: "/category/Beauty & Fashion"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % deals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [deals.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Special Deals & Offers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these incredible deals! Limited time offers on premium products.
            </p>
          </motion.div>
        </div>

        {/* Deals Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDeal}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {deals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 ${
                    index === currentDeal ? 'ring-4 ring-yellow-400' : ''
                  }`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${deal.bgGradient} opacity-90`} />
                  
                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col justify-between">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-3xl">
                          {deal.icon}
                        </div>
                        <div>
                          <h3 className={`text-2xl font-bold ${deal.textColor}`}>
                            {deal.title}
                          </h3>
                          <p className={`text-lg font-semibold ${deal.textColor} opacity-90`}>
                            {deal.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <p className={`text-sm ${deal.textColor} opacity-80 mb-4`}>
                        {deal.description}
                      </p>
                      
                      {/* Category Badge */}
                      <span className={`inline-block bg-white/20 backdrop-blur-sm ${deal.textColor} px-3 py-1 rounded-full text-sm font-medium`}>
                        {deal.category}
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-3xl font-bold ${deal.textColor}`}>
                          {deal.salePrice}
                        </span>
                        <span className={`text-lg line-through opacity-70 ${deal.textColor}`}>
                          {deal.originalPrice}
                        </span>
                        <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-bold">
                          {deal.discount} OFF
                        </span>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <FiClock className={`${deal.textColor} opacity-80`} />
                        <span className={`text-sm font-medium ${deal.textColor} opacity-80`}>
                          Time Left:
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {deal.timeLeft.split(':').map((time, index) => (
                          <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[50px]">
                            <span className={`text-lg font-bold ${deal.textColor}`}>
                              {time}
                            </span>
                            <div className={`text-xs ${deal.textColor} opacity-70`}>
                              {index === 0 ? 'Hrs' : index === 1 ? 'Min' : 'Sec'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={deal.link}
                      className={`inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm ${deal.textColor} px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 group`}
                    >
                      Shop Now
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <FiStar className="text-yellow-300 text-xl" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <FiTag className="text-white text-lg" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {deals.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDeal(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentDeal 
                    ? 'bg-gradient-to-r from-red-500 to-purple-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Promotional Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              🎉 Free Shipping on Orders Over $50!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Plus, get an additional 10% off when you sign up for our newsletter
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-gray-800 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe & Save
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialDeals; 