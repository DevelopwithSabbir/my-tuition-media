import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Book } from 'lucide-react';

interface TuitionPreferencesFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const TuitionPreferencesForm: React.FC<TuitionPreferencesFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    districts: initialData?.districts || [],
    preferredAreas: initialData?.preferredAreas || [],
    preferredMedium: initialData?.preferredMedium || [],
    preferredClasses: initialData?.preferredClasses || [],
    preferredSubjects: initialData?.preferredSubjects || [],
    daysPerWeek: initialData?.daysPerWeek || '',
    timingShift: initialData?.timingShift || '',
    expectedSalary: initialData?.expectedSalary || '',
    tutoringStyle: initialData?.tutoringStyle || '',
    experience: initialData?.experience || '0'
  });

  const mediumOptions = [
    { value: 'bangla', label: 'Bangla Medium' },
    { value: 'english', label: 'English Medium' },
    { value: 'english_version', label: 'English Version' },
    { value: 'madrasa', label: 'Madrasa' }
  ];

  const classOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: `Class ${i + 1}`
  }));

  const subjectOptions = [
    { value: 'bangla', label: 'Bangla' },
    { value: 'english', label: 'English' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleMultiSelect = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(v => v !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <MapPin className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Location Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Districts
            </label>
            <select
              multiple
              value={formData.districts}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setFormData(prev => ({ ...prev, districts: values }));
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="dhaka">Dhaka</option>
              <option value="chittagong">Chittagong</option>
              <option value="rajshahi">Rajshahi</option>
              {/* Add more districts */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Areas
            </label>
            <input
              type="text"
              value={formData.preferredAreas.join(', ')}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferredAreas: e.target.value.split(',').map(area => area.trim())
              }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter areas separated by commas"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <Book className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Teaching Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Medium
            </label>
            <div className="space-y-2">
              {mediumOptions.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.preferredMedium.includes(option.value)}
                    onChange={() => handleMultiSelect('preferredMedium', option.value)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Classes
            </label>
            <div className="space-y-2">
              {classOptions.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.preferredClasses.includes(option.value)}
                    onChange={() => handleMultiSelect('preferredClasses', option.value)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Subjects
            </label>
            <div className="space-y-2">
              {subjectOptions.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.preferredSubjects.includes(option.value)}
                    onChange={() => handleMultiSelect('preferredSubjects', option.value)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-orange-50 rounded-lg">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Schedule & Compensation
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Days Per Week
            </label>
            <select
              value={formData.daysPerWeek}
              onChange={(e) => setFormData(prev => ({ ...prev, daysPerWeek: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select days</option>
              {[1, 2, 3, 4, 5, 6, 7].map(days => (
                <option key={days} value={days}>{days} days</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timing Shift
            </label>
            <select
              value={formData.timingShift}
              onChange={(e) => setFormData(prev => ({ ...prev, timingShift: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select shift</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Salary Range
            </label>
            <select
              value={formData.expectedSalary}
              onChange={(e) => setFormData(prev => ({ ...prev, expectedSalary: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select range</option>
              <option value="2000-3000">2000-3000 BDT</option>
              <option value="3000-4000">3000-4000 BDT</option>
              <option value="4000-5000">4000-5000 BDT</option>
              <option value="5000+">5000+ BDT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tutoring Experience
            </label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="0">No experience</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4+ years</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Save Tuition Preferences
      </button>
    </form>
  );
};

export default TuitionPreferencesForm;