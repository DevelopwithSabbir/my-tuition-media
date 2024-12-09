import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Globe, Users, BookOpen } from 'lucide-react';

const TuitionTypesSection = () => {
  const types = [
    {
      icon: Home,
      title: "Home Tutoring",
      description: "One-on-one personalized learning at your home",
      color: "from-blue-500 to-indigo-600",
      link: "/jobs?type=home"
    },
    {
      icon: Globe,
      title: "Online Tutoring",
      description: "Learn from anywhere with our virtual classroom",
      color: "from-green-500 to-teal-600",
      link: "/jobs?type=online"
    },
    {
      icon: Users,
      title: "Group Study",
      description: "Join study groups for collaborative learning",
      color: "from-purple-500 to-pink-600",
      link: "/jobs?type=group"
    },
    {
      icon: BookOpen,
      title: "Special Courses",
      description: "Specialized courses for competitive exams",
      color: "from-orange-500 to-red-600",
      link: "/jobs?type=special"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Learning Style</h2>
          <p className="mt-4 text-gray-600">Find the perfect tutoring option that suits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {types.map((type, index) => (
            <Link
              key={index}
              to={type.link}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="p-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                  Learn More
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TuitionTypesSection;