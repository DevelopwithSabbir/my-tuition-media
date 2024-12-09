import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  FileText,
  BarChart2,
  Settings,
  Bell,
  LogOut,
  Shield
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Tutor Management', path: '/admin/tutors' },
    { icon: BookOpen, label: 'Tuition Posts', path: '/admin/tuitions' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: FileText, label: 'Content', path: '/admin/content' },
    { icon: BarChart2, label: 'Analytics', path: '/admin/analytics' },
    { icon: Shield, label: 'Security', path: '/admin/security' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white shadow-lg">
          {/* Profile Section */}
          <div className="p-6 border-b">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">
                <Users className="w-12 h-12 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              {user?.name || 'Admin'}
            </h3>
            <p className="text-sm text-gray-500 text-center mt-1">
              Admin Panel
            </p>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 mt-auto">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;