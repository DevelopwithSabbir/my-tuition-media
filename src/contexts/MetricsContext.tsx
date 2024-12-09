import React, { createContext, useContext, useState, useEffect } from 'react';

interface Metrics {
  activeTutors: number;
  liveTuitions: number;
  happyStudents: number;
  averageRating: number;
}

interface MetricsContextType {
  metrics: Metrics;
  refreshMetrics: () => void;
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export const MetricsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<Metrics>({
    activeTutors: 0,
    liveTuitions: 0,
    happyStudents: 0,
    averageRating: 0
  });

  const calculateMetrics = () => {
    // Count active tutors from localStorage
    let tutorCount = 0;
    let totalRating = 0;
    let ratingCount = 0;
    let tuitionCount = 0;
    let studentCount = 0;

    // Count tutors and calculate average rating
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('tutor_profile_')) {
        const tutorData = JSON.parse(localStorage.getItem(key) || '{}');
        if (tutorData.status !== 'rejected') {
          tutorCount++;
          if (tutorData.rating) {
            totalRating += tutorData.rating;
            ratingCount++;
          }
        }
      }
      // Count live tuitions
      else if (key?.startsWith('tuition_post_')) {
        const tuitionData = JSON.parse(localStorage.getItem(key) || '{}');
        if (tuitionData.status === 'approved') {
          tuitionCount++;
        }
      }
      // Count students/guardians
      else if (key?.startsWith('guardian_profile_')) {
        studentCount++;
      }
    }

    setMetrics({
      activeTutors: tutorCount,
      liveTuitions: tuitionCount,
      happyStudents: studentCount,
      averageRating: ratingCount > 0 ? Number((totalRating / ratingCount).toFixed(1)) : 0
    });
  };

  const refreshMetrics = () => {
    calculateMetrics();
  };

  useEffect(() => {
    calculateMetrics();
    // Refresh metrics every minute
    const interval = setInterval(calculateMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MetricsContext.Provider value={{ metrics, refreshMetrics }}>
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (context === undefined) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
};