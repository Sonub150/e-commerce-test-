import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const APITest = () => {
  const [backendUrl, setBackendUrl] = useState('');
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    // Get backend URL from environment or localStorage
    const url = import.meta.env.VITE_BACKEND_URL || localStorage.getItem('backendUrl') || 'http://localhost:8080';
    setBackendUrl(url);
  }, []);

  const testBackend = async () => {
    setIsLoading(true);
    const results = {};

    try {
      // Test basic connectivity
      const response = await fetch(`${backendUrl}/api/test`);
      results.connectivity = {
        status: response.status,
        ok: response.ok,
        message: response.ok ? 'Backend is reachable' : 'Backend is not responding'
      };
    } catch (error) {
      results.connectivity = {
        status: 'ERROR',
        ok: false,
        message: `Connection failed: ${error.message}`
      };
    }

    try {
      // Test checkout endpoint
      const checkoutResponse = await fetch(`${backendUrl}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: true,
          message: 'Testing checkout endpoint'
        })
      });
      results.checkout = {
        status: checkoutResponse.status,
        ok: checkoutResponse.ok,
        message: checkoutResponse.ok ? 'Checkout endpoint is accessible' : 'Checkout endpoint error'
      };
    } catch (error) {
      results.checkout = {
        status: 'ERROR',
        ok: false,
        message: `Checkout test failed: ${error.message}`
      };
    }

    try {
      // Test products endpoint
      const productsResponse = await fetch(`${backendUrl}/api/products`);
      const productsData = await productsResponse.json();
      results.products = {
        status: productsResponse.status,
        ok: productsResponse.ok,
        message: productsResponse.ok ? `Products endpoint accessible (${Array.isArray(productsData) ? productsData.length : 'unknown'} products)` : 'Products endpoint error',
        data: productsData
      };
    } catch (error) {
      results.products = {
        status: 'ERROR',
        ok: false,
        message: `Products test failed: ${error.message}`
      };
    }

    setTestResults(results);
    setIsLoading(false);
  };

  const saveBackendUrl = () => {
    localStorage.setItem('backendUrl', backendUrl);
    alert('Backend URL saved!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">API Test & Debug</h1>
          
          {/* Backend URL Configuration */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Backend Configuration</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backend URL
                </label>
                <input
                  type="url"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  placeholder="http://localhost:8080"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={saveBackendUrl}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Current environment: {import.meta.env.MODE} | 
              VITE_BACKEND_URL: {import.meta.env.VITE_BACKEND_URL || 'Not set'}
            </p>
          </div>

          {/* Test Results */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Backend Tests</h2>
              <button
                onClick={testBackend}
                disabled={isLoading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? 'Testing...' : 'Run Tests'}
              </button>
            </div>
            
            {Object.keys(testResults).length > 0 && (
              <div className="space-y-4">
                {Object.entries(testResults).map(([test, result]) => (
                  <div key={test} className={`p-4 rounded-lg border ${
                    result.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold capitalize">{test} Test</h3>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        result.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {result.ok ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <p className="text-sm mt-1">Status: {result.status}</p>
                    <p className="text-sm">{result.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Structure Debug */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cart Structure Debug</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Current Cart State:</h3>
              <pre className="text-sm bg-white p-4 rounded border overflow-auto max-h-96">
                {JSON.stringify(cart, null, 2)}
              </pre>
            </div>
          </div>

          {/* Product ID Validation */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product ID Validation</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              {cart?.cartItems?.length > 0 ? (
                <div className="space-y-4">
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2">Item {index + 1}:</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Product ID:</strong> {item.productId?._id || 'MISSING'}
                        </div>
                        <div>
                          <strong>Product Name:</strong> {item.productId?.name || 'MISSING'}
                        </div>
                        <div>
                          <strong>Price:</strong> ${item.productId?.price || 'MISSING'}
                        </div>
                        <div>
                          <strong>Quantity:</strong> {item.quantity || 'MISSING'}
                        </div>
                        <div className="col-span-2">
                          <strong>Has _id:</strong> {item.productId?._id ? '✅ YES' : '❌ NO'}
                        </div>
                        <div className="col-span-2">
                          <strong>Product Structure:</strong>
                          <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto">
                            {JSON.stringify(item.productId, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No items in cart</p>
              )}
            </div>
          </div>

          {/* Products API Response */}
          {testResults.products?.data && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Products API Response</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Response Structure:</h3>
                <pre className="text-sm bg-white p-4 rounded border overflow-auto max-h-96">
                  {JSON.stringify(testResults.products.data, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Troubleshooting Guide</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• If "Backend not reachable": Check if your backend server is running</li>
              <li>• If "Checkout endpoint error": Verify the backend URL and CORS settings</li>
              <li>• If product IDs are missing: The cart items may not have the correct structure</li>
              <li>• If phone validation fails: Use format like "1234567890" or "+1234567890"</li>
              <li>• If products not found: The product IDs in cart don't exist in the database</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITest; 