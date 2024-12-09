import React from 'react';
import { BookOpen, Clock, CheckCircle, Users } from 'lucide-react';

interface GuardianStatsProps {
  stats: {
    totalPosts: number;
    activeTuitions: number;
    pendingApplications: number;
    completedTuitions: number;
  };
}

const GuardianStats: React.FC<GuardianStatsProps> = ({ stats }) => {
  const statItems = [
    {
      icon: BookOpen,
      label: 'Total Posts',
      value: stats.totalPosts,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Clock,
      label: 'Active Tuitions',
      value: stats.activeTuitions,
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Users,
      label: 'Pending Applications',
      value: stats.pendingApplications,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: stats.completedTuitions,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{item.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuardianStats;