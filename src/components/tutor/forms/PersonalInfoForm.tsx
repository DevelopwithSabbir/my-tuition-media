import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Users } from 'lucide-react';

interface PersonalInfoFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    additionalPhone: initialData?.additionalPhone || '',
    fullName: initialData?.fullName || '',
    gender: initialData?.gender || '',
    currentCity: initialData?.currentCity || '',
    currentArea: initialData?.currentArea || '',
    permanentLocation: initialData?.permanentLocation || '',
    fatherName: initialData?.fatherName || '',
    fatherPhone: initialData?.fatherPhone || '',
    motherName: initialData?.motherName || '',
    motherPhone: initialData?.motherPhone || '',
    guardianNumber: initialData?.guardianNumber || '',
    guardianRelation: initialData?.guardianRelation || '',
    about: initialData?.about || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Basic Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Phone Number
            </label>
            <input
              type="tel"
              value={formData.additionalPhone}
              onChange={(e) => handleChange('additionalPhone', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter additional phone number"
            />
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <MapPin className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Location Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current City
            </label>
            <input
              type="text"
              value={formData.currentCity}
              onChange={(e) => handleChange('currentCity', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your current city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Area
            </label>
            <input
              type="text"
              value={formData.currentArea}
              onChange={(e) => handleChange('currentArea', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your current area"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permanent Location
            </label>
            <input
              type="text"
              value={formData.permanentLocation}
              onChange={(e) => handleChange('permanentLocation', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your permanent address"
            />
          </div>
        </div>
      </div>

      {/* Guardian Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Guardian Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Father's Name
            </label>
            <input
              type="text"
              value={formData.fatherName}
              onChange={(e) => handleChange('fatherName', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter father's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Father's Phone
            </label>
            <input
              type="tel"
              value={formData.fatherPhone}
              onChange={(e) => handleChange('fatherPhone', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter father's phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mother's Name
            </label>
            <input
              type="text"
              value={formData.motherName}
              onChange={(e) => handleChange('motherName', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter mother's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mother's Phone
            </label>
            <input
              type="tel"
              value={formData.motherPhone}
              onChange={(e) => handleChange('motherPhone', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter mother's phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Local Guardian Number
            </label>
            <input
              type="tel"
              value={formData.guardianNumber}
              onChange={(e) => handleChange('guardianNumber', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter local guardian's number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guardian Relationship
            </label>
            <input
              type="text"
              value={formData.guardianRelation}
              onChange={(e) => handleChange('guardianRelation', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., Uncle, Aunt"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <User className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            About Yourself
          </h3>
        </div>

        <div>
          <textarea
            value={formData.about}
            onChange={(e) => handleChange('about', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Write something about yourself..."
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Save Personal Information
      </button>
    </form>
  );
};

export default PersonalInfoForm;