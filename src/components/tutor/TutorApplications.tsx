import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, MapPin, BookOpen, DollarSign } from 'lucide-react';

interface Application {
  id: string;
  tuitionCode: string;
  subject: string;
  class: string;
  location: string;
  salary: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

const TutorApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  useEffect(() => {
    loadApplications();
  }, [user]);

  const loadApplications = () => {
    // Load applications from localStorage
    const apps: Application[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('application_') && key.includes(user?.mobile || '')) {
        const appData = JSON.parse(localStorage.getItem(key) || '{}');
        apps.push(appData);
      }
    }
    setApplications(apps.sort((a, b) => 
      new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
    ));
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {application.subject} - Class {application.class}
                      </h3>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {application.tuitionCode}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        {application.location}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {application.salary} BDT/month
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Applied {new Date(application.appliedAt).toLocaleDateString()}
                  </div>
                </div>

                {application.status === 'accepted' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800">
                      Congratulations! Your application has been accepted. The guardian will contact you soon.
                    </p>
                  </div>
                )}
              </div>
            ))}

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No applications found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorApplications;