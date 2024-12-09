import React from 'react';
import { MapPin, BookOpen, Clock, DollarSign, Eye } from 'lucide-react';

interface TuitionPost {
  id: string;
  tuitionCode: string;
  subject: string;
  class: string;
  location: string;
  salary: string;
  status: string;
  createdAt: string;
  applications: Array<{
    tutorId: string;
    tutorName: string;
    status: 'pending' | 'accepted' | 'rejected';
  }>;
}

interface TuitionPostCardProps {
  post: TuitionPost;
  onViewApplications: () => void;
}

const TuitionPostCard: React.FC<TuitionPostCardProps> = ({ post, onViewApplications }) => {
  const getTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const pendingApplications = post.applications?.filter(a => a.status === 'pending').length || 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {post.tuitionCode}
              </span>
              <h3 className="text-xl font-semibold text-gray-900">
                {post.subject} - Class {post.class}
              </h3>
            </div>
            <p className="mt-2 text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              {post.location}
              <span className="mx-2">•</span>
              <span className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</span>
            </p>
          </div>
          <button
            onClick={onViewApplications}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Applications
            {pendingApplications > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-white text-indigo-600 rounded-full text-xs font-medium">
                {pendingApplications}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Subject</p>
              <p className="font-medium">{post.subject}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium capitalize">{post.status}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="font-medium">{post.salary} BDT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionPostCard;