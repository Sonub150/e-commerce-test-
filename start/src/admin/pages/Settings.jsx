import React from 'react';
import { motion } from 'framer-motion';
import { FiSettings } from 'react-icons/fi';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your admin panel settings</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="text-center py-12">
          <FiSettings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings Panel</h3>
          <p className="text-gray-600">Settings and configuration interface would be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings; 