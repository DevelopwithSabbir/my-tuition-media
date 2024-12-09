import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TutorTestimonial {
  id: string;
  tutorName: string;
  expertise: string;
  institution: string;
  rating: number;
  testimonial: string;
  profileImage?: string;
}

const TutorTestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<TutorTestimonial[]>([]);

  useEffect(() => {
    // Load testimonials from localStorage
    const loadTestimonials = () => {
      const storedTestimonials: TutorTestimonial[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('tutor_testimonial_')) {
          const testimonial = JSON.parse(localStorage.getItem(key) || '{}');
          storedTestimonials.push(testimonial);
        }
      }
      setTestimonials(storedTestimonials);
    };

    loadTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (testimonials.length === 0) {
    return (
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Tutors Say</h2>
            <p className="mt-4 text-gray-600">Join our growing community of educators</p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <GraduationCap className="w-12 h-12 mx-auto text-gray-300 mb-6" />
            <p className="text-gray-600 mb-8">Be the first tutor to share your experience!</p>
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Join as a Tutor
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Tutors Say</h2>
          <p className="mt-4 text-gray-600">Hear from our experienced educators</p>
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

          {/* Testimonial Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-4">
                {testimonials[currentIndex].profileImage ? (
                  <img
                    src={testimonials[currentIndex].profileImage}
                    alt={testimonials[currentIndex].tutorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                    <GraduationCap className="w-8 h-8 text-indigo-600" />
                  </div>
                )}
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < testimonials[currentIndex].rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-xl text-gray-800 text-center mb-6">
                "{testimonials[currentIndex].testimonial}"
              </blockquote>

              <div className="text-center">
                <h4 className="font-semibold text-gray-900">
                  {testimonials[currentIndex].tutorName}
                </h4>
                <p className="text-gray-600 text-sm">
                  {testimonials[currentIndex].expertise}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {testimonials[currentIndex].institution}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
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

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Join Our Tutor Community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorTestimonialsSection;