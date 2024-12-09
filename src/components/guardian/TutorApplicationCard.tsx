import React from 'react';
import { User, CheckCircle, X } from 'lucide-react';

interface TutorApplication {
  tutorId: string;
  tutorName: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface TutorApplicationCardProps {
  application: TutorApplication;
  onAccept: () => void;
  onReject: () => void;
}

const TutorApplicationCard: React.FC<TutorApplicationCardProps> = ({
  application,
  onAccept,
  onReject
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{application.tutorName}</h4>
          <p className="text-sm text-gray-500">Tutor ID: {application.tutorId}</p>
        </div>
      </div>

      {application.status === 'pending' ? (
        <div className="flex items-center space-x-2">
          <button
            onClick={onAccept}
            className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Accept
          </button>
          <button
            onClick={onReject}
            className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <X className="w-4 h-4 mr-1" />
            Reject
          </button>
        </div>
      ) : (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          application.status === 'accepted'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      )}
    </div>
  );
};

export default TutorApplicationCard;