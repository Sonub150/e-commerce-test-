import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiUsers, 
  FiPackage, 
  FiBarChart, 
  FiSettings, 
  FiLogOut,
  FiShield,
  FiGift
} from 'react-icons/fi';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { adminUser, adminLogout } = useAdminAuth();

  const menuItems = [
    { path: '/admin', icon: <FiHome />, label: 'Dashboard' },
    { path: '/admin/coupons', icon: <FiGift />, label: 'Coupons' },
    { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { path: '/admin/products', icon: <FiPackage />, label: 'Products' },
    { path: '/admin/analytics', icon: <FiBarChart />, label: 'Analytics' },
    { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <FiShield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {adminUser?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{adminUser?.name || 'Admin'}</p>
              <p className="text-sm text-gray-500">{adminUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.path}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-all duration-300"
          >
            <FiLogOut className="text-lg" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiMenu className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">
            {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
          </h2>
          {/* Spacer */}
          <div className="w-8"></div> 
        </div>

        {/* Page Content */}
        <main className="bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 