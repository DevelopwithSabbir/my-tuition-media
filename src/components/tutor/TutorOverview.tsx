import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, DollarSign, AlertTriangle } from 'lucide-react';

const TutorOverview = () => {
  const { user } = useAuth();
  const tutorProfile = JSON.parse(localStorage.getItem(`tutor_profile_${user?.mobile}`) || '{}');

  const stats = tutorProfile.stats || {
    appliedJobs: 0,
    shortlisted: 0,
    appointed: 0,
    confirmed: 0,
    payments: 0,
    cancelled: 0,
  };

  const quickStats = [
    { icon: BookOpen, label: 'Total Applications', value: stats.appliedJobs, color: 'text-blue-600' },
    { icon: Award, label: 'Accepted', value: stats.appointed, color: 'text-green-600' },
    { icon: Clock, label: 'Pending', value: stats.shortlisted, color: 'text-yellow-600' },
    { icon: DollarSign, label: 'Total Earnings', value: '৳0', color: 'text-indigo-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-gray-600">Here's what's happening with your tuition applications.</p>
      </div>

      {/* Profile Completion Warning */}
      {(tutorProfile.profileComplete || 0) < 80 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-amber-500 mt-0.5 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-amber-800">Complete Your Profile</h3>
              <p className="mt-1 text-amber-700">
                Your profile is only {tutorProfile.profileComplete || 0}% complete. Complete at least 80% to start applying for tuitions.
              </p>
              <Link
                to="/tutor-dashboard/profile/update"
                className="mt-4 inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Complete Profile
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 bg-gray-50 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
          <Link 
            to="/tutor-dashboard/applications"
            className="text-indigo-600 hover:text-indigo-700"
          >
            View All
          </Link>
        </div>

        {stats.appliedJobs === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Applications Yet</h3>
            <p className="mt-2 text-gray-500">Start applying for tuition jobs to see them here.</p>
            <Link
              to="/tutor-dashboard/jobs"
              className="mt-4 inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Recent applications will be listed here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorOverview;