import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRotateCcw, FiShare2, FiMinus, FiPlus } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const ProductDetail = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const handleMenuToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Mock product data - in real app, this would come from API
  const getProductData = () => {
    const products = {
      fashion: [
        {
          id: 1,
          name: "Premium Cotton T-Shirt",
          images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop"
          ],
          price: 29.99,
          originalPrice: 39.99,
          discount: 25,
          rating: 4.8,
          reviews: 156,
          category: "T-Shirts",
          brand: "Fashion Brand",
          description: "Premium quality cotton t-shirt with a comfortable fit. Perfect for everyday wear, this t-shirt features a classic design that never goes out of style. Made from 100% organic cotton for maximum comfort and breathability.",
          features: [
            "100% Organic Cotton",
            "Comfortable fit",
            "Machine washable",
            "Available in multiple sizes",
            "Eco-friendly material"
          ],
          sizes: ["XS", "S", "M", "L", "XL", "XXL"],
          colors: ["White", "Black", "Navy", "Gray"],
          inStock: true,
          sku: "TSH-001",
          weight: "180g",
          material: "100% Cotton"
        }
      ],
      electronics: [
        {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"
          ],
          price: 89.99,
          originalPrice: 129.99,
          discount: 31,
          rating: 4.8,
          reviews: 234,
          category: "Headphones",
          brand: "AudioTech",
          description: "Premium wireless headphones with active noise cancellation. Experience crystal clear sound with deep bass and crisp highs. Features include 30-hour battery life, quick charging, and comfortable over-ear design.",
          features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Quick charging (10 min = 5 hours)",
            "Bluetooth 5.0",
            "Built-in microphone"
          ],
          sizes: ["One Size"],
          colors: ["Black", "White", "Blue"],
          inStock: true,
          sku: "HP-001",
          weight: "250g",
          material: "Premium Plastic & Metal"
        }
      ]
    };

    return products[category]?.find(p => p.id === parseInt(productId)) || products.fashion[0];
  };

  useEffect(() => {
    const productData = getProductData();
    setProduct(productData);
    
    // Mock related products
    setRelatedProducts([
      {
        id: 2,
        name: "Related Product 1",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        price: 24.99,
        originalPrice: 34.99,
        discount: 29,
        rating: 4.6,
        reviews: 89
      },
      {
        id: 3,
        name: "Related Product 2",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
        price: 34.99,
        originalPrice: 44.99,
        discount: 22,
        rating: 4.7,
        reviews: 123
      },
      {
        id: 4,
        name: "Related Product 3",
        image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
        price: 19.99,
        originalPrice: 29.99,
        discount: 33,
        rating: 4.5,
        reviews: 67
      }
    ]);
  }, [category, productId]);

  const addToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const addToWishlist = () => {
    console.log(`Added ${product.name} to wishlist`);
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Home
                </button>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <button
                    onClick={() => navigate(`/${category}`)}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 capitalize"
                  >
                    {category}
                  </button>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm font-medium text-gray-500">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 mb-4">by {product.brand}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <FiStar className="text-yellow-400 w-5 h-5 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    -{product.discount}%
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selection */}
              {product.sizes.length > 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Size</h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                          selectedColor === color
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100"
                    >
                      <FiMinus className="w-4 h-4" />
                    </motion.button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <FiPlus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addToWishlist}
                  className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  <FiHeart className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareProduct}
                  className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  <FiShare2 className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <FiTruck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiShield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">2-year warranty included</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiRotateCcw className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">30-day return policy</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium">{product.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Material:</span>
                  <span className="font-medium">{product.material}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/${category}/${relatedProduct.id}`)}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{relatedProduct.discount}%
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {relatedProduct.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-400 w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{relatedProduct.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({relatedProduct.reviews} reviews)</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-gray-900">${relatedProduct.price}</span>
                        <span className="text-lg text-gray-500 line-through">${relatedProduct.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail; 