import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { calculateProfileCompletion, canApplyForTuition } from '../../utils/profileCompletion';

interface ProfileCompletionCardProps {
  profile: any;
}

const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({ profile }) => {
  const completion = calculateProfileCompletion(profile);
  const canApply = canApplyForTuition(profile);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Profile Completion</h2>
          <p className="text-gray-500">Complete your profile to get more opportunities</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-lime-600">{completion}%</span>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${
            completion >= 80 ? 'bg-lime-500' : 'bg-amber-500'
          }`}
          style={{ width: `${completion}%` }}
        />
      </div>

      {!canApply && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-amber-800">Profile Completion Required</h3>
              <p className="mt-1 text-sm text-amber-700">
                Complete at least 80% of your profile to apply for tuition jobs.
              </p>
              <Link
                to="/tutor-dashboard/profile/update"
                className="mt-2 inline-flex items-center text-sm font-medium text-amber-800 hover:text-amber-900"
              >
                Complete Profile →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionCard;