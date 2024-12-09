import React from 'react';
import { Award } from 'lucide-react';
import { useMetrics } from '../contexts/MetricsContext';

const SuccessStories = () => {
  const { metrics } = useMetrics();

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Success Stories</h1>
          <p className="mt-4 text-gray-600">
            {metrics.happyStudents} students achieved their goals with our tutors
          </p>
        </div>

        {metrics.happyStudents === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Award className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No Success Stories Yet</h3>
            <p className="mt-2 text-gray-500">Be the first to share your learning journey!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Success story cards will be dynamically populated here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;