import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiEdit, FiTrash2, FiMail, FiPhone, FiLoader } from 'react-icons/fi';
import { usersAPI } from '../../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newThisMonth: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm
      };
      
      const response = await usersAPI.getAll(params);
      
      if (response.data.success) {
        setUsers(response.data.users);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setError('Failed to load users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please check your connection.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await usersAPI.getStats();
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await usersAPI.delete(id);
        if (response.data.success) {
          setUsers(users.filter(user => user._id !== id));
          fetchStats(); // Refresh stats
        } else {
          setError(response.data.message || 'Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setError(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleVerifyUser = async (id) => {
    try {
      const response = await usersAPI.update(id, { isVerified: true });
      if (response.data.success) {
        setUsers(users.map(user => 
          user._id === id ? { ...user, isVerified: true } : user
        ));
      } else {
        setError(response.data.message || 'Failed to verify user');
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      setError(error.response?.data?.message || 'Failed to verify user');
    }
  };

  const getStatusColor = (user) => {
    if (!user.isVerified) return 'text-yellow-600 bg-yellow-100';
    if (user.isActive === false) return 'text-red-600 bg-red-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusText = (user) => {
    if (!user.isVerified) return 'Unverified';
    if (user.isActive === false) return 'Inactive';
    return 'Active';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-2">Manage user accounts and profiles</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: stats.totalUsers || 0, color: 'from-blue-500 to-blue-600' },
          { title: 'Active Users', value: stats.activeUsers || 0, color: 'from-green-500 to-green-600' },
          { title: 'New This Month', value: stats.newThisMonth || 0, color: 'from-purple-500 to-purple-600' },
          { title: 'Total Revenue', value: `$${(stats.totalRevenue || 0).toLocaleString()}`, color: 'from-orange-500 to-orange-600' }
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
                <FiUsers className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.firstName ? user.firstName.charAt(0) : user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">ID: {user._id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 text-sm text-gray-900">
                      <FiMail className="w-4 h-4 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <FiPhone className="w-4 h-4" />
                      <span>{user.mobNo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user)}`}>
                      {getStatusText(user)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {!user.isVerified && (
                        <button
                          onClick={() => handleVerifyUser(user._id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
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
    </div>
  );
};

export default Users; 