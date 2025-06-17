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
  FiTrendingUp
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';

const Navbar = ({ onMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, userData, setisLoggedIn, setUserData } = useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <FiTrendingUp /> },
    { name: 'New Arrivals', href: '/new', icon: <FiGift /> },
    { name: 'Deals', href: '/deals', icon: <FiStar /> },
  ];

  const categories = [
    { name: 'Electronics', icon: '📱', subcategories: ['Phones', 'Laptops', 'Cameras'] },
    { name: 'Fashion', icon: '👗', subcategories: ['Men', 'Women', 'Kids'] },
    { name: 'Home', icon: '🏠', subcategories: ['Furniture', 'Decor', 'Kitchen'] },
    { name: 'Beauty', icon: '💄', subcategories: ['Skincare', 'Makeup', 'Haircare'] },
    { name: 'Sports', icon: '⚽', subcategories: ['Fitness', 'Outdoor', 'Team Sports'] },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleMenuToggle = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (onMenuToggle) {
      onMenuToggle(newState);
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${
      isScrolled 
        ? 'shadow-2xl bg-gradient-to-r from-blue-100/95 to-purple-100/95 backdrop-blur-md' 
        : 'bg-gradient-to-r from-blue-50 to-purple-50'
    }`}>
      {/* Announcement Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-white text-center py-3 text-sm font-bold"
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
              className="ml-2 font-extrabold hover:underline underline-offset-4 decoration-2 flex items-center"
            >
              SHOP NOW
            </Link>
          </motion.span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Click to navigate back to home page using useNavigate for reliability */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
            <button
              onClick={() => {
                console.log('Navbar logo clicked - navigating to home page');
                navigate('/');
              }}
              className="text-2xl font-bold text-gray-800 flex items-center bg-transparent border-none p-0 m-0 cursor-pointer"
              style={{ background: 'none' }}
            >
              <span className="bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-xl px-3 py-1 mr-3 shadow-lg">
                ✨
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-extrabold">
                LuxeCart
              </span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -3 }}
              >
                <Link
                  to={link.href}
                  className="px-4 py-3 rounded-xl font-medium hover:bg-white/50 transition-all text-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {/* Categories Dropdown */}
            <motion.div className="relative">
              <button 
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="px-4 py-3 rounded-xl font-medium hover:bg-white/50 transition-all flex items-center text-gray-700"
              >
                <span className="mr-2">📦</span>
                Categories
                <FiChevronDown className="ml-1" />
              </button>
              
              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute left-0 mt-3 w-72 bg-white rounded-2xl shadow-xl py-3 z-30 text-gray-800"
                  >
                    {categories.map((category) => (
                      <div key={category.name} className="group">
                        <Link 
                          to={`/category/${category.name.toLowerCase()}`}
                          className="block px-4 py-3 hover:bg-gray-50 flex items-center"
                        >
                          <span className="text-2xl mr-3">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </Link>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </nav>

          {/* Icons Group */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-white/70 rounded-full px-4 py-2.5 border border-gray-200">
              <FiSearch className="text-gray-500 mr-3 text-lg" />
              <form onSubmit={handleSearch} className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search luxury items..."
                  className="bg-transparent border-none focus:outline-none w-64 px-1 text-gray-700 placeholder-gray-500 text-sm"
                />
              </form>
            </div>

            {/* Wishlist */}
            <button className="p-3 relative text-gray-700 hover:bg-white/50 rounded-full">
              <FiHeart size={22} />
            </button>

            {/* Cart */}
            <button className="p-3 relative text-gray-700 hover:bg-white/50 rounded-full">
              <FiShoppingCart size={22} />
            </button>

            {/* User Dropdown */}
            <div className="relative hidden md:block">
              <button 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-white/50 rounded-full"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <FiUser size={18} className="text-white" />
                </div>
                {isLoggedIn && userData && (
                  <span className="text-sm font-medium text-gray-700 hidden lg:block">
                    {userData.firstName}
                  </span>
                )}
              </button>
              
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl py-3 z-30 text-gray-800">
                  {isLoggedIn && userData ? (
                    <>
                      <div className="px-4 py-4 border-b">
                        <p className="font-semibold">Welcome back, {userData.firstName}!</p>
                        <p className="text-sm text-gray-600">{userData.email}</p>
                      </div>
                      <Link to="/account" className="block px-4 py-3 hover:bg-gray-50">
                        My Account
                      </Link>
                      <Link to="/orders" className="block px-4 py-3 hover:bg-gray-50">
                        My Orders
                      </Link>
                      <Link to="/wishlist" className="block px-4 py-3 hover:bg-gray-50">
                        Wishlist
                      </Link>
                      <div className="border-t mt-1">
                        <Link to="/settings" className="block px-4 py-3 hover:bg-gray-50">
                          Settings
                        </Link>
                        <Link to="/support" className="block px-4 py-3 hover:bg-gray-50">
                          Help Center
                        </Link>
                        <button 
                          onClick={() => {
                            setisLoggedIn(false);
                            setUserData(null);
                            setIsUserDropdownOpen(false);
                            navigate('/');
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 text-red-600"
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-4 border-b">
                        <p className="font-semibold">Welcome Guest!</p>
                        <p className="text-sm text-gray-600">Sign in to your account</p>
                      </div>
                      <Link to="/login" className="block px-4 py-3 hover:bg-gray-50">
                        Sign In
                      </Link>
                      <Link to="/register" className="block px-4 py-3 hover:bg-gray-50">
                        Create Account
                      </Link>
                      <div className="border-t mt-1">
                        <Link to="/support" className="block px-4 py-3 hover:bg-gray-50">
                          Help Center
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Menu Button */}
            <button
              className="p-3 text-gray-700 rounded-full"
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;