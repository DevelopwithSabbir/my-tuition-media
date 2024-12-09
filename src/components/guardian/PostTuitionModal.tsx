import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X } from 'lucide-react';

interface PostTuitionModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const PostTuitionModal: React.FC<PostTuitionModalProps> = ({ onClose, onSubmit }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: '',
    class: '',
    version: '',
    daysPerWeek: '',
    salary: '',
    location: '',
    studentGender: '',
    tutorRequirement: {
      institution: '',
      gender: '',
      experience: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tuitionPost = {
      ...formData,
      id: `post_${Date.now()}`,
      tuitionCode: `T${Math.floor(Math.random() * 10000)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      applications: []
    };
    
    localStorage.setItem(`tuition_post_${user?.mobile}_${Date.now()}`, JSON.stringify(tuitionPost));
    onSubmit(tuitionPost);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Post New Tuition</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
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
            </div>

            {/* Student & Tutor Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Tutor Gender
                </label>
                <select
                  value={formData.tutorRequirement.gender}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    tutorRequirement: { ...prev.tutorRequirement, gender: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="any">Any</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Experience
                </label>
                <select
                  value={formData.tutorRequirement.experience}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    tutorRequirement: { ...prev.tutorRequirement, experience: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">No Experience Required</option>
                  <option value="1">1+ Year</option>
                  <option value="2">2+ Years</option>
                  <option value="3">3+ Years</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Post Tuition
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostTuitionModal;