import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, GraduationCap, Users } from 'lucide-react';
import { subjects } from '../../data/subjects';
import { useAuth } from '../../contexts/AuthContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useState({
    subject: '',
    otherSubject: '',
    location: '',
    gender: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/tutors/active', { 
      state: { 
        filters: {
          subject: searchParams.subject === 'other' ? searchParams.otherSubject : searchParams.subject,
          location: searchParams.location,
          gender: searchParams.gender
        }
      }
    });
  };

  const handleHireTutor = () => {
    navigate('/tutors/active');
  };

  const handleBecomeTutor = () => {
    if (!user) {
      navigate('/register', { state: { type: 'tutor' } });
    } else {
      navigate('/tutor-dashboard/jobs');
    }
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-teal-700">
        {/* Animated Shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full mix-blend-overlay animate-float"></div>
          <div className="absolute bottom-40 right-20 w-60 h-60 bg-white rounded-full mix-blend-overlay animate-float-delayed"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Gateway to the Best Tutors for
            <span className="block text-teal-400">Home & Online Learning</span>
          </h1>
          <p className="text-xl text-gray-200 italic mb-12">
            Find a tutor in your area and start learning today
          </p>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 transform hover:scale-[1.02] transition-transform duration-300">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Subject Search */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <div className="relative">
                    <select
                      value={searchParams.subject}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, subject: e.target.value }))}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map(subject => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {searchParams.subject === 'other' && (
                    <input
                      type="text"
                      value={searchParams.otherSubject}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, otherSubject: e.target.value }))}
                      placeholder="Enter subject name"
                      className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  )}
                </div>

                {/* Location Search */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchParams.location}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter your location"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Gender Preference */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tutor Gender</label>
                  <div className="relative">
                    <select
                      value={searchParams.gender}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, gender: e.target.value }))}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Any Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
              >
                <Search className="inline-block w-5 h-5 mr-2 -mt-1" />
                Find a Tutor
              </button>
            </form>
          </div>

          {/* Live Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-white">
            <div className="animate-pulse">
              <span className="font-bold text-2xl">50+</span>
              <span className="block text-sm opacity-80">verified tutors online</span>
            </div>
            <div className="animate-pulse delay-100">
              <span className="font-bold text-2xl">20</span>
              <span className="block text-sm opacity-80">new tuition requests today</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button
            onClick={handleHireTutor}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 group"
          >
            Hire a Tutor
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button
            onClick={handleBecomeTutor}
            className="px-8 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 group"
          >
            Become a Tutor
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;