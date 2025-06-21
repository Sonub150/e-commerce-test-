import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch, useWishlist } from '../context/Appcontext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { FiSearch, FiStar, FiHeart, FiShoppingCart } from 'react-icons/fi';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const { wishlist, setWishlist } = useWishlist();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get search query from URL or context
  const query = searchParams.get('q') || searchQuery || '';

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    // Fetch all products and filter by search query
    axios.get('http://localhost:8080/api/products')
      .then(res => {
        const allProducts = res.data.data?.products || [];
        
        // Filter products based on search query
        const searchResults = allProducts.filter(product => {
          const searchTerm = query.toLowerCase();
          return (
            product.name?.toLowerCase().includes(searchTerm) ||
            product.description?.toLowerCase().includes(searchTerm) ||
            product.brand?.toLowerCase().includes(searchTerm) ||
            product.category?.toLowerCase().includes(searchTerm)
          );
        });
        
        setProducts(searchResults);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Failed to load search results');
        setLoading(false);
      });
  }, [query]);

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1
    });
  };

  // Handle wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Get product image
  const getProductImage = (product) => {
    const imageUrl = product.images?.[0]?.url || 
                    product.images?.[0] || 
                    product.image || 
                    product.img ||
                    null;
    
    return imageUrl || 'https://via.placeholder.com/300x300?text=No+Image';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Searching for amazing products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600 mb-4">
            Found {products.length} product{products.length !== 1 ? 's' : ''}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mb-6">
            <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200">
              <FiSearch className="text-gray-500 ml-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
                }}
                placeholder="Search products, brands, categories..."
                className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* No Results */}
        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms
            </p>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-48">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Discount Badge */}
                  {product.discountPrice && product.discountPrice < product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <FiHeart 
                      className={`w-4 h-4 ${
                        wishlist.includes(product._id) ? 'text-red-500 fill-current' : 'text-gray-600'
                      }`} 
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < (product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.rating || 0})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-800">
                      ${product.discountPrice || product.price}
                    </span>
                    {product.discountPrice && product.discountPrice < product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{product.category}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults; 