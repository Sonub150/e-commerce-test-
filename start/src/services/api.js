import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://e-commerce-test-2-f4t8.onrender.com/api',
  withCredentials: true,
  timeout: 5000, // 5 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error);
    
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      console.log('Backend connection failed - using mock mode');
      return Promise.reject(new Error('Backend not available'));
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
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

// Test connection
export const testAPI = {
  testConnection: () => api.get('/test'),
};

export default api; 