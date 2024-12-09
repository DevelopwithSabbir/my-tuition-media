import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle,
  Plus,
  AlertTriangle
} from 'lucide-react';

interface GuardianStats {
  totalPosts: number;
  activeTuitions: number;
  pendingApplications: number;
  completedTuitions: number;
}

const GuardianOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<GuardianStats>({
    totalPosts: 0,
    activeTuitions: 0,
    pendingApplications: 0,
    completedTuitions: 0
  });
  const [recentTuitions, setRecentTuitions] = useState<any[]>([]);

  useEffect(() => {
    if (user?.mobile) {
      const guardianProfile = JSON.parse(localStorage.getItem(`guardian_profile_${user.mobile}`) || '{}');
      setStats(guardianProfile.stats || {
        totalPosts: 0,
        activeTuitions: 0,
        pendingApplications: 0,
        completedTuitions: 0
      });
      setRecentTuitions(guardianProfile.tuitions?.slice(0, 3) || []);
    }
  }, [user]);

  const statItems = [
    { 
      icon: BookOpen, 
      label: 'Total Posts', 
      value: stats.totalPosts,
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      icon: Users, 
      label: 'Active Tuitions', 
      value: stats.activeTuitions,
      color: 'bg-green-100 text-green-600' 
    },
    { 
      icon: Clock, 
      label: 'Pending Applications', 
      value: stats.pendingApplications,
      color: 'bg-yellow-100 text-yellow-600' 
    },
    { 
      icon: CheckCircle, 
      label: 'Completed', 
      value: stats.completedTuitions,
      color: 'bg-purple-100 text-purple-600' 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tuitions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Tuitions</h2>
          <Link
            to="/dashboard/post-tuition"
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Post New Tuition
          </Link>
        </div>

        {recentTuitions.length > 0 ? (
          <div className="space-y-4">
            {recentTuitions.map((tuition, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{tuition.subject}</h3>
                  <p className="text-sm text-gray-500">Class {tuition.class}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tuition.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tuition.status}
                  </span>
                  <Link
                    to={`/dashboard/tuitions/${tuition.id}`}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Tuitions Posted</h3>
            <p className="text-gray-500 mb-4">Get started by posting your first tuition request</p>
            <Link
              to="/dashboard/post-tuition"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post Tuition
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuardianOverview;