import React from 'react';
import { Search, Filter } from 'lucide-react';

interface TutorFiltersProps {
  filters: {
    subject: string;
    location: string;
    university: string;
    gender: string;
  };
  onFilterChange: (filters: any) => void;
}

const TutorFilters: React.FC<TutorFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select
            value={filters.subject}
            onChange={(e) => onFilterChange({ ...filters, subject: e.target.value })}
            className="w-full rounded-lg border-gray-300"
          >
            <option value="">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="english">English</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="w-full rounded-lg border-gray-300"
          >
            <option value="">All Locations</option>
            <option value="dhaka">Dhaka</option>
            <option value="chittagong">Chittagong</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="khulna">Khulna</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
          <select
            value={filters.university}
            onChange={(e) => onFilterChange({ ...filters, university: e.target.value })}
            className="w-full rounded-lg border-gray-300"
          >
            <option value="">All Universities</option>
            <option value="du">Dhaka University</option>
            <option value="buet">BUET</option>
            <option value="medical">Medical College</option>
            <option value="ruet">RUET</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            value={filters.gender}
            onChange={(e) => onFilterChange({ ...filters, gender: e.target.value })}
            className="w-full rounded-lg border-gray-300"
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TutorFilters;