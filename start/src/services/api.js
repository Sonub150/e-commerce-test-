import axios from 'axios';

// Replace getBackendUrl function
function getBackendUrl() {
  return (
    import.meta.env.VITE_BACKEND_URL ||
    process.env.VITE_BACKEND_URL ||
    'https://e-commerce-test-2-f4t8.onrender.com'
  );
}

const backendURL = getBackendUrl();
console.log('Using backend URL:', backendURL);

// Create axios instance with base configuration
const api = axios.create({
  baseURL: `${backendURL}/api`,
  withCredentials: true,
  timeout: 10000, // 10 second timeout for local development
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // For admin routes, use admin token
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken && (config.url.includes('/admin/') || config.url.includes('/auth/'))) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    // For user routes, rely on HTTP-only cookies (withCredentials: true handles this)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.log('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
    
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      console.log('Backend connection failed - using mock mode');
      return Promise.reject(new Error('Backend not available'));
    }
    
    if (error.response?.status === 401) {
      // Handle admin authentication errors
      if (error.config.url.includes('/admin/') || error.config.url.includes('/auth/')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login';
      } else {
        // Handle user authentication errors - redirect to login
        window.location.href = '/login';
      }
    }
    
    if (error.response?.status === 404) {
      console.log('Route not found:', error.config.url);
      return Promise.reject(new Error(`API endpoint not found: ${error.config.url}`));
    }
    
    return Promise.reject(error);
  }
);

// Admin Authentication - Updated to use correct endpoints
export const adminAuthAPI = {
  // Use the regular auth login endpoint for admin login
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  // Get admin profile from admin routes
  getProfile: () => api.get('/admin/profile'),
};

// Dashboard API - Updated to use correct admin endpoints
export const dashboardAPI = {
  getStats: () => api.get('/admin/dashboard'),
  // Remove non-existent endpoints
  // getRecentActivities: () => api.get('/admin/dashboard/activities'),
  // getRevenueData: () => api.get('/admin/dashboard/revenue'),
};

// Coupons API - Already updated to use admin endpoints
export const couponsAPI = {
  getAll: (params = {}) => api.get('/admin/coupons', { params }),
  getById: (id) => api.get(`/admin/coupons/${id}`),
  create: (couponData) => api.post('/admin/coupons', couponData),
  update: (id, couponData) => api.put(`/admin/coupons/${id}`, couponData),
  delete: (id) => api.delete(`/admin/coupons/${id}`),
  toggleStatus: (id) => api.put(`/admin/coupons/${id}/toggle`),
  getStats: () => api.get('/admin/coupons/stats'),
  // Public coupon endpoints for validation and application
  validate: (code, orderAmount) => api.post('/coupons/validate', { code, orderAmount }),
  apply: (code, orderAmount) => api.post('/coupons/apply', { code, orderAmount }),
};

// Users API - Updated to use admin endpoints
export const usersAPI = {
  getAll: (params = {}) => api.get('/admin/users', { params }),
  getById: (id) => api.get(`/admin/users/${id}`),
  update: (id, userData) => api.put(`/admin/users/${id}`, userData),
  delete: (id) => api.delete(`/admin/users/${id}`),
  getStats: () => api.get('/admin/users/stats'),
};

// Products API - Updated to use admin endpoints
export const productsAPI = {
  getAll: (params = {}) => api.get('/admin/products', { params }),
  getById: (id) => api.get(`/admin/products/${id}`),
  create: (productData) => api.post('/admin/products', productData),
  update: (id, productData) => api.put(`/admin/products/${id}`, productData),
  delete: (id) => api.delete(`/admin/products/${id}`),
  getStats: () => api.get('/admin/products/stats'),
};

// Analytics API - Updated to use admin endpoints
export const analyticsAPI = {
  getSalesData: () => api.get('/admin/analytics/sales'),
  getUserData: () => api.get('/admin/analytics/users'),
  getProductData: () => api.get('/admin/analytics/products'),
  getRevenueData: () => api.get('/admin/analytics/revenue'),
};

// Settings API - Updated to use admin endpoints
export const settingsAPI = {
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (settings) => api.put('/admin/settings', settings),
};

// Orders API - Updated to use admin endpoints
export const ordersAPI = {
  getAll: (params = {}) => api.get('/admin/orders', { params }),
  getById: (id) => api.get(`/admin/orders/${id}`),
  updateStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }),
  getStats: () => api.get('/admin/orders/stats'),
};

// Checkout API - New checkout endpoints
export const checkoutAPI = {
  // Create a new checkout
  create: (checkoutData) => api.post('/checkout', checkoutData),
  
  // Get checkout by ID
  getById: (id) => api.get(`/checkout/${id}`),
  
  // Get user's checkouts
  getUserCheckouts: () => api.get('/checkout'),
  
  // Update payment status
  updatePayment: (id, paymentData) => api.put(`/checkout/${id}/pay`, paymentData),
  
  // Finalize checkout (create order)
  finalize: (id) => api.post(`/checkout/${id}/finalize`),
};

// User Orders API - New user order endpoints
export const userOrdersAPI = {
  // Get user's orders
  getMyOrders: () => api.get('/orders/my-orders'),
  
  // Get order details by ID
  getOrderDetails: (id) => api.post(`/orders/${id}`),
};

// Test connection
export const testAPI = {
  testConnection: () => api.get('/test'),
};

export default api; 