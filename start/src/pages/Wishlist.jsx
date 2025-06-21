import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import ProductModal from '../components/ProductModal';
import axios from 'axios';
import { FiStar, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useWishlist } from '../context/Appcontext';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { wishlist, setWishlist } = useWishlist();

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
                      <button
                        onClick={() => openProductModal(product)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                      >
                        <FiShoppingCart className="w-5 h-5" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={closeProductModal} />
      )}
      <Footer />
    </div>
  );
};

export default Wishlist; 