import React, { useState, useEffect } from 'react';
import { 
  User, CheckCircle, XCircle, Eye, Search,
  Filter, Download, Upload, AlertTriangle
} from 'lucide-react';

interface TutorProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  institution: string;
  department?: string;
  status: 'pending' | 'verified' | 'rejected';
  documents: {
    studentId?: string;
    nidCard?: string;
    lastCertificate?: string;
  };
  profileComplete: number;
  createdAt: string;
}

const TutorManagement = () => {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTutor, setSelectedTutor] = useState<TutorProfile | null>(null);

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = () => {
    const tutorProfiles: TutorProfile[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('tutor_profile_')) {
        const profile = JSON.parse(localStorage.getItem(key) || '{}');
        tutorProfiles.push({
          ...profile,
          id: key.replace('tutor_profile_', '')
        });
      }
    }
    setTutors(tutorProfiles.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const handleStatusChange = (tutorId: string, newStatus: 'verified' | 'rejected') => {
    const tutor = tutors.find(t => t.id === tutorId);
    if (tutor) {
      const updatedTutor = { ...tutor, status: newStatus };
      localStorage.setItem(`tutor_profile_${tutor.mobile}`, JSON.stringify(updatedTutor));
      loadTutors();
    }
  };

  const filteredTutors = tutors.filter(tutor => {
    const matchesFilter = filter === 'all' || tutor.status === filter;
    const matchesSearch = 
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.mobile.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tutor Management</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white rounded-lg border hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white rounded-lg border hover:bg-gray-50">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tutors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Tutors</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Tutors List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile Complete
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTutors.map((tutor) => (
                <tr key={tutor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{tutor.name}</div>
                        <div className="text-sm text-gray-500">{tutor.email}</div>
                        <div className="text-sm text-gray-500">{tutor.mobile}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{tutor.institution}</div>
                    {tutor.department && (
                      <div className="text-sm text-gray-500">{tutor.department}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${tutor.profileComplete}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{tutor.profileComplete}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tutor.status === 'verified'
                        ? 'bg-green-100 text-green-800'
                        : tutor.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tutor.status.charAt(0).toUpperCase() + tutor.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedTutor(tutor)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {tutor.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(tutor.id, 'verified')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(tutor.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTutors.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tutors found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No tutors match your current filters.
            </p>
          </div>
        )}
      </div>

      {/* Tutor Details Modal */}
      {selectedTutor && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">Tutor Details</h3>
                <button
                  onClick={() => setSelectedTutor(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedTutor.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedTutor.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedTutor.mobile}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedTutor.gender}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Documents</label>
                  <div className="mt-2 space-y-2">
                    {Object.entries(selectedTutor.documents).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        {value ? (
                          <span className="text-green-600">
                            <CheckCircle className="h-5 w-5" />
                          </span>
                        ) : (
                          <span className="text-red-600">
                            <XCircle className="h-5 w-5" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setSelectedTutor(null)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Close
                    </button>
                    {selectedTutor.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            handleStatusChange(selectedTutor.id, 'verified');
                            setSelectedTutor(null);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                          Verify Tutor
                        </button>
                        <button
                          onClick={() => {
                            handleStatusChange(selectedTutor.id, 'rejected');
                            setSelectedTutor(null);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          Reject Tutor
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorManagement;