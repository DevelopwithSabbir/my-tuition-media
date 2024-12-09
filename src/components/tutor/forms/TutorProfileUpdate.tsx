import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TutorLayout from './TutorLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import EducationalInfoForm from './forms/EducationalInfoForm';
import TuitionPreferencesForm from './forms/TuitionPreferencesForm';
import PersonalInfoForm from './forms/PersonalInfoForm';
import DocumentUpload from './DocumentUpload';
import { calculateProfileCompletion } from '../../utils/profileCompletion';

const TutorProfileUpdate = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('education');
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    // Load existing profile data
    const storedProfile = localStorage.getItem(`tutor_profile_${user?.mobile}`);
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    }
  }, [user]);

  const handleEducationSubmit = (data: any) => {
    const updatedProfile = {
      ...profileData,
      education: data,
      profileComplete: calculateProfileCompletion({
        ...profileData,
        education: data
      })
    };
    localStorage.setItem(`tutor_profile_${user?.mobile}`, JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
  };

  const handleTuitionSubmit = (data: any) => {
    const updatedProfile = {
      ...profileData,
      tuitionPreferences: data,
      profileComplete: calculateProfileCompletion({
        ...profileData,
        tuitionPreferences: data
      })
    };
    localStorage.setItem(`tutor_profile_${user?.mobile}`, JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
  };

  const handlePersonalSubmit = (data: any) => {
    const updatedProfile = {
      ...profileData,
      personalInfo: data,
      profileComplete: calculateProfileCompletion({
        ...profileData,
        personalInfo: data
      })
    };
    localStorage.setItem(`tutor_profile_${user?.mobile}`, JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
  };

  const handleDocumentUpload = (type: string, file: File) => {
    // In a real app, you would upload to a server
    // Here we'll just store the file name
    const updatedProfile = {
      ...profileData,
      documents: {
        ...profileData?.documents,
        [type]: file.name
      },
      profileComplete: calculateProfileCompletion({
        ...profileData,
        documents: {
          ...profileData?.documents,
          [type]: file.name
        }
      })
    };
    localStorage.setItem(`tutor_profile_${user?.mobile}`, JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
  };

  return (
    <TutorLayout>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Update Profile Information</h2>
              <p className="text-gray-500 mt-1">
                Profile Completion: {profileData?.profileComplete || 0}%
              </p>
            </div>
          </div>

          <Tabs defaultValue={activeTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="education">Educational Info</TabsTrigger>
              <TabsTrigger value="tuition">Tuition Info</TabsTrigger>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="education">
              <EducationalInfoForm 
                onSubmit={handleEducationSubmit}
                initialData={profileData?.education}
              />
            </TabsContent>

            <TabsContent value="tuition">
              <TuitionPreferencesForm
                onSubmit={handleTuitionSubmit}
                initialData={profileData?.tuitionPreferences}
              />
            </TabsContent>

            <TabsContent value="personal">
              <PersonalInfoForm
                onSubmit={handlePersonalSubmit}
                initialData={profileData?.personalInfo}
              />
            </TabsContent>

            <TabsContent value="documents">
              <div className="space-y-6">
                <DocumentUpload
                  label="Student ID Card"
                  description="Upload your current student ID card"
                  onUpload={(file) => handleDocumentUpload('studentId', file)}
                  currentFile={profileData?.documents?.studentId}
                />
                <DocumentUpload
                  label="NID Card"
                  description="Upload your National ID card"
                  onUpload={(file) => handleDocumentUpload('nidCard', file)}
                  currentFile={profileData?.documents?.nidCard}
                />
                <DocumentUpload
                  label="Last Educational Certificate"
                  description="Upload your latest educational certificate"
                  onUpload={(file) => handleDocumentUpload('lastCertificate', file)}
                  currentFile={profileData?.documents?.lastCertificate}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TutorLayout>
  );
};

export default TutorProfileUpdate;