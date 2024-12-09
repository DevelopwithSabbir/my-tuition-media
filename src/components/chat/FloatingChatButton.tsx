import React from 'react';
import { MessageCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const FloatingChatButton = () => {
  const { user } = useAuth();

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
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-4">
        {/* Chat Buttons */}
        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={handleRequestTutor}
            className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Request Tutor</span>
          </button>
          
          <button
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingChatButton;