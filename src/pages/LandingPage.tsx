import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/landing/HeroSection';
import BenefitsGrid from '../components/BenefitsGrid';
import JourneyTimeline from '../components/JourneyTimeline';
import TestimonialsSection from '../components/TestimonialsSection';
import SocialProofTicker from '../components/SocialProofTicker';
import FAQSection from '../components/FAQSection';
import Footer from '../components/landing/Footer';
import Navigation from '../components/landing/Navigation';

const LandingPage: React.FC = () => {
  return (
    <>
      <Navigation />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
        <BenefitsGrid />
        <JourneyTimeline />
        <TestimonialsSection />
        <SocialProofTicker />
        <FAQSection />
        <Footer />
      </motion.div>
    </>
  );
};

export default LandingPage;