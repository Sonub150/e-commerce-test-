import React, { useEffect, useState } from 'react';
import { useSearch } from '../context/Appcontext';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://e-commerce-test-2-f4t8.onrender.com/api/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by search query
  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Search Results{searchQuery && ` for "${searchQuery}"`}</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div>No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Link key={product._id} to={`/category/${product.category}`} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                <img src={product.images?.[0]?.url} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                <div className="font-semibold text-lg mb-1">{product.name}</div>
                <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                <div className="text-sm text-gray-400 mb-2">{product.category}</div>
                <div className="font-bold text-indigo-600">${product.price.toFixed(2)}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 