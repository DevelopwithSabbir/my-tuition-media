import React from 'react';
import { 
  BookOpen, Award, Clock, DollarSign, 
  CheckCircle, XCircle, AlertCircle 
} from 'lucide-react';

interface TutorStatsProps {
  stats: {
    appliedJobs: number;
    shortlisted: number;
    appointed: number;
    confirmed: number;
    payments: number;
    cancelled: number;
  };
}

const TutorStats: React.FC<TutorStatsProps> = ({ stats }) => {
  const statItems = [
    { icon: BookOpen, label: 'Job Applied', value: stats.appliedJobs, color: 'bg-blue-100 text-blue-600' },
    { icon: AlertCircle, label: 'Shortlisted', value: stats.shortlisted, color: 'bg-purple-100 text-purple-600' },
    { icon: Clock, label: 'Appointed', value: stats.appointed, color: 'bg-orange-100 text-orange-600' },
    { icon: CheckCircle, label: 'Job Confirm', value: stats.confirmed, color: 'bg-green-100 text-green-600' },
    { icon: DollarSign, label: 'Payment', value: stats.payments, color: 'bg-indigo-100 text-indigo-600' },
    { icon: XCircle, label: 'Cancel', value: stats.cancelled, color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statItems.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-4">
          <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
            <item.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TutorStats;