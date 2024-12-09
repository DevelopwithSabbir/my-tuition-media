import React, { useState } from 'react';
import { MapPin, GraduationCap, BookOpen, Users } from 'lucide-react';
import TuitionCategoryCard from './TuitionCategoryCard';
import { useMetrics } from '../../contexts/MetricsContext';

type CategoryType = 'area' | 'university' | 'medium' | 'preference';

const CategorizedTuitionSection = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('area');
  const { metrics } = useMetrics();

  const categories = {
    area: [
      { name: 'Mirpur', count: metrics.liveTuitions, icon: MapPin },
      { name: 'Uttara', count: metrics.liveTuitions, icon: MapPin },
      { name: 'Dhanmondi', count: metrics.liveTuitions, icon: MapPin },
      { name: 'Gulshan', count: metrics.liveTuitions, icon: MapPin }
    ],
    university: [
      { name: 'DU', count: metrics.liveTuitions, icon: GraduationCap },
      { name: 'BUET', count: metrics.liveTuitions, icon: GraduationCap },
      { name: 'NSU', count: metrics.liveTuitions, icon: GraduationCap },
      { name: 'IUT', count: metrics.liveTuitions, icon: GraduationCap }
    ],
    medium: [
      { name: 'Bangla Medium', count: metrics.liveTuitions, icon: BookOpen },
      { name: 'English Medium', count: metrics.liveTuitions, icon: BookOpen },
      { name: 'English Version', count: metrics.liveTuitions, icon: BookOpen },
      { name: 'Madrasa', count: metrics.liveTuitions, icon: BookOpen }
    ],
    preference: [
      { name: 'Male Tutors', count: metrics.liveTuitions, icon: Users },
      { name: 'Female Tutors', count: metrics.liveTuitions, icon: Users }
    ]
  };

  const tabs = [
    { id: 'area', label: 'Area-wise' },
    { id: 'university', label: 'University-wise' },
    { id: 'medium', label: 'Medium-wise' },
    { id: 'preference', label: 'Tutor Preference' }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Find Tuition by Category</h2>
          <p className="mt-4 text-gray-600">
            Browse live tuition opportunities tailored to your preferences
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as CategoryType)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories[activeCategory].map((category, index) => (
            <TuitionCategoryCard
              key={index}
              name={category.name}
              count={category.count}
              Icon={category.icon}
              type={activeCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorizedTuitionSection;