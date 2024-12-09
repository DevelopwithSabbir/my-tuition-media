import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Image, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file';
  timestamp: string;
}

interface ChatWindowProps {
  recipientId: string;
  recipientName: string;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ recipientId, recipientName, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAttaching, setIsAttaching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    // Set up WebSocket connection here
  }, [recipientId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = () => {
    // Load messages from localStorage for demo
    const storedMessages = localStorage.getItem(`chat_${user?.id}_${recipientId}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      content: newMessage,
      type: 'text',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Save to localStorage for demo
    const updatedMessages = [...messages, message];
    localStorage.setItem(`chat_${user?.id}_${recipientId}`, JSON.stringify(updatedMessages));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h3 className="font-semibold text-gray-900">{recipientName}</h3>
          <p className="text-sm text-gray-500">Online</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto max-h-96">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.senderId === user?.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="break-words">{message.content}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              rows={1}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsAttaching(!isAttaching)}
              className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              onClick={handleSend}
              className="p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Attachment Options */}
        {isAttaching && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-white rounded-lg shadow-lg border flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg">
              <Image className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg">
              <Paperclip className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;