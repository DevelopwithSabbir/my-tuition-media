import React, { useState } from 'react';
import { School, GraduationCap, BookOpen } from 'lucide-react';

interface EducationFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const EducationalInfoForm: React.FC<EducationFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    ssc: {
      institute: initialData?.ssc?.institute || '',
      curriculum: initialData?.ssc?.curriculum || '',
      group: initialData?.ssc?.group || '',
      passingYear: initialData?.ssc?.passingYear || '',
      result: initialData?.ssc?.result || ''
    },
    hsc: {
      institute: initialData?.hsc?.institute || '',
      curriculum: initialData?.hsc?.curriculum || '',
      group: initialData?.hsc?.group || '',
      passingYear: initialData?.hsc?.passingYear || '',
      result: initialData?.hsc?.result || ''
    },
    graduation: {
      instituteType: initialData?.graduation?.instituteType || '',
      institute: initialData?.graduation?.institute || '',
      studyType: initialData?.graduation?.studyType || '',
      department: initialData?.graduation?.department || '',
      curriculum: initialData?.graduation?.curriculum || '',
      year: initialData?.graduation?.year || '',
      cgpa: initialData?.graduation?.cgpa || ''
    }
  });

  const curriculumOptions = [
    { value: 'bangla', label: 'Bangla Medium' },
    { value: 'english', label: 'English Medium' },
    { value: 'english_version', label: 'English Version' },
    { value: 'madrasa', label: 'Madrasa' }
  ];

  const groupOptions = [
    { value: 'science', label: 'Science' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'humanities', label: 'Humanities' }
  ];

  const instituteTypeOptions = [
    { value: 'public', label: 'Public University' },
    { value: 'private', label: 'Private University' },
    { value: 'national', label: 'National University' },
    { value: 'engineering', label: 'Engineering University' },
    { value: 'medical', label: 'Medical College' }
  ];

  const handleChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* SSC Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <School className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Secondary / SSC / O-level / Dakhil
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institute
            </label>
            <input
              type="text"
              value={formData.ssc.institute}
              onChange={(e) => handleChange('ssc', 'institute', e.target.value)}
              placeholder="ex: Saint Joseph Higher Secondary School"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Curriculum
            </label>
            <select
              value={formData.ssc.curriculum}
              onChange={(e) => handleChange('ssc', 'curriculum', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select One</option>
              {curriculumOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group
            </label>
            <select
              value={formData.ssc.group}
              onChange={(e) => handleChange('ssc', 'group', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select One</option>
              {groupOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passing Year
            </label>
            <select
              value={formData.ssc.passingYear}
              onChange={(e) => handleChange('ssc', 'passingYear', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">2024</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Result
            </label>
            <input
              type="text"
              value={formData.ssc.result}
              onChange={(e) => handleChange('ssc', 'result', e.target.value)}
              placeholder="ex: 5.00"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* HSC Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <BookOpen className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Higher Secondary / HSC / A level / Alim
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institute
            </label>
            <input
              type="text"
              value={formData.hsc.institute}
              onChange={(e) => handleChange('hsc', 'institute', e.target.value)}
              placeholder="ex: Notre Dame College, Dhaka"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Curriculum
            </label>
            <select
              value={formData.hsc.curriculum}
              onChange={(e) => handleChange('hsc', 'curriculum', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select One</option>
              {curriculumOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group
            </label>
            <select
              value={formData.hsc.group}
              onChange={(e) => handleChange('hsc', 'group', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select One</option>
              {groupOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passing Year
            </label>
            <select
              value={formData.hsc.passingYear}
              onChange={(e) => handleChange('hsc', 'passingYear', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">2024</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Result
            </label>
            <input
              type="text"
              value={formData.hsc.result}
              onChange={(e) => handleChange('hsc', 'result', e.target.value)}
              placeholder="ex: 5.00"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>

      {/* Graduation Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-50 rounded-lg">
            <GraduationCap className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Graduation / Bachelor / Diploma
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institute Type
            </label>
            <select
              value={formData.graduation.instituteType}
              onChange={(e) => handleChange('graduation', 'instituteType', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select One</option>
              {instituteTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institute
            </label>
            <input
              type="text"
              value={formData.graduation.institute}
              onChange={(e) => handleChange('graduation', 'institute', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Study Type
            </label>
            <select
              value={formData.graduation.studyType}
              onChange={(e) => handleChange('graduation', 'studyType', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select One</option>
              <option value="regular">Regular</option>
              <option value="evening">Evening</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              value={formData.graduation.department}
              onChange={(e) => handleChange('graduation', 'department', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passing Year/Semester/Year
            </label>
            <select
              value={formData.graduation.year}
              onChange={(e) => handleChange('graduation', 'year', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">First Year</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
              <option value="final">Final Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CGPA / Current CGPA
            </label>
            <input
              type="text"
              value={formData.graduation.cgpa}
              onChange={(e) => handleChange('graduation', 'cgpa', e.target.value)}
              placeholder="Enter your CGPA"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Save Educational Information
      </button>
    </form>
  );
};

export default EducationalInfoForm;