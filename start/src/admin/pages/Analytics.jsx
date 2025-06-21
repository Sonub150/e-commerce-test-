import React from 'react';
import { motion } from 'framer-motion';
import { FiBarChart } from 'react-icons/fi';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">View detailed analytics and insights</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="text-center py-12">
          <FiBarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
          <p className="text-gray-600">Analytics and reporting interface would be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 