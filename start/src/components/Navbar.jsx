import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiShoppingCart, 
  FiUser, 
  FiMenu, 
  FiX,
  FiHelpCircle,
  FiSettings,
  FiHeart,
  FiBell,
  FiLogIn,
  FiLogOut,
  FiChevronDown,
  FiStar,
  FiGift,
  FiTrendingUp,
  FiZap
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { useCart } from '../context/CartContext';
import { useWishlist, useSearch } from '../context/Appcontext';

const Navbar = ({ onMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, userData, setisLoggedIn, setUserData } = useContext(AppContext);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { searchQuery, setSearchQuery } = useSearch();
  const cartCount = cart && cart.cartItems ? cart.cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <FiTrendingUp /> },
    { name: 'New Arrivals', href: '/#new-arrivals', icon: <FiGift /> },
    { name: 'Deals', href: '/#deals', icon: <FiStar /> },
    { name: 'Special Offers', href: '/#special-offers', icon: <FiZap /> },
  ];

  const categories = [
    { name: 'Fashion', icon: '👗', href: '/category/Fashion' },
    { name: 'Electronics', icon: '📱', href: '/category/Electronics' },
    { name: 'Smartphones', icon: '📞', href: '/category/Smartphones' },
    { name: 'Laptops', icon: '💻', href: '/category/Laptops' },
    { name: 'Footwear', icon: '👟', href: '/category/Footwear' },
    { name: 'Home Appliances', icon: '🏠', href: '/category/Home Appliances' },
    { name: 'Sports', icon: '⚽', href: '/category/Sports' },
    { name: 'Beauty & Fashion', icon: '💄', href: '/category/Beauty & Fashion' },
    { name: 'Gaming', icon: '🎮', href: '/category/Electronics' },
    { name: 'Books', icon: '📚', href: '/category/Fashion' },
    { name: 'Toys', icon: '🧸', href: '/category/Fashion' },
    { name: 'Automotive', icon: '🚗', href: '/category/Electronics' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to search results page with the query
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMenuToggle = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (onMenuToggle) {
      onMenuToggle(newState);
    }
  };

  const handleNavigation = (href) => {
    if (href.startsWith('/#')) {
      // Handle anchor links for smooth scrolling
      const elementId = href.substring(2); // Remove '/#'
      const element = document.getElementById(elementId);
      if (element) {
        const offset = 100; // Offset for fixed navbar
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Handle regular navigation
      navigate(href);
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${
      isScrolled 
        ? 'shadow-2xl bg-white/95 backdrop-blur-md border-b border-gray-200/50' 
        : 'bg-gradient-to-r from-blue-50/95 to-purple-50/95 backdrop-blur-sm'
    }`}>
      {/* Announcement Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-center py-2.5 text-sm font-bold"
      >
        <div className="container mx-auto px-4 flex items-center justify-center">
          <motion.span 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center"
          >
            <FiStar className="w-4 h-4 mr-2 text-yellow-300" />
            FREE EXPRESS SHIPPING ON ORDERS OVER $50 • 
            <Link 
              to="/shop-now" 
              className="ml-2 font-extrabold hover:underline underline-offset-4 decoration-2 flex items-center cursor-pointer transition-all duration-300 hover:text-yellow-200"
            >
              SHOP NOW
            </Link>
          </motion.span>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-gray-800 flex items-center bg-transparent border-none p-0 m-0 cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ background: 'none' }}
            >
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl px-3 py-1 mr-3 shadow-lg"
              >
                ✨
              </motion.span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-extrabold">
                LuxeCart
              </span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <button
                  onClick={() => handleNavigation(link.href)}
                  className="navbar-link px-5 py-3 rounded-xl font-medium bg-transparent hover:bg-white/80 hover:shadow-lg transition-all duration-300 text-gray-700 cursor-pointer inline-flex items-center space-x-2"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span className="group-hover:text-blue-600 transition-colors duration-300">{link.name}</span>
                </button>
              </motion.div>
            ))}
            
            {/* Categories Dropdown */}
            <motion.div className="relative group">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="navbar-link px-5 py-3 rounded-xl font-medium bg-transparent hover:bg-white/80 hover:shadow-lg transition-all duration-300 flex items-center text-gray-700 cursor-pointer space-x-2"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">📦</span>
                <span className="group-hover:text-blue-600 transition-colors duration-300">Categories</span>
                <FiChevronDown className={`transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </motion.button>
              
              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl py-3 z-30 text-gray-800 border border-gray-100"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {categories.map((category) => (
                        <div key={category.name} className="group">
                          <Link 
                            to={category.href}
                            onClick={() => setIsCategoriesOpen(false)}
                            className="block px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 flex items-center transition-all duration-200 cursor-pointer group-hover:translate-x-2"
                          >
                            <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                            <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{category.name}</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </nav>

          {/* Icons Group */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Responsive Search Bar */}
            <div className="relative group flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="flex items-center bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-blue-300 group-focus-within:border-blue-500 group-focus-within:ring-2 group-focus-within:ring-blue-500/20">
                <FiSearch className="text-gray-400 mr-2 sm:mr-3 text-base sm:text-lg group-focus-within:text-blue-500 transition-colors duration-300 flex-shrink-0" />
                <form onSubmit={handleSearch} className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => {
                      // Prevent space key from triggering other actions
                      if (e.key === ' ') {
                        e.stopPropagation();
                      }
                    }}
                    placeholder="Search..."
                    className="bg-transparent border-none focus:outline-none w-full text-gray-700 placeholder-gray-400 text-sm font-medium"
                  />
                </form>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 sm:ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                  >
                    <FiX className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              {/* Search Suggestions Dropdown - Desktop Only */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden hidden md:block">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">Quick Search</span>
                      <button
                        onClick={() => handleSearch({ preventDefault: () => {} })}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Search "{searchQuery}"
                      </button>
                    </div>
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setSearchQuery(searchQuery + ' fashion');
                          handleSearch({ preventDefault: () => {} });
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors text-xs text-gray-600 hover:text-gray-800"
                      >
                        <span className="font-medium">{searchQuery}</span> in Fashion
                      </button>
                      <button
                        onClick={() => {
                          setSearchQuery(searchQuery + ' electronics');
                          handleSearch({ preventDefault: () => {} });
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors text-xs text-gray-600 hover:text-gray-800"
                      >
                        <span className="font-medium">{searchQuery}</span> in Electronics
                      </button>
                      <button
                        onClick={() => {
                          setSearchQuery(searchQuery + ' beauty');
                          handleSearch({ preventDefault: () => {} });
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors text-xs text-gray-600 hover:text-gray-800"
                      >
                        <span className="font-medium">{searchQuery}</span> in Beauty
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Search Button - Only show on very small screens */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="sm:hidden p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 flex-shrink-0"
            >
              <FiSearch className="text-gray-600 w-4 h-4" />
            </button>

            {/* Wishlist Icon with Badge */}
            <div className="relative">
              <Link to="/wishlist" className="flex items-center group">
                <FiHeart className="w-7 h-7 text-pink-500 group-hover:scale-110 transition-transform duration-200" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center ml-4 hover:text-pink-600 transition">
              <FiShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">{cartCount}</span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative hidden md:block">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="navbar-icon flex items-center space-x-2 p-2 hover:bg-white/80 hover:shadow-lg rounded-full transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                  <FiUser size={18} className="text-white" />
                </div>
                {isLoggedIn && userData && (
                  <span className="text-sm font-medium text-gray-700 hidden lg:block">
                    {userData.firstName}
                  </span>
                )}
              </motion.button>
              
              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl py-3 z-30 text-gray-800 border border-gray-100"
                  >
                    {isLoggedIn && userData ? (
                      <>
                        <div className="px-4 py-4 border-b border-gray-100">
                          <p className="font-semibold text-gray-800">Welcome back, {userData.firstName}!</p>
                          <p className="text-sm text-gray-600">{userData.email}</p>
                        </div>
                        <Link to="/account" className="block px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer hover:text-blue-600">
                          My Account
                        </Link>
                        <Link to="/orders" className="block px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer hover:text-blue-600">
                          My Orders
                        </Link>
                        <Link to="/wishlist" className="block px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer hover:text-blue-600">
                          Wishlist
                        </Link>
                        <div className="border-t border-gray-100 mt-1">
                          <Link to="/settings" className="block px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer hover:text-blue-600">
                            Settings
                          </Link>
                          <Link to="/support" className="block px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer hover:text-blue-600">
                            Help Center
                          </Link>
                          <button 
                            onClick={() => {
                              setisLoggedIn(false);
                              setUserData(null);
                              setIsUserDropdownOpen(false);
                              navigate('/');
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 text-red-600 transition-colors cursor-pointer hover:bg-red-50"
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-4 border-b border-gray-100">
                          <p className="font-semibold text-gray-800">Welcome Guest!</p>
                          <p className="text-sm text-gray-600">Sign in to your account</p>
                        </div>
                        <Link to="/login" className="block px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer hover:text-blue-600">
                          Sign In
                        </Link>
                        <Link to="/register" className="block px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer hover:text-blue-600">
                          Create Account
                        </Link>
                        <div className="border-t border-gray-100 mt-1">
                          <Link to="/support" className="block px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer hover:text-blue-600">
                            Help Center
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="navbar-icon p-3 text-gray-700 rounded-full hover:bg-white/80 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4"
            onClick={() => setIsMobileSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Search</h3>
                <button
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Search Input */}
              <div className="relative mb-4">
                <div className="flex items-center bg-gray-50 rounded-xl px-3 py-3 border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
                  <FiSearch className="text-gray-400 mr-2 text-lg" />
                  <form onSubmit={(e) => {
                    handleSearch(e);
                    setIsMobileSearchOpen(false);
                  }} className="flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={e => {
                        // Prevent space key from triggering other actions
                        if (e.key === ' ') {
                          e.stopPropagation();
                        }
                      }}
                      placeholder="Search products..."
                      className="bg-transparent border-none focus:outline-none w-full text-gray-700 placeholder-gray-400 text-base font-medium"
                      autoFocus
                    />
                  </form>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-1 p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <FiX className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Search Options */}
              {searchQuery && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleSearch({ preventDefault: () => {} });
                      setIsMobileSearchOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    <div className="font-medium text-blue-800">Search "{searchQuery}"</div>
                    <div className="text-xs text-blue-600">Search all products</div>
                  </button>
                  
                  <div className="text-xs text-gray-500 mb-2">Search in categories:</div>
                  
                  <button
                    onClick={() => {
                      setSearchQuery(searchQuery + ' fashion');
                      handleSearch({ preventDefault: () => {} });
                      setIsMobileSearchOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <span className="font-medium">{searchQuery}</span> in Fashion
                  </button>
                  <button
                    onClick={() => {
                      setSearchQuery(searchQuery + ' electronics');
                      handleSearch({ preventDefault: () => {} });
                      setIsMobileSearchOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <span className="font-medium">{searchQuery}</span> in Electronics
                  </button>
                </div>
              )}

              {/* Popular Searches */}
              {!searchQuery && (
                <div>
                  <div className="text-xs text-gray-500 mb-2">Popular searches:</div>
                  <div className="flex flex-wrap gap-2">
                    {['iPhone', 'Laptop', 'Shoes', 'Dress'].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          handleSearch({ preventDefault: () => {} });
                          setIsMobileSearchOpen(false);
                        }}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;