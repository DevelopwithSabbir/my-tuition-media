import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Star, Award } from 'lucide-react';
import { useMetrics } from '../../contexts/MetricsContext';

const MetricsSection = () => {
  const { metrics } = useMetrics();

  const metricCards = [
    {
      icon: Users,
      value: metrics.activeTutors,
      label: 'Active Tutors',
      color: 'bg-blue-100 text-blue-600',
      link: '/tutors/active'
    },
    {
      icon: BookOpen,
      value: metrics.liveTuitions,
      label: 'Live Tuition Jobs',
      color: 'bg-green-100 text-green-600',
      link: '/jobs'
    },
    {
      icon: Star,
      value: metrics.happyStudents,
      label: 'Happy Students',
      color: 'bg-yellow-100 text-yellow-600',
      link: '/success-stories'
    },
    {
      icon: Award,
      value: metrics.averageRating ? `${metrics.averageRating}/5` : '0/5',
      label: 'Average Tutor Rating',
      color: 'bg-purple-100 text-purple-600',
      link: '/tutors/ratings'
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
          <p className="mt-4 text-gray-600">Real-time statistics of our growing community</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metricCards.map((metric, index) => (
            <Link
              key={index}
              to={metric.link}
              className="group bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
            >
              <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors">
                  {metric.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsSection;