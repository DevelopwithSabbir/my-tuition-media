import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  MapPin, 
  GraduationCap, 
  User, 
  FileCheck,
  ChevronRight,
  ChevronLeft,
  X,
  Plus
} from 'lucide-react';

interface Step {
  id: string;
  label: string;
  icon: React.ElementType;
  progress: number;
}

const steps: Step[] = [
  { id: 'tutoring', label: 'Tutoring Information', icon: MapPin, progress: 10 },
  { id: 'education', label: 'Education Information', icon: GraduationCap, progress: 20 },
  { id: 'personal', label: 'Personal Information', icon: User, progress: 40 },
  { id: 'documents', label: 'Credential', icon: FileCheck, progress: 10 }
];

const ProfileUpdateWizard = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    tutoring: {
      country: 'Bangladesh',
      currentCity: '',
      livingLocation: '',
      preferredLocations: [] as string[],
      preferredCategories: [] as string[],
      preferredSubjects: [] as string[],
      preferredClasses: [] as string[],
      experience: ''
    },
    education: {
      ssc: {
        institute: '',
        curriculum: '',
        group: '',
        passingYear: '',
        result: ''
      },
      hsc: {
        institute: '',
        curriculum: '',
        group: '',
        passingYear: '',
        result: ''
      },
      graduation: {
        instituteType: '',
        institute: '',
        department: '',
        year: '',
        cgpa: ''
      }
    },
    personal: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.mobile || '',
      gender: '',
      currentAddress: '',
      permanentAddress: '',
      about: ''
    },
    documents: {
      studentId: null as File | null,
      nidCard: null as File | null,
      lastCertificate: null as File | null
    }
  });

  const calculateTotalProgress = () => {
    let completed = 0;
    const totalSteps = steps.length;
    
    // Add logic to calculate completion based on filled fields
    if (formData.tutoring.currentCity && formData.tutoring.preferredLocations.length > 0) {
      completed += steps[0].progress;
    }
    if (formData.education.ssc.institute && formData.education.hsc.institute) {
      completed += steps[1].progress;
    }
    if (formData.personal.fullName && formData.personal.phone) {
      completed += steps[2].progress;
    }
    if (Object.values(formData.documents).some(doc => doc !== null)) {
      completed += steps[3].progress;
    }

    return completed;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAddLocation = (location: string) => {
    if (!formData.tutoring.preferredLocations.includes(location)) {
      setFormData(prev => ({
        ...prev,
        tutoring: {
          ...prev.tutoring,
          preferredLocations: [...prev.tutoring.preferredLocations, location]
        }
      }));
    }
  };

  const handleRemoveLocation = (location: string) => {
    setFormData(prev => ({
      ...prev,
      tutoring: {
        ...prev.tutoring,
        preferredLocations: prev.tutoring.preferredLocations.filter(loc => loc !== location)
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
          <span className="text-2xl font-bold text-lime-600">{calculateTotalProgress()}%</span>
        </div>
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${calculateTotalProgress()}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lime-500 transition-all duration-500"
            />
          </div>
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index <= currentStep ? 'text-lime-600' : 'text-gray-400'
                }`}
              >
                <div className="relative">
                  <div
                    className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                      index <= currentStep ? 'bg-lime-100' : 'bg-gray-100'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-xs text-center">{step.progress}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {currentStep === 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Location & Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Country</label>
                <input
                  type="text"
                  value={formData.tutoring.country}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Current City</label>
                <input
                  type="text"
                  value={formData.tutoring.currentCity}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    tutoring: { ...prev.tutoring, currentCity: e.target.value }
                  }))}
                  placeholder="Enter your current city"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Tutoring Locations
                </label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {formData.tutoring.preferredLocations.map((location) => (
                    <span
                      key={location}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-lime-100 text-lime-800"
                    >
                      {location}
                      <button
                        type="button"
                        onClick={() => handleRemoveLocation(location)}
                        className="ml-2 inline-flex items-center p-0.5 rounded-full text-lime-400 hover:bg-lime-200 hover:text-lime-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddLocation('New Location')}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Location
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Add multiple locations to increase your chances of getting tuition jobs
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 ${
              currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lime-600 hover:bg-lime-700"
          >
            Next Step
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateWizard;