import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  User,
  History,
  CreditCard,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const TutorLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/tutor-dashboard' },
    { icon: BookOpen, label: 'Tuition Jobs', path: '/tutor-dashboard/jobs' },
    { icon: User, label: 'Profile', path: '/tutor-dashboard/profile' },
    { icon: History, label: 'Applications', path: '/tutor-dashboard/applications' },
    { icon: CreditCard, label: 'Payments', path: '/tutor-dashboard/payments' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tutorProfile = JSON.parse(localStorage.getItem(`tutor_profile_${user?.mobile}`) || '{}');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-lg fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="ml-3 font-semibold">EduPro Tuition</span>
        </div>
      </div>

      <div className="flex pt-16 md:pt-0">
        {/* Sidebar */}
        <div className={`
          fixed md:static inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:w-64 md:min-h-screen md:shadow-lg
        `}>
          {/* Profile Section */}
          <div className="p-6 text-center border-b">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                {tutorProfile.profileImage ? (
                  <img 
                    src={tutorProfile.profileImage} 
                    alt={user?.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-indigo-600" />
                )}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Tutor</p>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
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
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TutorLayout;