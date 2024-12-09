import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Feedback {
  id: string;
  guardianName: string;
  profession: string;
  location: string;
  rating: number;
  feedback: string;
  date: string;
  profileImage?: string;
}

const GuardianFeedbackSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    // Load feedbacks from localStorage
    const loadFeedbacks = () => {
      const storedFeedbacks: Feedback[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('feedback_')) {
          const feedback = JSON.parse(localStorage.getItem(key) || '{}');
          storedFeedbacks.push(feedback);
        }
      }
      setFeedbacks(storedFeedbacks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    loadFeedbacks();
  }, []);

  useEffect(() => {
    if (feedbacks.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [feedbacks.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };

  if (feedbacks.length === 0) {
    return (
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Guardians Say</h2>
            <p className="mt-4 text-gray-600">Hear from our satisfied guardians</p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <Quote className="w-12 h-12 mx-auto text-gray-300 mb-6" />
            <p className="text-gray-600 mb-8">Be the first to share your experience with our tutoring services!</p>
            <Link
              to="/feedback"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Submit Feedback
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Guardians Say</h2>
          <p className="mt-4 text-gray-600">Trusted by thousands of families</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Feedback Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-4">
                {feedbacks[currentIndex].profileImage ? (
                  <img
                    src={feedbacks[currentIndex].profileImage}
                    alt={feedbacks[currentIndex].guardianName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                    <Quote className="w-8 h-8 text-indigo-600" />
                  </div>
                )}
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < feedbacks[currentIndex].rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-xl text-gray-800 text-center mb-6">
                "{feedbacks[currentIndex].feedback}"
              </blockquote>

              <div className="text-center">
                <h4 className="font-semibold text-gray-900">
                  {feedbacks[currentIndex].guardianName}
                </h4>
                <p className="text-gray-600 text-sm">
                  {feedbacks[currentIndex].profession}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {feedbacks[currentIndex].location}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {feedbacks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-indigo-600 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Submit Feedback Button */}
        <div className="text-center mt-12">
          <Link
            to="/feedback"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Share Your Experience
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuardianFeedbackSection;