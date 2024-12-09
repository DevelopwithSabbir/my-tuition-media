import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Clock, CheckCircle, X, 
  MapPin, DollarSign, User, AlertTriangle,
  Plus, Eye, MessageCircle
} from 'lucide-react';
import GuardianStats from './GuardianStats';
import TuitionPostCard from './TuitionPostCard';
import TutorApplicationCard from './TutorApplicationCard';
import PostTuitionModal from './PostTuitionModal';

interface TuitionPost {
  id: string;
  tuitionCode: string;
  subject: string;
  class: string;
  location: string;
  salary: string;
  status: 'pending' | 'approved' | 'active' | 'completed';
  createdAt: string;
  applications: Array<{
    tutorId: string;
    tutorName: string;
    status: 'pending' | 'accepted' | 'rejected';
  }>;
}

const GuardianDashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<TuitionPost[]>([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<TuitionPost | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    // Load posts from localStorage
    const userPosts: TuitionPost[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('tuition_post_') && key.includes(user?.mobile || '')) {
        const postData = JSON.parse(localStorage.getItem(key) || '{}');
        userPosts.push(postData);
      }
    }
    setPosts(userPosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const stats = {
    totalPosts: posts.length,
    activeTuitions: posts.filter(p => p.status === 'active').length,
    pendingApplications: posts.reduce((acc, post) => 
      acc + post.applications?.filter(a => a.status === 'pending').length || 0, 0
    ),
    completedTuitions: posts.filter(p => p.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <p className="mt-2 text-gray-600">Manage your tuition posts and applications</p>
          </div>
          <button
            onClick={() => setShowPostModal(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Post New Tuition
          </button>
        </div>

        {/* Stats Section */}
        <GuardianStats stats={stats} />

        {/* Active Tuitions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Tuitions</h2>
          <div className="grid gap-6">
            {posts.filter(post => post.status === 'active').map(post => (
              <TuitionPostCard 
                key={post.id} 
                post={post}
                onViewApplications={() => setSelectedPost(post)}
              />
            ))}
            {posts.filter(post => post.status === 'active').length === 0 && (
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Active Tuitions</h3>
                <p className="mt-2 text-gray-500">Post a tuition request to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Applications for {selectedPost.subject}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Tuition Code: {selectedPost.tuitionCode}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedPost.applications?.map((application, index) => (
                    <TutorApplicationCard
                      key={index}
                      application={application}
                      onAccept={() => {
                        // Handle accept
                      }}
                      onReject={() => {
                        // Handle reject
                      }}
                    />
                  ))}
                  {(!selectedPost.applications || selectedPost.applications.length === 0) && (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No Applications Yet</h3>
                      <p className="text-gray-500">Check back later for tutor applications</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Tuition Modal */}
        {showPostModal && (
          <PostTuitionModal
            onClose={() => setShowPostModal(false)}
            onSubmit={(data) => {
              // Handle post submission
              loadPosts();
              setShowPostModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GuardianDashboard;