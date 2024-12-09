import React, { useEffect, useState } from 'react';
import { MapPin, GraduationCap, Star, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TutorProfile {
  id: string;
  tutorId: string;
  name: string;
  university: string;
  department: string;
  about: string;
  profileImage?: string;
  tutoring?: {
    livingLocation?: string;
    preferredSubjects?: string[];
    experience?: string;
    expectedSalary?: string;
  };
  stats?: {
    ratings: number;
    reviews: number;
  };
}

const TutorListingPage = () => {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [filter, setFilter] = useState({
    subject: '',
    location: '',
    university: '',
    gender: ''
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const tutorProfiles: TutorProfile[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('tutor_profile_')) {
          const profile = JSON.parse(localStorage.getItem(key) || '{}');
          if (profile.status === 'verified') {
            tutorProfiles.push(profile);
          }
        }
      }
      setTutors(tutorProfiles);
      setLoading(false);
    }, 1000);
  };

  const filteredTutors = tutors.filter(tutor => {
    if (filter.subject && tutor.tutoring?.preferredSubjects?.includes(filter.subject) === false) {
      return false;
    }
    if (filter.location && tutor.tutoring?.livingLocation?.toLowerCase().includes(filter.location.toLowerCase()) === false) {
      return false;
    }
    if (filter.university && !tutor.university?.toLowerCase().includes(filter.university.toLowerCase())) {
      return false;
    }
    if (filter.gender && tutor.gender !== filter.gender) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Tutors</h1>
          <p className="mt-4 text-gray-600">Find the perfect tutor for your needs</p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="w-full flex items-center justify-center px-4 py-2 bg-white rounded-lg shadow"
          >
            <Filter className="w-4 h-4 mr-2" />
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters */}
        <div className={`bg-white rounded-xl shadow-lg p-4 mb-6 ${isFilterVisible ? 'block' : 'hidden md:block'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={filter.subject}
                onChange={(e) => setFilter(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">All Subjects</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={filter.location}
                onChange={(e) => setFilter(prev => ({ ...prev, location: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">All Locations</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <select
                value={filter.university}
                onChange={(e) => setFilter(prev => ({ ...prev, university: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">All Universities</option>
                <option value="du">Dhaka University</option>
                <option value="buet">BUET</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={filter.gender}
                onChange={(e) => setFilter(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="mt-4 h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Tutor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor) => (
                <div key={tutor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="w-24 h-24 flex-shrink-0 rounded-full bg-gray-100 overflow-hidden">
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
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{tutor.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{tutor.university}</p>
                        <p className="text-sm text-gray-500 truncate">{tutor.department}</p>
                        <div className="flex items-center justify-center sm:justify-start mt-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">{tutor.stats?.ratings || 0}</span>
                          <span className="mx-1 text-gray-300">•</span>
                          <span className="text-sm text-gray-600">{tutor.stats?.reviews || 0} reviews</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="text-sm truncate">{tutor.tutoring?.livingLocation || 'Location not set'}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                        <div className="flex flex-wrap gap-1">
                          {tutor.tutoring?.preferredSubjects?.slice(0, 3).map((subject, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full"
                            >
                              {subject}
                            </span>
                          ))}
                          {(tutor.tutoring?.preferredSubjects?.length || 0) > 3 && (
                            <span className="text-xs text-gray-500">
                              +{(tutor.tutoring?.preferredSubjects?.length || 0) - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Link 
                      to={`/tutors/${tutor.tutorId}`}
                      className="mt-4 block w-full py-2 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      View Full Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredTutors.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900">No Tutors Found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your filters or check back later</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TutorListingPage;