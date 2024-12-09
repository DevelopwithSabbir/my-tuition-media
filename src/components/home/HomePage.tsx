import React from 'react';
import HeroSection from './HeroSection';
import MetricsSection from './MetricsSection';
import HowItWorksSection from './HowItWorksSection';
import TuitionTypesSection from './TuitionTypesSection';
import CategorizedTuitionSection from './CategorizedTuitionSection';
import GuardianFeedbackSection from './GuardianFeedbackSection';
import TutorTestimonialsSection from './TutorTestimonialsSection';
import Footer from '../Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MetricsSection />
      <HowItWorksSection />
      <TuitionTypesSection />
      <CategorizedTuitionSection />
      <GuardianFeedbackSection />
      <TutorTestimonialsSection />
      <Footer />
    </div>
  );
};

export default HomePage;