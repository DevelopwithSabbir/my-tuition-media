import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface TuitionCategoryCardProps {
  name: string;
  count: number;
  Icon: LucideIcon;
  type: string;
}

const TuitionCategoryCard = ({ name, count, Icon, type }: TuitionCategoryCardProps) => {
  const getGradientColor = () => {
    switch (type) {
      case 'area':
        return 'from-blue-500 to-indigo-600';
      case 'university':
        return 'from-purple-500 to-pink-600';
      case 'medium':
        return 'from-green-500 to-teal-600';
      case 'preference':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <Link
      to={`/jobs?category=${type}&value=${encodeURIComponent(name)}`}
      className="group bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-gray-200"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getGradientColor()} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {count} Live {count === 1 ? 'Tuition' : 'Tuitions'}
        </span>
        <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </Link>
  );
};

export default TuitionCategoryCard;