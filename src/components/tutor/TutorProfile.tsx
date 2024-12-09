import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Phone, MapPin, GraduationCap, Edit } from 'lucide-react';

const TutorProfile = () => {
  const { user } = useAuth();
  const tutorProfile = JSON.parse(localStorage.getItem(`tutor_profile_${user?.mobile}`) || '{}');

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-indigo-600" />
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-500">Tutor ID: {tutorProfile.tutorId}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                {tutorProfile.personalInfo?.currentCity || 'Location not set'}
              </div>
            </div>
          </div>
          <Link
            to="/tutor-dashboard/profile/update"
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user?.mobile}</p>
            </div>
          </div>
          <div className="flex items-center">
            <GraduationCap className="w-5 h-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Profile Status</p>
              <p className="font-medium">{tutorProfile.status || 'Pending'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Education Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Education</h2>
            <Link
              to="/tutor-dashboard/profile/update?tab=education"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Edit
            </Link>
          </div>
          {tutorProfile.education ? (
            <div className="space-y-4">
              {/* Education details will be displayed here */}
            </div>
          ) : (
            <p className="text-gray-500">No education information added yet.</p>
          )}
        </div>

        {/* Tuition Preferences */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Tuition Preferences</h2>
            <Link
              to="/tutor-dashboard/profile/update?tab=tuition"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Edit
            </Link>
          </div>
          {tutorProfile.tuitionPreferences ? (
            <div className="space-y-4">
              {/* Tuition preferences will be displayed here */}
            </div>
          ) : (
            <p className="text-gray-500">No tuition preferences set yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;