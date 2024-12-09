import React from 'react';
import { Search, Clock, CheckCircle, GraduationCap, BookOpen, Award } from 'lucide-react';

const HowItWorksSection = () => {
  const studentSteps = [
    {
      icon: Search,
      title: "Search for Tutors",
      description: "Browse through our verified tutors or post your requirements",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Clock,
      title: "Book Demo Class",
      description: "Schedule a free demo session with your chosen tutor",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: CheckCircle,
      title: "Confirm Your Tutor",
      description: "If satisfied, hire the tutor and start learning",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Award,
      title: "Achieve Goals",
      description: "Excel in your studies with personalized guidance",
      color: "text-yellow-600 bg-yellow-100"
    }
  ];

  const tutorSteps = [
    {
      icon: GraduationCap,
      title: "Create Profile",
      description: "Set up your professional tutor profile",
      color: "text-indigo-600 bg-indigo-100"
    },
    {
      icon: BookOpen,
      title: "Apply for Jobs",
      description: "Browse and apply to relevant tuition jobs",
      color: "text-teal-600 bg-teal-100"
    },
    {
      icon: Clock,
      title: "Give Demo Class",
      description: "Showcase your teaching skills in a demo session",
      color: "text-rose-600 bg-rose-100"
    },
    {
      icon: Award,
      title: "Start Earning",
      description: "Begin your tutoring journey and earn",
      color: "text-amber-600 bg-amber-100"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* For Students Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works for Students</h2>
            <p className="mt-4 text-gray-600">Find your perfect tutor in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {studentSteps.map((step, index) => (
              <div key={index} className="relative">
                {index < studentSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 right-0 w-full h-0.5 bg-gray-200">
                    <div className="absolute right-0 -top-2 w-4 h-4 transform rotate-45 border-t-2 border-r-2 border-gray-200"></div>
                  </div>
                )}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                  <div className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mb-4`}>
                    <step.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* For Tutors Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works for Tutors</h2>
            <p className="mt-4 text-gray-600">Start your tutoring journey in 4 easy steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tutorSteps.map((step, index) => (
              <div key={index} className="relative">
                {index < tutorSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 right-0 w-full h-0.5 bg-gray-200">
                    <div className="absolute right-0 -top-2 w-4 h-4 transform rotate-45 border-t-2 border-r-2 border-gray-200"></div>
                  </div>
                )}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                  <div className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mb-4`}>
                    <step.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;