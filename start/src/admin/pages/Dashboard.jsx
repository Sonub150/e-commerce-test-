import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiGift, FiDollarSign, FiTrendingUp, FiTrendingDown,
  FiShoppingCart, FiPlus, FiDownload, FiRefreshCw, FiArrowRight
} from 'react-icons/fi';
import CouponStatsWidget from './CouponStatsWidget';
import RevenueChart from './RevenueChart';
import QuickActionsPanel from './QuickActionsPanel';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeCoupons: 0,
    totalCoupons: 0,
    couponRedemptions: 0,
    couponSavings: 0
  });
  const [couponPerformance, setCouponPerformance] = useState([]);
  const [recentCoupons, setRecentCoupons] = useState([]);

  // Fetch data (using mock data for this redesign)
  const fetchDashboardData = () => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        totalRevenue: 92150.75,
        activeCoupons: 25,
        totalCoupons: 40,
        couponRedemptions: 189,
        couponSavings: 9350.50
      });
      setCouponPerformance([
        { code: 'SUMMERFUN', usage: 52, savings: 2340.00 },
        { code: 'WELCOME20', usage: 45, savings: 1125.00 },
        { code: 'SHIPITFREE', usage: 38, savings: 570.00 },
        { code: 'LOYALTY15', usage: 28, savings: 1890.00 },
        { code: 'FLASHDEAL', usage: 22, savings: 2750.00 }
      ]);
      setRecentCoupons([
        { code: 'HOLIDAYJOY', discount: '25%', status: 'active' },
        { code: 'FIRSTBUY', discount: '$10', status: 'active' },
        { code: 'WEEKENDVIBES', discount: '15%', status: 'expired' },
      ]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium">Brewing up some fresh stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hello, Admin! 👋</h1>
          <p className="text-gray-500 mt-1">Here's your friendly overview of what's happening.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border-2 border-transparent bg-white rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-semibold text-gray-700 shadow-sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchDashboardData}
            className="p-3 bg-white rounded-xl shadow-sm"
            title="Refresh data"
          >
            <FiRefreshCw className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change="+18.7%"
          icon={<FiDollarSign />}
          color="bg-green-100"
          iconColor="text-green-600"
        />
        <MetricCard
          title="Active Coupons"
          value={stats.activeCoupons}
          change="+5.2%"
          icon={<FiGift />}
          color="bg-purple-100"
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Redemptions"
          value={stats.couponRedemptions}
          change="+12.3%"
          icon={<FiShoppingCart />}
          color="bg-blue-100"
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Customer Savings"
          value={formatCurrency(stats.couponSavings)}
          change="+22.1%"
          icon={<FiTrendingDown />}
          color="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">Performance</h2>
              <button className="text-sm font-semibold text-blue-500 hover:text-blue-700 flex items-center gap-1">
                <FiDownload className="w-4 h-4" />
                Export Report
              </button>
            </div>
            <RevenueChart timeRange={timeRange} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">Top Coupons</h2>
              <a href="/admin/coupons" className="text-sm font-semibold text-blue-500 hover:text-blue-700 flex items-center gap-1">
                View All <FiArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-3 text-left text-xs font-semibold text-gray-500 uppercase">Coupon</th>
                    <th className="py-3 text-left text-xs font-semibold text-gray-500 uppercase">Redemptions</th>
                    <th className="py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {couponPerformance.map((coupon, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0">
                      <td className="py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-800 text-base">{coupon.code}</span>
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        <span className="text-gray-700 font-medium">{coupon.usage}</span>
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        <span className="font-semibold text-green-600">{formatCurrency(coupon.savings)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <CouponStatsWidget
            active={stats.activeCoupons}
            total={stats.totalCoupons}
            redemptions={stats.couponRedemptions}
          />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
};

// Reusable Metric Card Component
const MetricCard = ({ title, value, change, icon, color, iconColor }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`${color} rounded-2xl p-6 shadow-sm`}
    >
      <div className={`p-3 rounded-xl inline-block ${color}`}>
        <div className={`p-2 bg-white rounded-lg ${iconColor}`}>
          {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600 mt-4">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-sm font-semibold text-green-500 mt-2">{change}</p>
    </motion.div>
  );
};

export default Dashboard; 