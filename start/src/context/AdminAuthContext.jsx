import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { adminAuthAPI } from '../services/api';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = useCallback(async () => {
    try {
      await adminAuthAPI.getProfile();
      return true;
    } catch (error) {
      return false;
    }
  }, []);

  // Function to check authentication status
  const checkAuthStatus = useCallback(async () => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');
    
    if (adminToken && adminUser) {
      try {
        // Verify token with backend
        const isValid = await verifyToken();
        if (isValid) {
          const userData = JSON.parse(adminUser);
          setAdminUser(userData);
          setIsAdminAuthenticated(true);
          return true;
        } else {
          // Token is invalid, clear storage
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setAdminUser(null);
          setIsAdminAuthenticated(false);
          return false;
        }
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setAdminUser(null);
        setIsAdminAuthenticated(false);
        return false;
      }
    } else {
      setAdminUser(null);
      setIsAdminAuthenticated(false);
      return false;
    }
  }, [verifyToken]);

  useEffect(() => {
    checkAuthStatus().finally(() => {
      setLoading(false);
    });
  }, [checkAuthStatus]);

  const adminLogin = useCallback(async (email, password) => {
    try {
      setLoading(true);
      
      const response = await adminAuthAPI.login({ email, password });
      
      if (response.data.success) {
        const { token, user } = response.data;
        
        // Check if user is admin
        if (!user.isAdmin) {
          return { 
            success: false, 
            message: 'Access denied. Admin privileges required.' 
          };
        }
        
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        setAdminUser(user);
        setIsAdminAuthenticated(true);
        
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: response.data.message || 'Login failed' };
      }
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 401) {
        return { 
          success: false, 
          message: 'Invalid email or password' 
        };
      } else if (error.response?.status === 403) {
        return { 
          success: false, 
          message: 'Access denied. Admin privileges required.' 
        };
      } else if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
        return { 
          success: false, 
          message: 'Cannot connect to server. Please check your connection.' 
        };
      } else {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Login failed. Please try again.' 
        };
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogout = useCallback(async () => {
    try {
      // Try backend logout
      await adminAuthAPI.logout();
    } catch (error) {
      // It's okay if this fails, we still want to log out on the client
    } finally {
      // Always clear local storage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      setAdminUser(null);
      setIsAdminAuthenticated(false);
    }
  }, []);

  const value = useMemo(() => ({
    isAdminAuthenticated,
    adminUser,
    loading,
    adminLogin,
    adminLogout,
    checkAuthStatus
  }), [isAdminAuthenticated, adminUser, loading, adminLogin, adminLogout, checkAuthStatus]);

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}; 