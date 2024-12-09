import React from 'react';
import { MessageCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const ChatButtons = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Only show on homepage and job board
  const shouldShow = ['/', '/jobs'].includes(location.pathname);

  if (!shouldShow) return null;

  const handleWhatsAppClick = () => {
    const whatsappNumber = '01821702694';
    const message = encodeURIComponent('Hello! I need help with tutoring.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleRequestTutor = () => {
    if (!user) {
      window.location.href = '/register';
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end space-y-4">
      <button
        onClick={handleRequestTutor}
        className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
      >
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Request Tutor</span>
        <span className="sm:hidden">Request</span>
      </button>
      
      <button
        onClick={handleWhatsAppClick}
        className="bg-[#25D366] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
      >
        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </button>
    </div>
  );
};

export default ChatButtons;