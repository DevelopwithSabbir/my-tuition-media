import React from 'react';
import { BarChart2, AlertTriangle } from 'lucide-react';

const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-12">
          <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No analytics data available</h3>
          <p className="mt-1 text-sm text-gray-500">
            Analytics data will be displayed here once available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;