import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  History, 
  Settings,
  Bell,
  User,
  Menu,
  X
} from 'lucide-react';

const GuardianDashboardLayout = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const guardianProfile = JSON.parse(localStorage.getItem(`guardian_profile_${user?.mobile}`) || '{}');

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: BookOpen, label: 'My Tuitions', path: '/dashboard/tuitions' },
    { icon: History, label: 'History', path: '/dashboard/history' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-lg p-4 flex justify-between items-center">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <h1 className="text-lg font-semibold">Guardian Dashboard</h1>
        <button className="relative p-2">
          <Bell className="h-6 w-6 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed md:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}>
          {/* Profile Section */}
          <div className="p-6 border-b">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              {guardianProfile.name || user?.name}
            </h3>
            <p className="text-sm text-gray-500 text-center mt-1">Guardian</p>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
          <Outlet />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default GuardianDashboardLayout;