import React from 'react';
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  Users, 
  Calendar,
  Globe,
  Building,
  GraduationCap,
  DollarSign,
  Share2,
  Navigation,
  Briefcase,
  Target,
  CheckCircle
} from 'lucide-react';

interface JobDetailsProps {
  job: {
    id: string;
    class: string;
    subject: string;
    version: string;
    daysPerWeek: string;
    salary: string;
    location: string;
    studentGender: string;
    tutorRequirement: {
      institution: string;
      gender: string;
      experience?: string;
      other?: string;
    };
    tuitionCode?: string;
    createdAt: string;
  };
  onApply: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onApply }) => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Premium Header with Glass Effect */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 mb-8">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm mb-4">
                <Clock className="h-4 w-4 mr-2" />
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Class {job.class} • {job.subject}
              </h1>
              <p className="text-indigo-100 flex items-center text-lg">
                <MapPin className="h-5 w-5 mr-2" />
                {job.location}
              </p>
            </div>
            <div className="text-right">
              <div className="text-indigo-100 mb-1 text-sm">Tuition ID</div>
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl font-mono text-white text-xl">
                {job.tuitionCode || `T${Math.floor(Math.random() * 10000)}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Student Information */}
          <section className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="h-6 w-6 mr-3 text-indigo-600" />
              Student Information
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <DetailCard
                icon={<BookOpen className="h-5 w-5 text-indigo-600" />}
                label="Subject"
                value={job.subject}
              />
              <DetailCard
                icon={<Target className="h-5 w-5 text-indigo-600" />}
                label="Version"
                value={job.version}
              />
              <DetailCard
                icon={<Users className="h-5 w-5 text-indigo-600" />}
                label="Gender"
                value={job.studentGender}
              />
              <DetailCard
                icon={<Calendar className="h-5 w-5 text-indigo-600" />}
                label="Days per Week"
                value={`${job.daysPerWeek} days`}
              />
            </div>
          </section>

          {/* Tutor Requirements */}
          <section className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <GraduationCap className="h-6 w-6 mr-3 text-indigo-600" />
              Tutor Requirements
            </h2>
            <div className="space-y-4">
              <RequirementCard
                icon={<Building className="h-5 w-5" />}
                title="Institution"
                description={job.tutorRequirement.institution}
              />
              <RequirementCard
                icon={<Users className="h-5 w-5" />}
                title="Gender Preference"
                description={job.tutorRequirement.gender}
              />
              {job.tutorRequirement.experience && (
                <RequirementCard
                  icon={<Briefcase className="h-5 w-5" />}
                  title="Experience"
                  description={job.tutorRequirement.experience}
                />
              )}
              {job.tutorRequirement.other && (
                <RequirementCard
                  icon={<CheckCircle className="h-5 w-5" />}
                  title="Additional Requirements"
                  description={job.tutorRequirement.other}
                />
              )}
            </div>
          </section>
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Quick Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Information</h3>
            <div className="space-y-4">
              <QuickInfoItem
                icon={<DollarSign className="h-5 w-5 text-green-600" />}
                label="Monthly Salary"
                value={`${job.salary} BDT`}
              />
              <QuickInfoItem
                icon={<Clock className="h-5 w-5 text-blue-600" />}
                label="Class Time"
                value="6:00 PM"
              />
              <QuickInfoItem
                icon={<Users className="h-5 w-5 text-purple-600" />}
                label="Students"
                value="1"
              />
              <QuickInfoItem
                icon={<Globe className="h-5 w-5 text-indigo-600" />}
                label="Mode"
                value="Home Tutoring"
              />
              
              <div className="pt-6 space-y-3">
                <button
                  onClick={onApply}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Apply Now</span>
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                    <Navigation className="h-4 w-4 mr-2" />
                    Direction
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const RequirementCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
    <div className="p-2 bg-white rounded-lg shadow-sm">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const QuickInfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-gray-600">{label}</span>
    </div>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

export default JobDetails;