import React from 'react';

const RevenueChart = ({ timeRange }) => {
  // Mock data for demonstration
  const generateData = (numPoints, labelPrefix = '') =>
    Array.from({ length: numPoints }, (_, i) => ({
      label: `${labelPrefix}${i + 1}`,
      revenue: Math.random() * 1500 + 500,
    }));

  const data = {
    '7d': [
      { label: 'Mon', revenue: 1300 },
      { label: 'Tue', revenue: 1800 },
      { label: 'Wed', revenue: 1600 },
      { label: 'Thu', revenue: 2200 },
      { label: 'Fri', revenue: 2500 },
      { label: 'Sat', revenue: 2100 },
      { label: 'Sun', revenue: 2900 },
    ],
    '30d': generateData(30),
    '90d': generateData(90),
  };

  const chartData = data[timeRange] || data['7d'];
  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 0);

  return (
    <div className="h-80 w-full flex items-end justify-around space-x-1 pt-4 pr-4">
      {chartData.map((d, i) => (
        <div key={i} className="flex-1 h-full flex flex-col items-center justify-end group relative">
          <div
            className="w-3/4 bg-blue-400 rounded-lg group-hover:bg-blue-500 transition-all duration-300 ease-out"
            style={{
              height: `${(d.revenue / maxRevenue) * 100}%`,
              '--revenue-value': `"$${(d.revenue / 1000).toFixed(1)}k"`
            }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded-md">
              ${d.revenue.toFixed(0)}
            </div>
          </div>
          <span className="text-xs text-gray-500 mt-2">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

export default RevenueChart; 