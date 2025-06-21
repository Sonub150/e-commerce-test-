import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import HomeSlider from '../components/Homeslider';
import NewArrivalsSlider from '../components/NewArrivalsSlider';
import SpecialOffersSlider from '../components/SpecialOffersSlider';
import SpecialDeals from '../components/SpecialDeals';
import FeaturedCategories from '../components/FeaturedCategories';
import { FiArrowUp, FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiX, FiShield } from 'react-icons/fi';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
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
          // Trigger search functionality
          console.log('Search for:', data);
          break;
        case 'admin':
          navigate('/admin/login');
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      {/* Admin Panel Access Button */}
      <motion.button
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => handleQuickAction('admin')}
        className="fixed top-24 right-4 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
        title="Admin Panel"
      >
        <FiShield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </motion.button>
      
      {/* Quick Action Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToSection('home')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === 'home' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('categories')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === 'categories' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => scrollToSection('deals')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === 'deals' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Deals
              </button>
              <button
                onClick={() => scrollToSection('new-arrivals')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === 'new-arrivals' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                New Arrivals
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuickAction('search', '')}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                title="Search"
              >
                <FiSearch className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleQuickAction('wishlist')}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 relative"
                title="Wishlist"
              >
                <FiHeart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                onClick={() => handleQuickAction('cart')}
                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 relative"
                title="Cart"
              >
                <FiShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  5
                </span>
              </button>
              <button
                onClick={() => handleQuickAction('login')}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
                title="Account"
              >
                <FiUser className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <main className="flex-1">
        {/* Home Slider Section */}
        <section id="home">
          <HomeSlider />
        </section>

        {/* Featured Categories Section */}
        <section id="featured-categories">
          <FeaturedCategories />
        </section>

        {/* Special Deals Section */}
        <section id="deals">
          <SpecialDeals />
        </section>

        {/* New Arrivals Section */}
        <section id="new-arrivals">
          <NewArrivalsSlider />
        </section>

        {/* Special Offers Section */}
        <section id="special-offers">
          <SpecialOffersSlider />
        </section>

        {/* Interactive Features Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
              >
                Explore More Features
              </motion.h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover additional features and services to enhance your shopping experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Track Orders",
                  description: "Real-time order tracking",
                  icon: "📦",
                  action: () => navigate('/orders'),
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Customer Support",
                  description: "24/7 live chat support",
                  icon: "💬",
                  action: () => console.log('Open chat'),
                  color: "from-green-500 to-green-600"
                },
                {
                  title: "Rewards Program",
                  description: "Earn points on purchases",
                  icon: "⭐",
                  action: () => navigate('/rewards'),
                  color: "from-yellow-500 to-yellow-600"
                },
                {
                  title: "Gift Cards",
                  description: "Perfect for any occasion",
                  icon: "🎁",
                  action: () => navigate('/gift-cards'),
                  color: "from-pink-500 to-pink-600"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={feature.action}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200/50"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
            title="Scroll to top"
          >
            <FiArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-center">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
