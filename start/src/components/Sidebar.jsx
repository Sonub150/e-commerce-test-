import { useState, useEffect, useContext } from 'react';
import { 
  FiHome, 
  FiShoppingBag, 
  FiHeart, 
  FiUser, 
  FiSettings, 
  FiHelpCircle,
  FiLogOut,
  FiLogIn,
  FiChevronRight,
  FiX,
  FiStar,
  FiTrendingUp,
  FiGift,
  FiAward,
  FiBookmark,
  FiGrid,
  FiLayers
} from 'react-icons/fi';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';

const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState('home');
  const navigate = useNavigate();
  const { isLoggedIn, userData, setisLoggedIn, setUserData } = useContext(AppContext);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('sidebar-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('sidebar-open');
    };
  }, [isOpen]);

  const menuItems = [
    { id: 'home', name: 'Home', icon: <FiHome />, href: '/' },
    { id: 'shop', name: 'Shop', icon: <FiShoppingBag />, href: '/shop' },
    { id: 'wishlist', name: 'Wishlist', icon: <FiHeart />, href: '/wishlist' },
    { id: 'orders', name: 'My Orders', icon: <FiBookmark />, href: '/orders' },
    { id: 'profile', name: 'Profile', icon: <FiUser />, href: '/profile' },
  ];

  const categories = [
    {
      id: 'footwear',
      name: 'Footwear',
      icon: '👟',
      href: '/category/Footwear'
    },
    {
      id: 'smartphones',
      name: 'Smartphones',
      icon: '📞',
      href: '/category/Smartphones'
    },
    {
      id: 'laptops',
      name: 'Laptops',
      icon: '💻',
      href: '/category/Laptops'
    },
    {
      id: 'home-appliances',
      name: 'Home Appliances',
      icon: '🏠',
      href: '/category/Home Appliances'
    },
    {
      id: 'beauty-fashion',
      name: 'Beauty & Fashion',
      icon: '💄',
      href: '/category/Beauty & Fashion'
    }
  ];

  const quickActions = [
    { name: 'New Arrivals', icon: <FiTrendingUp />, href: '/new', badge: 'HOT' },
    { name: 'Deals', icon: <FiGift />, href: '/deals', badge: 'SALE' },
    { name: 'Best Sellers', icon: <FiAward />, href: '/bestsellers' },
    { name: 'Reviews', icon: <FiStar />, href: '/reviews' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] cursor-pointer"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 text-gray-800 z-[70] shadow-2xl flex flex-col border-r border-gray-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex-shrink-0 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                {/* Logo - Click to navigate back to home page using useNavigate for reliability */}
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
                  <button
                    onClick={() => navigate('/')}
                    className="flex items-center bg-transparent border-none p-0 m-0 cursor-pointer"
                    style={{ background: 'none' }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-lg px-2 mr-3 text-xl shadow-lg"
                    >
                      ✨
                    </motion.span>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                      LuxeCart
                    </span>
                  </button>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 cursor-pointer"
                  aria-label="Close sidebar"
                >
                  <FiX className="w-6 h-6" />
                </motion.button>
              </div>
              
              {/* User Profile */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    {isLoggedIn && userData ? (
                      <>
                        <p className="font-semibold text-gray-800">Welcome back, {userData.firstName}!</p>
                        <p className="text-sm text-gray-600">{userData.email}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-gray-800">Welcome back!</p>
                        <p className="text-sm text-gray-600">Sign in to your account</p>
                      </>
                    )}
                  </div>
                </div>
                {isLoggedIn && userData && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => {
                      setisLoggedIn(false);
                      setUserData(null);
                      onClose();
                      navigate('/');
                    }}
                    className="mt-3 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 cursor-pointer"
                  >
                    <FiLogOut className="inline w-4 h-4 mr-2" />
                    Sign Out
                  </motion.button>
                )}
                {!isLoggedIn && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 space-y-2"
                  >
                    <Link
                      to="/login"
                      onClick={onClose}
                      className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-center cursor-pointer"
                    >
                      <FiLogIn className="inline w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={onClose}
                      className="block w-full bg-white border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 text-center cursor-pointer"
                    >
                      Create Account
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto py-6">
              {/* Main Menu Items */}
              <div className="px-6 mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Main Menu</h3>
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => {
                          setActiveItem(item.id);
                          onClose();
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                          activeItem === item.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-white/50'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="px-6 mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <motion.div
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={category.href}
                        onClick={onClose}
                        className="block bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/80 transition-all duration-200 border border-gray-200/50 cursor-pointer"
                      >
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="text-sm font-medium text-gray-700">{category.name}</div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="px-6 mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {quickActions.map((action) => (
                    <motion.div
                      key={action.name}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={action.href}
                        onClick={onClose}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-white/50 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{action.icon}</span>
                          <span className="font-medium">{action.name}</span>
                        </div>
                        {action.badge && (
                          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            {action.badge}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Help & Support */}
              <div className="px-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Help & Support</h3>
                <div className="space-y-2">
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/help"
                      onClick={onClose}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-white/50 transition-all duration-200 cursor-pointer"
                    >
                      <FiHelpCircle className="text-lg" />
                      <span className="font-medium">Help Center</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/contact"
                      onClick={onClose}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-white/50 transition-all duration-200 cursor-pointer"
                    >
                      <FiSettings className="text-lg" />
                      <span className="font-medium">Contact Us</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">© 2024 LuxeCart. All rights reserved.</p>
                <div className="flex justify-center space-x-4 text-xs text-gray-500">
                  <Link to="/privacy" onClick={onClose} className="hover:text-gray-700 transition-colors cursor-pointer">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" onClick={onClose} className="hover:text-gray-700 transition-colors cursor-pointer">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;