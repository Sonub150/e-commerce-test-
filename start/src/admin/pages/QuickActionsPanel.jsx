import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiGift, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Create Coupon',
      icon: <FiPlus />,
      path: '/admin/coupons',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      label: 'Manage Products',
      icon: <FiGift />,
      path: '/admin/products',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      label: 'Site Settings',
      icon: <FiSettings />,
      path: '/admin/settings',
      color: 'bg-gray-700 hover:bg-gray-800'
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Quick Actions</h2>
      <div className="space-y-4">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(action.path)}
            className={`w-full flex items-center p-4 text-left text-white font-bold rounded-xl transition-colors ${action.color}`}
          >
            {React.cloneElement(action.icon, { className: "w-6 h-6" })}
            <span className="ml-3">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel; 