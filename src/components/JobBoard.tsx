import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, BookOpen, Clock, DollarSign, Users, ChevronRight } from 'lucide-react';
import JobFilters from './JobBoard/JobFilters';

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
  tuitionType: string;
  availability: string;
  status: 'approved';
  createdAt: string;
}

const JobBoard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<TuitionPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<TuitionPost[]>([]);
  const [selectedJob, setSelectedJob] = useState<TuitionPost | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

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
    setFilteredPosts(allPosts);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...posts];

    // Apply search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.subject.toLowerCase().includes(searchLower) ||
        post.location.toLowerCase().includes(searchLower) ||
        post.class.toString().includes(searchLower)
      );
    }

    // Apply tuition type filter
    if (filters.tuitionType !== 'all') {
      filtered = filtered.filter(post => post.tuitionType === filters.tuitionType);
    }

    // Apply tutor gender filter
    if (filters.tutorGender !== 'all') {
      filtered = filtered.filter(post => 
        post.tutorRequirement.gender === filters.tutorGender || 
        post.tutorRequirement.gender === 'any'
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(post =>
        post.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply class filter
    if (filters.class) {
      filtered = filtered.filter(post => post.class === filters.class);
    }

    // Apply subject filter
    if (filters.subject) {
      filtered = filtered.filter(post => post.subject === filters.subject);
    }

    // Apply salary filter
    if (filters.salary) {
      const [min, max] = filters.salary.split('-').map(Number);
      filtered = filtered.filter(post => {
        const salary = Number(post.salary);
        if (max) {
          return salary >= min && salary <= max;
        }
        return salary >= min;
      });
    }

    // Apply availability filter
    if (filters.availability !== 'all') {
      filtered = filtered.filter(post => post.availability === filters.availability);
    }

    setFilteredPosts(filtered);
  };

  const handleApply = (post: TuitionPost) => {
    if (!user) {
      alert('Please login to apply for this tuition');
      return;
    }

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

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Available Tuition Jobs</h1>
          <p className="mt-4 text-lg text-gray-600">Find your next tutoring opportunity</p>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <JobFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
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
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</span>
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
                    <Users className="h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Tutor Gender</p>
                      <p className="font-medium">{post.tutorRequirement.gender}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900">No tuition posts found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your filters or check back later</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;