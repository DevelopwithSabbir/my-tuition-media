import React, { useState, useEffect } from 'react';
import { 
  BookOpen, CheckCircle, XCircle, Eye, Search,
  Filter, Download, Upload, AlertTriangle, Ban
} from 'lucide-react';

interface TuitionPost {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  studentGender: string;
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
    other?: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  tuitionCode?: string;
  createdAt: string;
}

const TuitionManagement = () => {
  const [posts, setPosts] = useState<TuitionPost[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<TuitionPost | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const allPosts: TuitionPost[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('tuition_post_')) {
        const postData = JSON.parse(localStorage.getItem(key) || '{}');
        allPosts.push({
          ...postData,
          id: key.replace('tuition_post_', '')
        });
      }
    }
    setPosts(allPosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const handleStatusChange = (postId: string, newStatus: 'approved' | 'rejected' | 'cancelled') => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      const updatedPost = { 
        ...post, 
        status: newStatus,
        tuitionCode: newStatus === 'approved' ? generateTuitionCode() : post.tuitionCode
      };
      localStorage.setItem(`tuition_post_${post.mobile}`, JSON.stringify(updatedPost));
      loadPosts();
    }
  };

  const generateTuitionCode = () => {
    const existingCodes = posts.map(p => parseInt(p.tuitionCode?.replace('T', '') || '0'));
    const maxCode = Math.max(...existingCodes, 0);
    return `T${(maxCode + 1).toString().padStart(4, '0')}`;
  };

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.status === filter;
    const matchesSearch = 
      post.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.class.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tuition Management</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white rounded-lg border hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white rounded-lg border hover:bg-gray-50">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tuitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Posts</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Tuition Posts List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requirements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {post.subject} - Class {post.class}
                        </div>
                        <div className="text-sm text-gray-500">{post.location}</div>
                        {post.tuitionCode && (
                          <div className="text-xs text-indigo-600">{post.tuitionCode}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {post.tutorRequirement.institution}
                    </div>
                    <div className="text-sm text-gray-500">
                      {post.tutorRequirement.gender} tutor
                      {post.tutorRequirement.experience && `, ${post.tutorRequirement.experience}`}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      post.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : post.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : post.status === 'cancelled'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {post.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(post.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(post.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      {post.status === 'approved' && (
                        <button
                          onClick={() => handleStatusChange(post.id, 'cancelled')}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Ban className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tuition posts found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No posts match your current filters.
            </p>
          </div>
        )}
      </div>

      {/* Post Details Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">Tuition Details</h3>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPost.subject}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Class</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPost.class}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPost.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Salary</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPost.salary} BDT/month</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tutor Requirements</label>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-900">
                      Institution: {selectedPost.tutorRequirement.institution}
                    </p>
                    <p className="text-sm text-gray-900">
                      Gender: {selectedPost.tutorRequirement.gender}
                    </p>
                    {selectedPost.tutorRequirement.experience && (
                      <p className="text-sm text-gray-900">
                        Experience: {selectedPost.tutorRequirement.experience}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Close
                    </button>
                    {selectedPost.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            handleStatusChange(selectedPost.id, 'approved');
                            setSelectedPost(null);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                          Approve Post
                        </button>
                        <button
                          onClick={() => {
                            handleStatusChange(selectedPost.id, 'rejected');
                            setSelectedPost(null);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          Reject Post
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionManagement;