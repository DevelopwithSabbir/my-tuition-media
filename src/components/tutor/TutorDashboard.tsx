import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TutorLayout from './TutorLayout';
import TutorOverview from './TutorOverview';
import TutorProfile from './TutorProfile';
import TutorProfileUpdate from './TutorProfileUpdate';
import TutorPayments from './TutorPayments';
import JobBoard from '../JobBoard';
import TutorApplications from './TutorApplications';

const TutorDashboard = () => {
  return (
    <TutorLayout>
      <Routes>
        <Route path="/" element={<TutorOverview />} />
        <Route path="/profile" element={<TutorProfile />} />
        <Route path="/profile/update" element={<TutorProfileUpdate />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/applications" element={<TutorApplications />} />
        <Route path="/payments" element={<TutorPayments />} />
      </Routes>
    </TutorLayout>
  );
};

export default TutorDashboard;