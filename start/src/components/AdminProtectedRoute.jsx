import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated, loading, checkAuthStatus } = useAdminAuth();

  useEffect(() => {
    console.log('AdminProtectedRoute - Component mounted');
    console.log('AdminProtectedRoute - Current state:', { isAdminAuthenticated, loading });
    
    // Double-check authentication status
    if (!loading) {
      const authStatus = checkAuthStatus();
      console.log('AdminProtectedRoute - Re-checked auth status:', authStatus);
    }
  }, [isAdminAuthenticated, loading, checkAuthStatus]);

  console.log('AdminProtectedRoute - Render state:', { isAdminAuthenticated, loading });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading admin panel...</p>
          <p className="text-gray-500 text-sm mt-2">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    console.log('AdminProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  console.log('AdminProtectedRoute - Authenticated, rendering admin content');
  return children;
};

export default AdminProtectedRoute; 