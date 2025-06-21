import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiCopy, FiGift, FiLoader, FiSearch, FiFilter, FiX, FiSave } from 'react-icons/fi';
import { couponsAPI } from '../../services/api';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [stats, setStats] = useState({
    totalCoupons: 0,
    activeCoupons: 0,
    expiredCoupons: 0,
    expiringSoon: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: '0',
    maxDiscountAmount: '',
    validFrom: '',
    validUntil: '',
    usageLimit: '',
    prefix: ''
  });

  useEffect(() => {
    fetchCoupons();
    fetchStats();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm,
        status: statusFilter
      };
      
      const response = await couponsAPI.getAll(params);
      
      if (response.data.success) {
        setCoupons(response.data.coupons);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setError('Failed to load coupons');
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
      setError('Failed to load coupons. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await couponsAPI.getStats();
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      discountType: 'percentage',
      discountValue: '',
      minOrderAmount: '0',
      maxDiscountAmount: '',
      validFrom: '',
      validUntil: '',
      usageLimit: '',
      prefix: ''
    });
    setEditingCoupon(null);
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validate form data
      if (!formData.discountValue || !formData.validFrom || !formData.validUntil) {
        setError('Please fill in all required fields');
        return;
      }

      const response = await couponsAPI.create(formData);
      
      if (response.data.success) {
        setSuccess('Coupon created successfully!');
        setCoupons([response.data.coupon, ...coupons]);
        setShowCreateModal(false);
        resetForm();
        fetchStats();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Failed to create coupon');
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
      setError(error.response?.data?.message || 'Failed to create coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await couponsAPI.update(editingCoupon._id, formData);
      
      if (response.data.success) {
        setSuccess('Coupon updated successfully!');
        setCoupons(coupons.map(coupon => 
          coupon._id === editingCoupon._id ? response.data.coupon : coupon
        ));
        setShowCreateModal(false);
        resetForm();
        fetchStats();
        
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Failed to update coupon');
      }
    } catch (error) {
      console.error('Error updating coupon:', error);
      setError(error.response?.data?.message || 'Failed to update coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      discountType: coupon.discountType,
      discountValue: coupon.discountValue.toString(),
      minOrderAmount: coupon.minOrderAmount.toString(),
      maxDiscountAmount: coupon.maxDiscountAmount ? coupon.maxDiscountAmount.toString() : '',
      validFrom: new Date(coupon.validFrom).toISOString().split('T')[0],
      validUntil: new Date(coupon.validUntil).toISOString().split('T')[0],
      usageLimit: coupon.usageLimit ? coupon.usageLimit.toString() : '',
      prefix: ''
    });
    setShowCreateModal(true);
  };

  const handleDeleteCoupon = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        const response = await couponsAPI.delete(id);
        if (response.data.success) {
          setSuccess('Coupon deleted successfully!');
          setCoupons(coupons.filter(coupon => coupon._id !== id));
          fetchStats();
          setTimeout(() => setSuccess(''), 3000);
        } else {
          setError(response.data.message || 'Failed to delete coupon');
        }
      } catch (error) {
        console.error('Error deleting coupon:', error);
        setError(error.response?.data?.message || 'Failed to delete coupon');
      }
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await couponsAPI.toggleStatus(id);
      if (response.data.success) {
        setSuccess('Coupon status updated successfully!');
        setCoupons(coupons.map(coupon => 
          coupon._id === id ? response.data.coupon : coupon
        ));
        fetchStats();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Failed to toggle coupon status');
      }
    } catch (error) {
      console.error('Error toggling coupon status:', error);
      setError(error.response?.data?.message || 'Failed to toggle coupon status');
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setSuccess('Coupon code copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const getStatusColor = (coupon) => {
    if (!coupon.isActive) return 'text-red-600 bg-red-100';
    if (new Date() > new Date(coupon.validUntil)) return 'text-red-600 bg-red-100';
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return 'text-red-600 bg-red-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusText = (coupon) => {
    if (!coupon.isActive) return 'Inactive';
    if (new Date() > new Date(coupon.validUntil)) return 'Expired';
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return 'Limit Reached';
    return 'Active';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    resetForm();
  };

  if (loading && coupons.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading coupons...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons Management</h1>
          <p className="text-gray-600 mt-1">Create and manage discount coupons for your store</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus />
          <span>Create Coupon</span>
        </motion.button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Coupons', value: stats.totalCoupons, color: 'from-blue-500 to-blue-600' },
          { title: 'Active Coupons', value: stats.activeCoupons, color: 'from-green-500 to-green-600' },
          { title: 'Expired Coupons', value: stats.expiredCoupons, color: 'from-red-500 to-red-600' },
          { title: 'Expiring Soon', value: stats.expiringSoon, color: 'from-yellow-500 to-yellow-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                <FiGift className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search coupons by code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Coupons ({coupons.length})</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm font-medium text-gray-900">{coupon.code}</span>
                      <button
                        onClick={() => copyToClipboard(coupon.code)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy code"
                      >
                        <FiCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      Min: ${coupon.minOrderAmount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {coupon.usedCount || 0} / {coupon.usageLimit || '∞'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(coupon.validFrom)} - {formatDate(coupon.validUntil)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(coupon)}`}>
                      {getStatusText(coupon)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCoupon(coupon)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit coupon"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(coupon._id)}
                        className="text-green-600 hover:text-green-900"
                        title={coupon.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {coupon.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete coupon"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Coupon Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
              </h2>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={editingCoupon ? handleUpdateCoupon : handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type *</label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="percentage">Percentage Discount</option>
                  <option value="fixed">Fixed Amount Discount</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Value * {formData.discountType === 'percentage' ? '(0-100%)' : '($)'}
                </label>
                <input
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max={formData.discountType === 'percentage' ? "100" : undefined}
                  step="0.01"
                  placeholder={formData.discountType === 'percentage' ? '20' : '10'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Amount ($)</label>
                <input
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) => setFormData({...formData, minOrderAmount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="0.01"
                  placeholder="0"
                />
              </div>
              
              {formData.discountType === 'percentage' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Discount Amount ($)</label>
                  <input
                    type="number"
                    value={formData.maxDiscountAmount}
                    onChange={(e) => setFormData({...formData, maxDiscountAmount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                    placeholder="50"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valid From *</label>
                <input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until *</label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limit</label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({...formData, usageLimit: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  placeholder="100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Code Prefix (optional)</label>
                <input
                  type="text"
                  value={formData.prefix}
                  onChange={(e) => setFormData({...formData, prefix: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., SAVE, WELCOME, SUMMER"
                  maxLength="10"
                />
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <FiLoader className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4" />
                      <span>{editingCoupon ? 'Update Coupon' : 'Create Coupon'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupons; 