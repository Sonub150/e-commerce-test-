import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import ProductModal from '../components/ProductModal';
import axios from 'axios';
import { FiStar, FiHeart, FiShoppingCart, FiEye, FiArrowRight, FiX } from 'react-icons/fi';
import { useWishlist } from '../context/Appcontext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const { wishlist, setWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(res => {
        setProducts(res.data.data.products || []);
      })
      .catch(() => setProducts([]));
  }, []);

  const wishlistProducts = products.filter(product => wishlist.includes(product._id || product.id));

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle add to cart with popup
  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1
    });
    
    setAddedProduct(product);
    setShowCartPopup(true);
    
    // Auto hide popup after 3 seconds
    setTimeout(() => {
      setShowCartPopup(false);
      setAddedProduct(null);
    }, 3000);
  };

  // Navigate to product details page
  const navigateToProductDetails = (product) => {
    navigate(`/category/${product.category}?product=${product._id}`);
  };

  // Navigate to cart
  const navigateToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={setSidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-5xl md:text-7xl font-bold text-pink-600 mb-6 text-center">
            My Wishlist
          </h1>
          {wishlistProducts.length === 0 ? (
            <div className="text-center text-gray-500 text-xl mt-16">
              <FiHeart className="mx-auto mb-4 w-12 h-12 text-pink-300" />
              Your wishlist is empty. Start adding products you love!
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
              {wishlistProducts.map((product, index) => (
                <div
                  key={product._id || product.id}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative">
                    {/* Discount Badge */}
                    {product.discountPrice && product.price && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          -{Math.round(100 - (product.discountPrice / product.price) * 100)}%
                        </div>
                      </div>
                    )}
                    {/* Brand Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        {product.brand}
                      </div>
                    </div>
                    <div className="relative h-64 overflow-hidden flex items-center justify-center">
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                        onClick={() => openProductModal(product)}
                      />
                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                          {product.name}
                        </h3>
                        <button
                          className={`p-2 rounded-full transition-colors focus:outline-none ${wishlist.includes(product._id || product.id) ? 'bg-pink-100 text-pink-500' : 'hover:bg-gray-100 text-gray-600'}`}
                          onClick={e => { e.stopPropagation(); toggleWishlist(product._id || product.id); }}
                          aria-label="Remove from wishlist"
                        >
                          <FiHeart className={`w-5 h-5 ${wishlist.includes(product._id || product.id) ? 'fill-pink-500' : ''}`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-400 w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.numReviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        {product.discountPrice && (
                          <span className="text-lg text-gray-500 line-through">${product.discountPrice}</span>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                        >
                          <FiShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); navigateToProductDetails(product); }}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                        >
                          <FiEye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="flex items-center justify-between mt-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); openProductModal(product); }}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                        >
                          Quick View
                          <FiArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); navigateToCart(); }}
                          className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                        >
                          Go to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Cart Popup */}
      {showCartPopup && addedProduct && (
        <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-sm animate-slide-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FiShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">Added to Cart!</h4>
              <p className="text-sm text-gray-600">{addedProduct.name}</p>
            </div>
            <button
              onClick={() => setShowCartPopup(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setShowCartPopup(false);
                navigateToCart();
              }}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              View Cart
            </button>
            <button
              onClick={() => setShowCartPopup(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
      
      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          isOpen={isModalOpen} 
          onClose={closeProductModal}
          onToggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      )}
      <Footer />
    </div>
  );
};

export default Wishlist; 