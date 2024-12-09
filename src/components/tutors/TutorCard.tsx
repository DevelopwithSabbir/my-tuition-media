import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, GraduationCap, Star, BookOpen } from 'lucide-react';

interface TutorCardProps {
  tutor: {
    id: string;
    name: string;
    university: string;
    department: string;
    location: string;
    subjects: string[];
    rating: number;
    reviews: number;
    profileImage?: string;
  };
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
            {tutor.profileImage ? (
              <img 
                src={tutor.profileImage} 
                alt={tutor.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                <GraduationCap className="w-12 h-12 text-indigo-600" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{tutor.name}</h3>
            <p className="text-gray-500">{tutor.university}</p>
            <p className="text-sm text-gray-500">{tutor.department}</p>
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{tutor.rating}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-600">{tutor.reviews} reviews</span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{tutor.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {tutor.subjects.map((subject, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Link 
          to={`/tutors/${tutor.id}`}
          className="mt-6 block w-full py-2 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;