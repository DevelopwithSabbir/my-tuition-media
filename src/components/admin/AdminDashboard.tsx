import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminLayout from './AdminLayout';
import { useMetrics } from '../../contexts/MetricsContext';
import {
  Users,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const { metrics } = useMetrics();

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Tutors',
      value: metrics.activeTutors,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: 'Active Tuitions',
      value: metrics.liveTuitions,
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      label: 'Pending Approvals',
      value: 0,
      icon: AlertTriangle,
      color: 'bg-yellow-500'
    },
    {
      label: 'Total Revenue',
      value: '৳0',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {/* Add recent activities here */}
            <div className="text-center text-gray-500 py-8">
              No recent activities to display
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Monthly Tuitions</h3>
            {/* Add chart component here */}
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart will be displayed here
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Revenue Trends</h3>
            {/* Add chart component here */}
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart will be displayed here
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;