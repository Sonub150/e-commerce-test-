import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiArrowRight, FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Enhanced slides with product/category links
  const slides = [
    {
      id: 1,
      image: '/s1.jpg',
      title: 'Fashion Collection',
      subtitle: 'Latest Trends & Styles',
      description: 'Discover the newest fashion trends with our exclusive collection',
      buttonText: 'Shop Fashion',
      buttonLink: '/category/Fashion',
      secondaryButtonText: 'View All',
      secondaryButtonLink: '/category/Fashion',
      category: 'Fashion',
      badge: 'New Collection',
      badgeColor: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      image: '/s2.jpg',
      title: 'Electronics Deals',
      subtitle: 'Up to 50% Off',
      description: 'Get the latest gadgets and electronics at unbeatable prices',
      buttonText: 'Shop Electronics',
      buttonLink: '/category/Electronics',
      secondaryButtonText: 'View Deals',
      secondaryButtonLink: '/category/Electronics',
      category: 'Electronics',
      badge: 'Flash Sale',
      badgeColor: 'from-blue-500 to-indigo-500'
    },
    {
      id: 3,
      image: '/s3.jpg',
      title: 'Home & Living',
      subtitle: 'Transform Your Space',
      description: 'Create the perfect home with our premium furniture and decor',
      buttonText: 'Shop Home',
      buttonLink: '/category/Home Appliances',
      secondaryButtonText: 'Get Inspired',
      secondaryButtonLink: '/category/Home Appliances',
      category: 'Home Appliances',
      badge: 'Best Seller',
      badgeColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      image: '/s4.jpg',
      title: 'Beauty & Fashion',
      subtitle: 'Beauty Essentials',
      description: 'Discover premium beauty products and fashion accessories',
      buttonText: 'Shop Beauty',
      buttonLink: '/category/Beauty & Fashion',
      secondaryButtonText: 'Explore',
      secondaryButtonLink: '/category/Beauty & Fashion',
      category: 'Beauty & Fashion',
      badge: 'Trending',
      badgeColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 5,
      image: '/s5.jpg',
      title: 'Sports & Fitness',
      subtitle: 'Active Lifestyle',
      description: 'Stay fit and active with our premium sports equipment',
      buttonText: 'Shop Sports',
      buttonLink: '/category/Sports',
      secondaryButtonText: 'Get Active',
      secondaryButtonLink: '/category/Sports',
      category: 'Sports',
      badge: 'Hot Deal',
      badgeColor: 'from-orange-500 to-red-500'
    },
    {
      id: 6,
      image: '/s6.jpg',
      title: 'Footwear Collection',
      subtitle: 'Step in Style',
      description: 'Walk in comfort and style with our exclusive footwear collection',
      buttonText: 'Shop Shoes',
      buttonLink: '/category/Footwear',
      secondaryButtonText: 'Browse All',
      secondaryButtonLink: '/category/Footwear',
      category: 'Footwear',
      badge: 'New Arrival',
      badgeColor: 'from-teal-500 to-cyan-500'
    },
    {
      id: 7,
      image: '/s7.jpg',
      title: 'Special Offers',
      subtitle: 'Limited Time Deals',
      description: 'Don\'t miss out on our exclusive limited-time offers',
      buttonText: 'View Offers',
      buttonLink: '/category/Fashion',
      secondaryButtonText: 'Shop Now',
      secondaryButtonLink: '/category/Electronics',
      category: 'Special Offers',
      badge: 'Limited Time',
      badgeColor: 'from-red-500 to-pink-500'
    },
    {
      id: 8,
      image: '/s8.webp',
      title: 'New Arrivals',
      subtitle: 'Fresh & Trending',
      description: 'Be the first to discover our latest arrivals and trending items',
      buttonText: 'Shop New',
      buttonLink: '/category/Fashion',
      secondaryButtonText: 'Explore',
      secondaryButtonLink: '/category/Electronics',
      category: 'New Arrivals',
      badge: 'Just In',
      badgeColor: 'from-indigo-500 to-purple-500'
    },
    {
      id: 9,
      image: '/s9.webp',
      title: 'Customer Favorites',
      subtitle: 'Most Loved Products',
      description: 'Shop our customer favorites and best-selling items',
      buttonText: 'Shop Favorites',
      buttonLink: '/category/Fashion',
      secondaryButtonText: 'See All',
      secondaryButtonLink: '/category/Electronics',
      category: 'Customer Favorites',
      badge: 'Top Rated',
      badgeColor: 'from-yellow-500 to-orange-500'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Enhanced navigation functions
  const handleSlideClick = (slide) => {
    if (slide.buttonLink) {
      navigate(slide.buttonLink);
    }
  };

  const handleSecondaryClick = (slide) => {
    if (slide.secondaryButtonLink) {
      navigate(slide.secondaryButtonLink);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't handle keyboard events if user is typing in an input field
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case ' ':
          event.preventDefault();
          togglePlayPause();
          break;
        case 'Enter':
          handleSlideClick(slides[currentSlide]);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [prevSlide, nextSlide, togglePlayPause, slides, currentSlide]);

  return (
    <div 
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 to-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => handleSlideClick(slides[currentSlide])}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4 max-w-5xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="mb-4"
              >
                <span className={`inline-block bg-gradient-to-r ${slides[currentSlide].badgeColor} backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 shadow-lg`}>
                  {slides[currentSlide].badge}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4 text-blue-300"
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSlideClick(slides[currentSlide]);
                  }}
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center gap-2 text-sm md:text-base cursor-pointer"
                >
                  {slides[currentSlide].buttonText}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSecondaryClick(slides[currentSlide]);
                  }}
                  className="bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-sm md:text-base cursor-pointer"
                >
                  {slides[currentSlide].secondaryButtonText}
                </button>
              </motion.div>

              {/* Quick Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="flex justify-center gap-4 mt-6"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(slides[currentSlide].category);
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  title={`Shop ${slides[currentSlide].category}`}
                >
                  <FiShoppingCart className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/wishlist');
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  title="Add to Wishlist"
                >
                  <FiHeart className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSlideClick(slides[currentSlide]);
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  title="Quick View"
                >
                  <FiEye className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110 group z-20"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110 group z-20"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110 z-20"
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
              index === currentSlide 
                ? 'bg-white scale-125 border-white shadow-lg shadow-white/50' 
                : 'bg-white/30 border-white/50 hover:bg-white/50 hover:border-white/75 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20 z-20">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Loading indicator for images */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: slides[currentSlide]?.image ? 0 : 1 }}
          className="text-white text-lg"
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
};

export default HomeSlider;
