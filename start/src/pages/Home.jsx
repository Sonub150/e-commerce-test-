import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import HomeSlider from '../components/HomeSlider';
import NewArrivalsSlider from '../components/NewArrivalsSlider';
import SpecialOffersSlider from '../components/SpecialOffersSlider';
import SpecialDeals from '../components/SpecialDeals';
import FeaturedCategories from '../components/FeaturedCategories';
import { FiArrowUp, FiStar } from 'react-icons/fi';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Page visibility effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMenuToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleQuickAction = (action, data) => {
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      switch (action) {
        case 'category':
          navigate(`/category/${data}`);
          break;
        case 'cart':
          navigate('/cart');
          break;
        case 'wishlist':
          navigate('/wishlist');
          break;
        case 'login':
          navigate('/login');
          break;
        case 'search':
          navigate(`/search?q=${encodeURIComponent(data)}`);
          break;
        case 'orders':
          navigate('/orders');
          break;
        case 'rewards':
          navigate('/rewards');
          break;
        case 'gift-cards':
          navigate('/gift-cards');
          break;
        case 'support':
          navigate('/support');
          break;
        case 'account':
          navigate('/account');
          break;
        case 'settings':
          navigate('/settings');
          break;
        default:
          break;
      }
      setIsLoading(false);
    }, 500);
  };

  const handleProductClick = (productId, category) => {
    navigate(`/category/${category}?product=${productId}`);
  };

  const handleDealClick = (dealData) => {
    navigate(`/category/${dealData.category}?deal=${dealData.id}`);
  };

  const handleCategoryNavigation = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  const handleSearchNavigation = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-x-hidden"
      variants={pageVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <main className="flex-1 relative z-10">
        {/* Home Slider Section */}
        <motion.section 
          id="home"
          variants={sectionVariants}
        >
          <HomeSlider />
        </motion.section>

        {/* Featured Categories Section */}
        <motion.section 
          id="featured-categories"
          variants={sectionVariants}
        >
          <FeaturedCategories />
        </motion.section>

        {/* Special Deals Section */}
        <motion.section 
          id="deals"
          variants={sectionVariants}
        >
          <SpecialDeals />
        </motion.section>

        {/* New Arrivals Section */}
        <motion.section 
          id="new-arrivals"
          variants={sectionVariants}
        >
          <NewArrivalsSlider />
        </motion.section>

        {/* Special Offers Section */}
        <motion.section 
          id="special-offers"
          variants={sectionVariants}
        >
          <SpecialOffersSlider />
        </motion.section>

        {/* Interactive Features Section */}
        <motion.section 
          className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden"
          variants={sectionVariants}
        >
          {/* Section Background Effects */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-100/20 via-purple-100/20 to-pink-100/20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg"
              >
                <FiStar className="w-4 h-4" />
                <span>Premium Features</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
              >
                Explore More Features
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                Discover additional features and services to enhance your shopping experience with our premium offerings
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Track Orders",
                  description: "Real-time order tracking with detailed updates",
                  icon: "📦",
                  action: () => handleQuickAction('orders'),
                  color: "from-blue-500 to-blue-600",
                  gradient: "from-blue-50 to-blue-100"
                },
                {
                  title: "Customer Support",
                  description: "24/7 live chat support with instant responses",
                  icon: "💬",
                  action: () => handleQuickAction('support'),
                  color: "from-green-500 to-green-600",
                  gradient: "from-green-50 to-green-100"
                },
                {
                  title: "Rewards Program",
                  description: "Earn points on purchases and unlock exclusive benefits",
                  icon: "⭐",
                  action: () => handleQuickAction('rewards'),
                  color: "from-yellow-500 to-yellow-600",
                  gradient: "from-yellow-50 to-yellow-100"
                },
                {
                  title: "Gift Cards",
                  description: "Perfect for any occasion with personalized messages",
                  icon: "🎁",
                  action: () => handleQuickAction('gift-cards'),
                  color: "from-pink-500 to-pink-600",
                  gradient: "from-pink-50 to-pink-100"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={featureVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  onClick={feature.action}
                  className={`group bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50 relative overflow-hidden`}
                >
                  {/* Hover Effect Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon Container */}
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-white/50 to-transparent rounded-full" />
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-1 h-1 bg-gradient-to-r from-white/30 to-transparent rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
            title="Scroll to top"
            whileHover={{ 
              scale: 1.1,
              rotate: 360
            }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowUp className="w-6 h-6 group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Enhanced Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/20"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-700 text-lg font-medium"
                >
                  Loading...
                </motion.p>
                <motion.div
                  className="flex gap-1 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-blue-600 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Home;
