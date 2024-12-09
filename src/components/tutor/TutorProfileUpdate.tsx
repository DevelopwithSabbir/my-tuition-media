import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Upload, AlertTriangle } from 'lucide-react';
import TutorEducation from './forms/TutorEducation';
import TuitionPreferencesForm from './forms/TuitionPreferencesForm';
import PersonalInfoForm from './forms/PersonalInfoForm';
import DocumentUpload from './DocumentUpload';
import { calculateProfileCompletion } from '../../utils/profileCompletion';

const TutorProfileUpdate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pin, setPin] = useState('');

  useEffect(() => {
    // Load existing profile data
    const storedProfile = localStorage.getItem(`tutor_profile_${user?.mobile}`);
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setProfileData(profile);
      setPin(profile.pin || '');
      if (profile.profileImage) {
        setImagePreview(profile.profileImage);
      }
    }
  }, [user]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
  };

  const handleSubmit = async () => {
    const updatedProfile = {
      ...profileData,
      pin,
      profileImage: imagePreview,
      profileComplete: calculateProfileCompletion({
        ...profileData,
        pin,
        profileImage: imagePreview
      })
    };

    localStorage.setItem(`tutor_profile_${user?.mobile}`, JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
    navigate('/tutor-dashboard/profile');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'education', label: 'Education' },
    { id: 'tuition', label: 'Tuition Preferences' },
    { id: 'documents', label: 'Documents' }
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-full h-full p-6 text-gray-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700">
              <Upload className="w-4 h-4" />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Profile Completion */}
          <div className="mt-4 w-full max-w-xs">
            <div className="flex justify-between text-sm mb-1">
              <span>Profile Completion</span>
              <span>{profileData?.profileComplete || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${profileData?.profileComplete || 0}%` }}
              />
            </div>
          </div>

          {/* PIN Setup */}
          <div className="mt-6 w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Set 4-digit PIN
            </label>
            <input
              type="text"
              value={pin}
              onChange={handlePinChange}
              placeholder="Enter 4-digit PIN"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              maxLength={4}
            />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto space-x-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 whitespace-nowrap rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'personal' && (
            <PersonalInfoForm
              initialData={profileData?.personalInfo}
              onSubmit={(data) => {
                const updated = {
                  ...profileData,
                  personalInfo: data,
                  profileComplete: calculateProfileCompletion({
                    ...profileData,
                    personalInfo: data
                  })
                };
                setProfileData(updated);
                localStorage.setItem(`tutor_profile_${user?.mobile}`, JSON.stringify(updated));
              }}
            />
          )}
          {activeTab === 'education' && (
            <TutorEducation
              initialData={profileData?.education}
              onSubmit={(data) => {
                const updated = {
                  ...profileData,
                  education: data,
                  profileComplete: calculateProfileCompletion({
                    ...profileData,
                    education: data
                  })
                };
                setProfileData(updated);
                localStorage.setItem(`tutor_profile_${user?.mobile}`, JSON.stringify(updated));
              }}
            />
          )}
          {activeTab === 'tuition' && (
            <TuitionPreferencesForm
              initialData={profileData?.tuitionPreferences}
              onSubmit={(data) => {
                const updated = {
                  ...profileData,
                  tuitionPreferences: data,
                  profileComplete: calculateProfileCompletion({
                    ...profileData,
                    tuitionPreferences: data
                  })
                };
                setProfileData(updated);
                localStorage.setItem(`tutor_profile_${user?.mobile}`, JSON.stringify(updated));
              }}
            />
          )}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <DocumentUpload
                label="Student ID Card"
                description="Upload your current student ID card"
                onUpload={(file) => {
                  const updated = {
                    ...profileData,
                    documents: {
                      ...profileData?.documents,
                      studentId: URL.createObjectURL(file)
                    },
                    profileComplete: calculateProfileCompletion({
                      ...profileData,
                      documents: {
                        ...profileData?.documents,
                        studentId: file.name
                      }
                    })
                  };
                  setProfileData(updated);
                  localStorage.setItem(`tutor_profile_${user?.mobile}`, JSON.stringify(updated));
                }}
                currentFile={profileData?.documents?.studentId}
              />
              <DocumentUpload
                label="NID Card"
                description="Upload your National ID card"
                onUpload={(file) => {
                  const updated = {
                    ...profileData,
                    documents: {
                      ...profileData?.documents,
                      nidCard: URL.createObjectURL(file)
                    },
                    profileComplete: calculateProfileCompletion({
                      ...profileData,
                      documents: {
                        ...profileData?.documents,
                        nidCard: file.name
                      }
                    })
                  };
                  setProfileData(updated);
                  localStorage.setItem(`tutor_profile_${user?.mobile}`, JSON.stringify(updated));
                }}
                currentFile={profileData?.documents?.nidCard}
              />
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfileUpdate;