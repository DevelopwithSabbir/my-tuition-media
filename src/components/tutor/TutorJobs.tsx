import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TutorLayout from './TutorLayout';
import { 
  Search, MapPin, BookOpen, Clock, DollarSign, 
  Filter, GraduationCap, Users, ChevronRight 
} from 'lucide-react';

interface TuitionPost {
  id: string;
  tuitionCode: string;
  class: string;
  subject: string;
  version: string;
  daysPerWeek: string;
  salary: string;
  location: string;
  tutorRequirement: {
    institution: string;
    gender: string;
    experience?: string;
  };
  status: 'approved';
  createdAt: string;
}

const TutorJobs = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<TuitionPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<TuitionPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    subject: '',
    location: '',
    salary: '',
    class: ''
  });

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [searchTerm, filters, posts]);

  const loadPosts = () => {
    const allPosts: TuitionPost[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('tuition_post_')) {
        const postData = JSON.parse(localStorage.getItem(key) || '{}');
        if (postData.status === 'approved') {
          allPosts.push({
            ...postData,
            id: key.replace('tuition_post_', '')
          });
        }
      }
    }
    setPosts(allPosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const filterPosts = () => {
    let filtered = [...posts];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.class.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.subject) {
      filtered = filtered.filter(post => 
        post.subject.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }
    if (filters.location) {
      filtered = filtered.filter(post => 
        post.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.salary) {
      filtered = filtered.filter(post => 
        parseInt(post.salary) >= parseInt(filters.salary)
      );
    }
    if (filters.class) {
      filtered = filtered.filter(post => 
        post.class === filters.class
      );
    }

    setFilteredPosts(filtered);
  };

  const handleApply = (post: TuitionPost) => {
    const application = {
      id: `app_${Date.now()}`,
      tutorId: user?.id,
      tutorName: user?.name,
      tutorMobile: user?.mobile,
      postId: post.id,
      tuitionCode: post.tuitionCode,
      status: 'pending',
      appliedAt: new Date().toISOString()
    };

    localStorage.setItem(`application_${post.id}_${user?.mobile}`, JSON.stringify(application));
    alert('Application submitted successfully!');
  };

  return (
    <TutorLayout>
      <div className="space-y-6">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by subject, location, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filters.subject}
                onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Subjects</option>
                <option value="English">English</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
              </select>
              <select
                value={filters.class}
                onChange={(e) => setFilters(prev => ({ ...prev, class: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Classes</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1)}>Class {i + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                        {post.tuitionCode}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Class {post.class} • {post.subject}
                      </h3>
                    </div>
                    <p className="mt-2 text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {post.location}
                    </p>
                  </div>
                  <button
                    onClick={() => handleApply(post)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                  >
                    <span>Apply Now</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Version</p>
                      <p className="font-medium">{post.version}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Days/Week</p>
                      <p className="font-medium">{post.daysPerWeek} days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-medium">{post.salary} BDT</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Required</p>
                      <p className="font-medium">{post.tutorRequirement.institution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No tuition posts found</p>
            </div>
          )}
        </div>
      </div>
    </TutorLayout>
  );
};

export default TutorJobs;