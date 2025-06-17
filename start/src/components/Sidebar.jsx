import { useState, useEffect, useContext } from 'react';
import { 
  FiHome, 
  FiShoppingBag, 
  FiHeart, 
  FiUser, 
  FiSettings, 
  FiHelpCircle,
  FiLogOut,
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
  const [expandedCategory, setExpandedCategory] = useState(null);
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
      id: 'fashion',
      name: 'Fashion',
      icon: '👗',
      href: '/fashion'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '📱',
      href: '/electronics'
    },
    {
      id: 'phones',
      name: 'Phones',
      icon: '📞',
      href: '/phones'
    },
    {
      id: 'laptops',
      name: 'Laptops',
      icon: '💻',
      href: '/laptops'
    },
    {
      id: 'shoes',
      name: 'Shoes',
      icon: '👟',
      href: '/shoes'
    },
    {
      id: 'home-appliances',
      name: 'Home Appliances',
      icon: '🏠',
      href: '/home-appliances'
    },
    {
      id: 'sports',
      name: 'Sports',
      icon: '⚽',
      href: '/sports'
    },
    {
      id: 'beauty',
      name: 'Beauty',
      icon: '💄',
      href: '/beauty'
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
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
                    onClick={() => {
                      console.log('Sidebar logo clicked - navigating to home page');
                      navigate('/');
                    }}
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
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
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
                    className="mt-3 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </motion.button>
                )}
              </motion.div>
            </div>

            {/* Navigation - Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {/* Main Menu */}
              <div className="px-4 mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Main Menu
                </h3>
                <div className="space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        to={item.href}
                        className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all group relative ${
                          activeItem === item.id 
                            ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 shadow-lg border border-gray-200' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-800'
                        }`}
                        onClick={() => setActiveItem(item.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        {item.badge && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold"
                          >
                            {item.badge}
                          </motion.span>
                        )}
                        <motion.div 
                          className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full ${
                            activeItem === item.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="px-4 mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + menuItems.length) * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        to={category.href}
                        onClick={onClose}
                        className="flex items-center justify-between px-3 py-3 rounded-lg transition-all text-gray-700 hover:bg-gray-50 hover:text-gray-800 group"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-gray-400 group-hover:text-gray-600 transition-colors"
                        >
                          <FiChevronRight className="w-4 h-4" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="px-4 mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Quick Actions
                </h3>
                <div className="space-y-1">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + menuItems.length + categories.length) * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        to={action.href}
                        className="flex items-center justify-between px-3 py-3 rounded-lg transition-all text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{action.icon}</span>
                          <span className="font-medium">{action.name}</span>
                        </div>
                        {action.badge && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold"
                          >
                            {action.badge}
                          </motion.span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Account Actions */}
              <div className="px-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Account
                </h3>
                <div className="space-y-1">
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-all text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                  >
                    <FiUser className="text-lg" />
                    <span className="font-medium">Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-all text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                  >
                    <FiUser className="text-lg" />
                    <span className="font-medium">Create Account</span>
                  </Link>
                  <Link
                    to="/support"
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-all text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                  >
                    <FiHelpCircle className="text-lg" />
                    <span className="font-medium">Help Center</span>
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