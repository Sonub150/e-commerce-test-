import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiArrowRight } from 'react-icons/fi';

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Sample images - using your local images from public folder
  const slides = [
    {
      id: 1,
      image: '/s1.jpg',
      title: 'Welcome to Our Platform',
      subtitle: 'Discover amazing features and services',
      description: 'Experience the best in technology and innovation',
      buttonText: 'Get Started',
      buttonLink: '/register'
    },
    {
      id: 2,
      image: '/s2.jpg',
      title: 'Modern Solutions',
      subtitle: 'Cutting-edge technology at your fingertips',
      description: 'Stay ahead with our innovative solutions',
      buttonText: 'Explore Features',
      buttonLink: '/features'
    },
    {
      id: 3,
      image: '/s3.jpg',
      title: 'Expert Team',
      subtitle: 'Professional and dedicated support',
      description: 'Our team is here to help you succeed',
      buttonText: 'Meet Our Team',
      buttonLink: '/team'
    },
    {
      id: 4,
      image: '/s4.jpg',
      title: 'Global Reach',
      subtitle: 'Connecting people worldwide',
      description: 'Join our global community today',
      buttonText: 'Join Community',
      buttonLink: '/community'
    },
    {
      id: 5,
      image: '/s5.jpg',
      title: 'Data Analytics',
      subtitle: 'Insights that drive success',
      description: 'Make informed decisions with our analytics',
      buttonText: 'View Analytics',
      buttonLink: '/analytics'
    },
    {
      id: 6,
      image: '/s6.jpg',
      title: 'Innovation Hub',
      subtitle: 'Where ideas become reality',
      description: 'Transform your vision into success',
      buttonText: 'Start Innovating',
      buttonLink: '/innovation'
    },
    {
      id: 7,
      image: '/s7.jpg',
      title: 'Quality Assurance',
      subtitle: 'Excellence in every detail',
      description: 'We deliver the highest quality solutions',
      buttonText: 'Learn More',
      buttonLink: '/quality'
    },
    {
      id: 8,
      image: '/s8.webp',
      title: 'Future Ready',
      subtitle: 'Preparing for tomorrow today',
      description: 'Embrace the future with confidence',
      buttonText: 'Future Plans',
      buttonLink: '/future'
    },
    {
      id: 9,
      image: '/s9.webp',
      title: 'Success Stories',
      subtitle: 'Building dreams together',
      description: 'Join thousands of satisfied customers',
      buttonText: 'Success Stories',
      buttonLink: '/stories'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
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
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
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
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-4"
              >
                <span className="inline-block bg-blue-600/20 backdrop-blur-sm text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">
                  Slide {currentSlide + 1} of {slides.length}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4 text-blue-300"
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button 
                  onClick={() => window.location.href = slides[currentSlide].buttonLink}
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center gap-2 text-sm md:text-base"
                >
                  {slides[currentSlide].buttonText}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={() => window.location.href = '/about'}
                  className="bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-sm md:text-base"
                >
                  Learn More
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110 group"
      >
        <FiChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110 group"
      >
        <FiChevronRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110"
      >
        {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
              index === currentSlide 
                ? 'bg-white scale-125 border-white shadow-lg shadow-white/50' 
                : 'bg-white/30 border-white/50 hover:bg-white/50 hover:border-white/75 hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default HomeSlider;
