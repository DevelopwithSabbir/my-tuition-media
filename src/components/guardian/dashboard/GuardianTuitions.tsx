import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  MapPin, 
  Clock, 
  DollarSign,
  Eye
} from 'lucide-react';

const GuardianTuitions = () => {
  const { user } = useAuth();
  const guardianProfile = JSON.parse(localStorage.getItem(`guardian_profile_${user?.mobile}`) || '{}');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Tuition Posts</h2>

        <div className="space-y-4">
          {guardianProfile.tuitions?.map((tuition: any, index: number) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {tuition.subject} - Class {tuition.class}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tuition.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tuition.status}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {tuition.location}
                  </p>
                </div>
                <Link
                  to={`/dashboard/tuitions/${tuition.id}`}
                  className="flex items-center px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-gray-400" />
                  <div>
                    <p className="text-sm">Days per Week</p>
                    <p className="font-medium">{tuition.daysPerWeek} days</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
                  <div>
                    <p className="text-sm">Monthly Salary</p>
                    <p className="font-medium">{tuition.salary} BDT</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-2 text-gray-400" />
                  <div>
                    <p className="text-sm">Applications</p>
                    <p className="font-medium">{tuition.applications?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {(!guardianProfile.tuitions || guardianProfile.tuitions.length === 0) && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No Tuition Posts</h3>
              <p className="text-gray-500">You haven't posted any tuition requests yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuardianTuitions;