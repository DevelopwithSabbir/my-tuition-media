import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  FileText,
  BarChart2,
  Settings,
  LogOut
} from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeSection, onSectionChange }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'tutors', label: 'Tutor Management', icon: Users },
    { id: 'tuitions', label: 'Tuition Management', icon: BookOpen },
    { id: 'payments', label: 'Payment Management', icon: CreditCard },
    { id: 'content', label: 'Content Management', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg">
      {/* Logo Section */}
      <div className="px-6 py-8 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-4 mt-auto">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;