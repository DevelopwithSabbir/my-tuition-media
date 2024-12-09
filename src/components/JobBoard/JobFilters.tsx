import React, { useState } from 'react';
import { Search, Filter, MapPin, Book, Clock, DollarSign, Users } from 'lucide-react';

interface JobFiltersProps {
  onFilterChange: (filters: any) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    tuitionType: 'all',
    tutorGender: 'all',
    location: '',
    class: '',
    subject: '',
    salary: '',
    availability: 'all'
  });

  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by subject, location, or class..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tuition Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <Book className="w-4 h-4 mr-2 text-indigo-500" />
            Tuition Type
          </label>
          <select
            value={filters.tuitionType}
            onChange={(e) => handleFilterChange('tuitionType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="home">Home Tuition</option>
            <option value="online">Online Tuition</option>
            <option value="group">Group Study</option>
          </select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Class */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <Book className="w-4 h-4 mr-2 text-indigo-500" />
            Class
          </label>
          <select
            value={filters.class}
            onChange={(e) => handleFilterChange('class', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Classes</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>Class {i + 1}</option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <Book className="w-4 h-4 mr-2 text-indigo-500" />
            Subject
          </label>
          <select
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="english">English</option>
          </select>
        </div>

        {/* Salary Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-indigo-500" />
            Salary Range
          </label>
          <select
            value={filters.salary}
            onChange={(e) => handleFilterChange('salary', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Any Salary</option>
            <option value="0-2000">Below 2000 BDT</option>
            <option value="2000-4000">2000-4000 BDT</option>
            <option value="4000-6000">4000-6000 BDT</option>
            <option value="6000+">Above 6000 BDT</option>
          </select>
        </div>

        {/* Tutor Gender */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <Users className="w-4 h-4 mr-2 text-indigo-500" />
            Tutor Gender
          </label>
          <select
            value={filters.tutorGender}
            onChange={(e) => handleFilterChange('tutorGender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Any Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Availability */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-indigo-500" />
            Availability
          </label>
          <select
            value={filters.availability}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Any Time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>
      </div>

      {/* Reset Filters */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            const defaultFilters = {
              searchTerm: '',
              tuitionType: 'all',
              tutorGender: 'all',
              location: '',
              class: '',
              subject: '',
              salary: '',
              availability: 'all'
            };
            setFilters(defaultFilters);
            onFilterChange(defaultFilters);
          }}
          className="flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <Filter className="w-4 h-4 mr-2" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilters;