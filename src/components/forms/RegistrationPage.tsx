import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorRegistration from './TutorRegistration';
import GuardianRegistration from './GuardianRegistration';
import { GraduationCap, Users } from 'lucide-react';

const RegistrationPage = () => {
  const [userType, setUserType] = useState<'tutor' | 'guardian' | null>(null);
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    navigate('/jobs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {!userType ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Create an Account
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Join EduPro Tuition as a tutor or guardian
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <button
                onClick={() => setUserType('tutor')}
                className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-500"
              >
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                    <GraduationCap className="h-8 w-8 text-indigo-600 group-hover:text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">Register as a Tutor</h3>
                  <p className="mt-2 text-gray-500 text-center">Share your knowledge and earn</p>
                </div>
              </button>

              <button
                onClick={() => setUserType('guardian')}
                className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-500"
              >
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                    <Users className="h-8 w-8 text-indigo-600 group-hover:text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">Register as a Guardian</h3>
                  <p className="mt-2 text-gray-500 text-center">Find the perfect tutor</p>
                </div>
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <button
              onClick={() => setUserType(null)}
              className="mb-8 text-sm text-indigo-600 hover:text-indigo-500 flex items-center group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-150">←</span>
              <span className="ml-2">Back to selection</span>
            </button>
            {userType === 'tutor' ? (
              <TutorRegistration onSuccess={handleRegistrationSuccess} />
            ) : (
              <GuardianRegistration onSuccess={handleRegistrationSuccess} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;