import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar, FiChevronLeft, FiChevronRight, FiFilter, FiGrid, FiList, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import ProductModal from '../components/ProductModal';

const Shoes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageIndices, setImageIndices] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const navigate = useNavigate();

  const handleMenuToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndices(prev => {
        const newIndices = {};
        shoesProducts.forEach(product => {
          const currentIndex = prev[product.id] || 0;
          newIndices[product.id] = (currentIndex + 1) % product.images.length;
        });
        return newIndices;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const shoesProducts = [
    {
      id: 1,
      name: "Nike Air Max 270",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop"
      ],
      price: 129.99,
      originalPrice: 159.99,
      discount: 19,
      rating: 4.8,
      reviews: 234,
      category: "Sneakers",
      brand: "Nike",
      description: "The Nike Air Max 270 delivers unrivaled comfort with its large Air unit and breathable mesh upper. Perfect for everyday wear and casual activities.",
      features: [
        "Large Air unit for maximum cushioning",
        "Breathable mesh upper",
        "Foam midsole for lightweight comfort",
        "Rubber outsole for durability",
        "Available in multiple colorways"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Black", "White", "Red", "Blue"]
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop"
      ],
      price: 179.99,
      originalPrice: 219.99,
      discount: 18,
      rating: 4.9,
      reviews: 189,
      category: "Running",
      brand: "Adidas",
      description: "The Adidas Ultraboost features responsive Boost midsole technology and a Primeknit upper for a sock-like fit. Ideal for long-distance running.",
      features: [
        "Boost midsole for energy return",
        "Primeknit upper for breathability",
        "Continental rubber outsole",
        "Heel counter for stability",
        "Reflective details for visibility"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Black", "White", "Grey", "Blue"]
    },
    {
      id: 3,
      name: "Jordan Air 1",
      images: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop"
      ],
      price: 169.99,
      originalPrice: 199.99,
      discount: 15,
      rating: 4.7,
      reviews: 156,
      category: "Basketball",
      brand: "Jordan",
      description: "The iconic Jordan Air 1 combines classic style with modern comfort. Features Air-Sole unit in the midsole and premium leather upper.",
      features: [
        "Air-Sole unit in midsole",
        "Premium leather upper",
        "Rubber outsole with pivot points",
        "Wings logo on ankle",
        "Classic basketball silhouette"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Red", "Black", "White", "Blue"]
    },
    {
      id: 4,
      name: "Converse Chuck Taylor",
      images: [
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop"
      ],
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.6,
      reviews: 123,
      category: "Casual",
      brand: "Converse",
      description: "The timeless Converse Chuck Taylor All Star features a canvas upper and vulcanized rubber sole. A classic that never goes out of style.",
      features: [
        "Canvas upper",
        "Vulcanized rubber sole",
        "Metal eyelets",
        "All Star patch on ankle",
        "Available in high and low top"
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: ["Black", "White", "Navy", "Red"]
    },
    {
      id: 5,
      name: "Vans Old Skool",
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop"
      ],
      price: 64.99,
      originalPrice: 84.99,
      discount: 24,
      rating: 4.5,
      reviews: 98,
      category: "Skate",
      brand: "Vans",
      description: "The Vans Old Skool features the iconic side stripe and durable canvas upper. Perfect for skating and casual wear.",
      features: [
        "Canvas and suede upper",
        "Iconic side stripe",
        "Vulcanized rubber sole",
        "Padded collar for comfort",
        "Durable construction"
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: ["Black", "White", "Checkerboard", "Navy"]
    },
    {
      id: 6,
      name: "New Balance 990",
      images: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
      ],
      price: 189.99,
      originalPrice: 229.99,
      discount: 17,
      rating: 4.8,
      reviews: 167,
      category: "Running",
      brand: "New Balance",
      description: "The New Balance 990 features ENCAP midsole technology and premium suede upper. Made in the USA for superior quality.",
      features: [
        "ENCAP midsole technology",
        "Premium suede upper",
        "Made in the USA",
        "Dual density collar",
        "Blown rubber outsole"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Grey", "Navy", "Black", "White"]
    },
    {
      id: 7,
      name: "Puma RS-X",
      images: [
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
      ],
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.4,
      reviews: 145,
      category: "Sneakers",
      brand: "Puma",
      description: "The Puma RS-X features bold retro styling with enhanced cushioning. Perfect for making a statement with your outfit.",
      features: [
        "Retro-inspired design",
        "Enhanced cushioning",
        "Bold color combinations",
        "Leather and mesh upper",
        "Rubber outsole"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["White", "Black", "Red", "Blue"]
    },
    {
      id: 8,
      name: "Reebok Classic",
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
      ],
      price: 69.99,
      originalPrice: 89.99,
      discount: 22,
      rating: 4.3,
      reviews: 134,
      category: "Casual",
      brand: "Reebok",
      description: "The Reebok Classic features a leather upper and soft foam midsole. A timeless design that's comfortable for everyday wear.",
      features: [
        "Leather upper",
        "Soft foam midsole",
        "Rubber outsole",
        "Padded collar",
        "Classic design"
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
      colors: ["White", "Black", "Navy", "Grey"]
    },
    {
      id: 9,
      name: "ASICS Gel-Kayano",
      images: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
      ],
      price: 159.99,
      originalPrice: 199.99,
      discount: 20,
      rating: 4.7,
      reviews: 89,
      category: "Running",
      brand: "ASICS",
      description: "The ASICS Gel-Kayano provides exceptional stability and cushioning for overpronators. Features GEL technology and Dynamic DuoMax support.",
      features: [
        "GEL technology for cushioning",
        "Dynamic DuoMax support",
        "FluidRide midsole",
        "Guidance Line technology",
        "AHAR outsole"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Grey", "Blue", "Black", "White"]
    },
    {
      id: 10,
      name: "Brooks Ghost",
      images: [
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
      ],
      price: 119.99,
      originalPrice: 149.99,
      discount: 20,
      rating: 4.6,
      reviews: 178,
      category: "Running",
      brand: "Brooks",
      description: "The Brooks Ghost offers smooth transitions and balanced cushioning. Perfect for neutral runners seeking comfort and performance.",
      features: [
        "DNA LOFT cushioning",
        "Engineered mesh upper",
        "Segmented crash pad",
        "3D Fit Print technology",
        "Green Rubber outsole"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Grey", "Blue", "Black", "White"]
    },
    {
      id: 11,
      name: "Saucony Ride",
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
      ],
      price: 109.99,
      originalPrice: 139.99,
      discount: 21,
      rating: 4.5,
      reviews: 123,
      category: "Running",
      brand: "Saucony",
      description: "The Saucony Ride features PWRRUN cushioning and FORMFIT technology for a personalized fit. Lightweight and responsive.",
      features: [
        "PWRRUN cushioning",
        "FORMFIT technology",
        "Engineered mesh upper",
        "TRI-FLEX outsole",
        "Lightweight construction"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Blue", "Grey", "Black", "White"]
    },
    {
      id: 12,
      name: "Hoka Clifton",
      images: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
      ],
      price: 129.99,
      originalPrice: 159.99,
      discount: 19,
      rating: 4.8,
      reviews: 98,
      category: "Running",
      brand: "Hoka",
      description: "The Hoka Clifton features maximum cushioning with minimal weight. The meta-rocker geometry promotes natural running motion.",
      features: [
        "Maximum cushioning",
        "Lightweight construction",
        "Meta-rocker geometry",
        "Engineered mesh upper",
        "Compression molded EVA midsole"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["White", "Black", "Blue", "Grey"]
    },
    {
      id: 13,
      name: "On Cloud",
      images: [
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
      ],
      price: 139.99,
      originalPrice: 169.99,
      discount: 18,
      rating: 4.7,
      reviews: 156,
      category: "Running",
      brand: "On",
      description: "The On Cloud features CloudTec technology with zero-gravity foam for a unique running experience. Lightweight and responsive.",
      features: [
        "CloudTec technology",
        "Zero-gravity foam",
        "Speedboard technology",
        "Engineered mesh upper",
        "Reflective details"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["White", "Black", "Grey", "Blue"]
    },
    {
      id: 14,
      name: "Salomon Speedcross",
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
      ],
      price: 119.99,
      originalPrice: 149.99,
      discount: 20,
      rating: 4.6,
      reviews: 134,
      category: "Trail",
      brand: "Salomon",
      description: "The Salomon Speedcross features aggressive lugs and Quicklace system for trail running. Perfect for off-road adventures.",
      features: [
        "Aggressive Contagrip outsole",
        "Quicklace system",
        "Sensitive ride",
        "Breathable mesh upper",
        "Protective toe cap"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Black", "Blue", "Red", "Grey"]
    },
    {
      id: 15,
      name: "Merrell Moab",
      images: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
      ],
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      rating: 4.5,
      reviews: 167,
      category: "Hiking",
      brand: "Merrell",
      description: "The Merrell Moab features Vibram outsole and breathable mesh upper. Perfect for hiking and outdoor activities.",
      features: [
        "Vibram outsole",
        "Breathable mesh upper",
        "M Select DRY waterproofing",
        "Air cushion in heel",
        "Protective toe cap"
      ],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Brown", "Black", "Grey", "Green"]
    }
  ];

  const categories = ['All', 'Sneakers', 'Running', 'Basketball', 'Casual', 'Skate', 'Trail', 'Hiking'];
  const brands = ['All', 'Nike', 'Adidas', 'Jordan', 'Converse', 'Vans', 'New Balance', 'Puma', 'Reebok', 'ASICS', 'Brooks', 'Saucony', 'Hoka', 'On', 'Salomon', 'Merrell'];

  const filteredProducts = selectedCategory === 'All' 
    ? shoesProducts 
    : shoesProducts.filter(product => product.category === selectedCategory);

  // Pagination logic - 12 products per page (3x4 grid)
  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToProductDetail = (productId) => {
    navigate(`/shoes/${productId}`);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6"
              >
                Step into
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Style
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              >
                Discover the perfect pair of shoes for every occasion. From running to casual, we've got you covered.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                  <span className="font-semibold">{filteredProducts.length}</span> Products
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                  <span className="font-semibold">8</span> Categories
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                  <span className="font-semibold">15</span> Brands
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters and Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button 
                    key={category} 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => setSelectedCategory(category)} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <FiGrid className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <FiList className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {currentProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.05 }} 
                whileHover={{ y: -5 }} 
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative">
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      -{product.discount}%
                    </div>
                  </div>

                  {/* Brand Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      {product.brand}
                    </div>
                  </div>

                  <div className="relative h-64 overflow-hidden">
                    {/* Auto-sliding Image */}
                    <div className="relative h-full">
                      <motion.img
                        key={`${product.id}-${imageIndices[product.id] || 0}`}
                        src={product.images[imageIndices[product.id] || 0]}
                        alt={product.name}
                        className="w-full h-full object-cover cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => openProductModal(product)}
                      />
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                        {(imageIndices[product.id] || 0) + 1} / {product.images.length}
                      </div>

                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <FiHeart className="w-5 h-5 text-gray-600" />
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-400 w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }} 
                      onClick={() => goToProductDetail(product.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200 shadow-sm'
                }`}
              >
                <FiChevronLeft className="w-5 h-5" />
              </motion.button>

              {renderPagination().map((page, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : page === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200 shadow-sm'
                  }`}
                >
                  {page}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200 shadow-sm'
                }`}
              >
                <FiChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}

          <div className="text-center mt-8 text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeProductModal} 
      />

      <Footer />
    </div>
  );
};

export default Shoes; 