import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MetricsProvider } from './contexts/MetricsContext';
import Navbar from './components/Navbar';
import HomePage from './components/home/HomePage';
import RegistrationPage from './components/forms/RegistrationPage';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';
import GuardianDashboardLayout from './components/guardian/dashboard/GuardianDashboardLayout';
import GuardianOverview from './components/guardian/dashboard/GuardianOverview';
import GuardianTuitions from './components/guardian/dashboard/GuardianTuitions';
import AdminDashboard from './components/admin/AdminDashboard';
import TutorDashboard from './components/tutor/TutorDashboard';
import JobBoard from './components/JobBoard';
import TutorListingPage from './components/tutors/TutorListingPage';
import TutorDetailPage from './components/tutors/TutorDetailPage';
import PrivateRoute from './components/PrivateRoute';
import ChatButtons from './components/chat/ChatButtons';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <MetricsProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify" element={<VerifyEmail />} />
                <Route path="/jobs" element={<JobBoard />} />
                <Route path="/tutors" element={<TutorListingPage />} />
                <Route path="/tutors/:tutorId" element={<TutorDetailPage />} />
                
                {/* Guardian Routes */}
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <GuardianDashboardLayout />
                  </PrivateRoute>
                }>
                  <Route index element={<GuardianOverview />} />
                  <Route path="tuitions" element={<GuardianTuitions />} />
                </Route>

                {/* Tutor Routes */}
                <Route
                  path="/tutor-dashboard/*"
                  element={
                    <PrivateRoute>
                      <TutorDashboard />
                    </PrivateRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/*"
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <ChatButtons />
            <Footer />
          </div>
        </Router>
      </MetricsProvider>
    </AuthProvider>
  );
}

export default App;