import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Book, Users } from 'lucide-react';

interface GuardianRegistrationProps {
  onSuccess: () => void;
}

const GuardianRegistration: React.FC<GuardianRegistrationProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [registrationType, setRegistrationType] = useState<'quick' | 'full' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    studentGender: '',
    class: '',
    subject: '',
    version: '',
    daysPerWeek: '',
    salary: '',
    location: '',
    tutorRequirement: {
      institution: '',
      gender: 'any',
      experience: '',
      other: ''
    }
  });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guardianData = {
      id: `G${Date.now()}`,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      type: 'guardian',
      createdAt: new Date().toISOString(),
      tuitions: [],
      stats: {
        totalPosts: 0,
        activeTuitions: 0,
        pendingApplications: 0,
        completedTuitions: 0
      }
    };

    localStorage.setItem(`guardian_profile_${formData.mobile}`, JSON.stringify(guardianData));
    onSuccess();
    navigate('/login');
  };

  const handleFullSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create guardian profile
    const guardianData = {
      id: `G${Date.now()}`,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      type: 'guardian',
      createdAt: new Date().toISOString(),
      tuitions: [],
      stats: {
        totalPosts: 1,
        activeTuitions: 0,
        pendingApplications: 0,
        completedTuitions: 0
      }
    };
    
    // Create tuition post
    const tuitionPost = {
      id: `T${Date.now()}`,
      guardianId: guardianData.id,
      tuitionCode: `T${Math.floor(Math.random() * 10000)}`,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      applications: []
    };
    
    // Update guardian's tuitions
    guardianData.tuitions = [tuitionPost];
    
    // Save to localStorage
    localStorage.setItem(`guardian_profile_${formData.mobile}`, JSON.stringify(guardianData));
    localStorage.setItem(`tuition_post_${formData.mobile}_${Date.now()}`, JSON.stringify(tuitionPost));
    
    onSuccess();
    navigate('/login');
  };

  if (!registrationType) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Choose Registration Type</h2>
        
        <div className="space-y-4">
          <button
            onClick={() => setRegistrationType('quick')}
            className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-indigo-500 transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">Quick Registration</h3>
            <p className="text-gray-600">
              Register with just your basic information. You can post tuition requirements later.
            </p>
          </button>

          <button
            onClick={() => setRegistrationType('full')}
            className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-indigo-500 transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">Full Registration with Tuition Post</h3>
            <p className="text-gray-600">
              Complete registration and post your tuition requirement immediately.
            </p>
            <p className="mt-2 text-sm text-indigo-600">
              Recommended for urgent tutor requirements
            </p>
          </button>
        </div>
      </div>
    );
  }

  if (registrationType === 'quick') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Quick Registration</h2>
        
        <form onSubmit={handleQuickSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="01XXXXXXXXX"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setRegistrationType(null)}
              className="text-indigo-600 hover:text-indigo-700"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-center mb-8">Registration with Tuition Post</h2>
      
      <form onSubmit={handleFullSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2 text-indigo-600" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="01XXXXXXXXX"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Tuition Requirements */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Book className="w-5 h-5 mr-2 text-indigo-600" />
            Tuition Requirements
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <select
                value={formData.class}
                onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Class</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Class {i + 1}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Version
              </label>
              <select
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Version</option>
                <option value="bangla">Bangla Medium</option>
                <option value="english">English Medium</option>
                <option value="english_version">English Version</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Gender
              </label>
              <select
                value={formData.studentGender}
                onChange={(e) => setFormData(prev => ({ ...prev, studentGender: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Schedule & Location */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            Schedule & Location
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Days per Week
              </label>
              <input
                type="number"
                min="1"
                max="7"
                value={formData.daysPerWeek}
                onChange={(e) => setFormData(prev => ({ ...prev, daysPerWeek: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Salary (BDT)
              </label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Institution
              </label>
              <select
                value={formData.tutorRequirement.institution}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  tutorRequirement: { ...prev.tutorRequirement, institution: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Institution</option>
                <option value="du">Dhaka University</option>
                <option value="buet">BUET</option>
                <option value="medical">Medical College</option>
                <option value="engineering">Engineering University</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setRegistrationType(null)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Register & Post Tuition
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuardianRegistration;