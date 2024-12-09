import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  MapPin, GraduationCap, BookOpen, Star, 
  Clock, DollarSign, User, Mail, Phone,
  Calendar, CheckCircle, Award, MessageCircle,
  Eye, Heart, Share2, AlertTriangle
} from 'lucide-react';

interface TutorProfile {
  id: string;
  tutorId: string;
  name: string;
  university: string;
  department: string;
  about: string;
  profileImage?: string;
  education: {
    ssc: {
      institute: string;
      board: string;
      group: string;
      year: string;
      result: string;
    };
    hsc: {
      institute: string;
      board: string;
      group: string;
      year: string;
      result: string;
    };
    graduation: {
      institute: string;
      department: string;
      year: string;
      cgpa: string;
    };
  };
  tutoring: {
    livingLocation: string;
    preferredLocations: string[];
    preferredSubjects: string[];
    preferredClasses: string[];
    availableDays: string[];
    availableFrom: string;
    availableTo: string;
    experience: string;
    expectedSalary: string;
  };
  stats: {
    ratings: number;
    reviews: number;
    profileViews: number;
  };
}

interface Review {
  id: string;
  guardianId: string;
  guardianName: string;
  rating: number;
  review: string;
  date: string;
}

const TutorDetailPage = () => {
  const { tutorId } = useParams();
  const { user } = useAuth();
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    loadTutorProfile();
    loadReviews();
  }, [tutorId]);

  const loadTutorProfile = () => {
    // In a real app, this would be an API call
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('tutor_profile_')) {
        const profile = JSON.parse(localStorage.getItem(key) || '{}');
        if (profile.tutorId === tutorId) {
          setTutor(profile);
          break;
        }
      }
    }
  };

  const loadReviews = () => {
    // In a real app, this would be an API call
    const storedReviews = localStorage.getItem(`tutor_reviews_${tutorId}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  };

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900">Tutor Not Found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
              {tutor.profileImage ? (
                <img 
                  src={tutor.profileImage} 
                  alt={tutor.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                  <GraduationCap className="w-20 h-20 text-indigo-600" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{tutor.name}</h1>
                  <p className="text-xl text-gray-600">{tutor.university}</p>
                  <p className="text-gray-500">{tutor.department}</p>
                </div>
                <div className="mt-4 md:mt-0 text-center md:text-right">
                  <div className="text-sm text-gray-500">Tutor ID</div>
                  <div className="text-lg font-mono font-medium text-indigo-600">{tutor.tutorId}</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{tutor.stats.ratings}</span>
                  <span className="ml-1 text-gray-500">({tutor.stats.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Eye className="w-5 h-5 mr-1" />
                  <span>{tutor.stats.profileViews} profile views</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{tutor.tutoring.experience} experience</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                <button 
                  onClick={() => setShowDemoModal(true)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Request Demo Class
                </button>
                <button 
                  onClick={() => setShowContactInfo(true)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Tutor
                </button>
                <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-lg transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-lg transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 whitespace-pre-line">{tutor.about}</p>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
              <div className="space-y-6">
                {Object.entries(tutor.education).map(([level, details]: [string, any]) => (
                  <div key={level} className="flex items-start space-x-4">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{details.institute}</h3>
                      <p className="text-gray-500">{details.group} • {details.year}</p>
                      <p className="text-gray-500">Result: {details.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <User className="w-8 h-8 text-gray-400 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">{review.guardianName}</p>
                            <p className="text-sm text-gray-500">Guardian ID: {review.guardianId}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.review}</p>
                      <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No reviews yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tutoring Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>Location</span>
                  </div>
                  <span className="text-gray-900">{tutor.tutoring.livingLocation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Experience</span>
                  </div>
                  <span className="text-gray-900">{tutor.tutoring.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-5 h-5 mr-2" />
                    <span>Expected Salary</span>
                  </div>
                  <span className="text-gray-900">{tutor.tutoring.expectedSalary} BDT/month</span>
                </div>
              </div>
            </div>

            {/* Preferred Subjects */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Subjects & Classes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Preferred Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.tutoring.preferredSubjects.map((subject) => (
                      <span key={subject} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Preferred Classes</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.tutoring.preferredClasses.map((className) => (
                      <span key={className} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {className}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Available Days</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.tutoring.availableDays.map((day) => (
                      <span key={day} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="text-gray-900">
                    {tutor.tutoring.availableFrom} - {tutor.tutoring.availableTo}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Class Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full mx-4 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Demo Class</h3>
            {/* Add demo class request form here */}
            <button 
              onClick={() => setShowDemoModal(false)}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Info Modal */}
      {showContactInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full mx-4 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            {/* Add contact information here */}
            <button 
              onClick={() => setShowContactInfo(false)}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDetailPage;