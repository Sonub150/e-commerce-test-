import React from 'react';
import { FiGift, FiCheckCircle, FiPieChart } from 'react-icons/fi';

const CouponStatsWidget = ({ active, total, redemptions }) => {
  const activePercentage = total > 0 ? Math.round((active / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">Coupon Stats</h2>
        <FiPieChart className="w-6 h-6 text-gray-400" />
      </div>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-semibold text-gray-700">Active Coupons</p>
            <p className="text-sm font-bold text-purple-600">{active} / {total}</p>
          </div>
          <div className="w-full bg-purple-100 rounded-full h-2.5">
            <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${activePercentage}%` }}></div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
            <div className="flex items-center">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-sm font-semibold text-gray-700 ml-3">Total Redemptions</p>
            </div>
          <p className="text-lg font-bold text-green-600">{redemptions}</p>
        </div>
      </div>
    </div>
  );
};

export default CouponStatsWidget; 