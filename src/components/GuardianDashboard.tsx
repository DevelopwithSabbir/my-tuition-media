import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, BookOpen, Clock, DollarSign } from 'lucide-react';

interface TuitionPost {
  name: string;
  mobile: string;
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
}

interface Application {
  tutorMobile: string;
  tutorName: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const GuardianDashboard = () => {
  const { user } = useAuth();
  const [tuitionPosts, setTuitionPosts] = useState<TuitionPost[]>([]);
  const [applications, setApplications] = useState<Record<string, Application[]>>({});

  useEffect(() => {
    if (user?.mobile) {
      // Load guardian's tuition posts
      const postData = localStorage.getItem(`tuition_post_${user.mobile}`);
      if (postData) {
        setTuitionPosts([JSON.parse(postData)]);
      }

      // Load applications for the posts
      const applicationsData = localStorage.getItem(`applications_${user.mobile}`);
      if (applicationsData) {
        setApplications(JSON.parse(applicationsData));
      }
    }
  }, [user]);

  const handleApplicationStatus = (tutorMobile: string, status: 'accepted' | 'rejected') => {
    if (user?.mobile) {
      const updatedApplications = { ...applications };
      const postApplications = updatedApplications[user.mobile] || [];
      const applicationIndex = postApplications.findIndex(app => app.tutorMobile === tutorMobile);
      
      if (applicationIndex !== -1) {
        postApplications[applicationIndex].status = status;
        updatedApplications[user.mobile] = postApplications;
        setApplications(updatedApplications);
        localStorage.setItem(`applications_${user.mobile}`, JSON.stringify(updatedApplications));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Guardian Dashboard</h1>
          <p className="mt-4 text-lg text-gray-600">Manage your tuition posts and applications</p>
        </div>

        <div className="space-y-8">
          {tuitionPosts.map((post, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Tuition Post</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="font-medium">Subject:</span>
                      <span className="ml-2">{post.subject}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{post.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="font-medium">Days/Week:</span>
                      <span className="ml-2">{post.daysPerWeek}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="font-medium">Salary:</span>
                      <span className="ml-2">{post.salary} BDT/month</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-gray-600">
                      <span className="font-medium">Class:</span>
                      <span className="ml-2">{post.class}</span>
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Version:</span>
                      <span className="ml-2">{post.version}</span>
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Student Gender:</span>
                      <span className="ml-2">{post.studentGender}</span>
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Preferred Institution:</span>
                      <span className="ml-2">{post.tutorRequirement.institution}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Applications</h3>
                  {applications[user?.mobile!]?.length ? (
                    <div className="space-y-4">
                      {applications[user?.mobile!].map((application, appIndex) => (
                        <div key={appIndex} className="border rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <p className="font-medium">{application.tutorName}</p>
                            <p className="text-sm text-gray-500">{application.tutorMobile}</p>
                          </div>
                          {application.status === 'pending' ? (
                            <div className="space-x-2">
                              <button
                                onClick={() => handleApplicationStatus(application.tutorMobile, 'accepted')}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleApplicationStatus(application.tutorMobile, 'rejected')}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              application.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No applications received yet.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuardianDashboard;