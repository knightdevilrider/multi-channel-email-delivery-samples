import React from 'react';
import { motion } from 'framer-motion';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import AccessibilityControls from './components/AccessibilityControls';
import HeroSection from './components/HeroSection';
import BenefitsGrid from './components/BenefitsGrid';
import JourneyTimeline from './components/JourneyTimeline';
import TestimonialsSection from './components/TestimonialsSection';
import SocialProofTicker from './components/SocialProofTicker';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import ParticleField from './components/ParticleField';
import Navigation from './components/Navigation';
import VantaBirdsBackground from './components/VantaBirdsBackground';

function App() {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-dark-bg text-white font-montserrat relative overflow-x-hidden">
        <VantaBirdsBackground />
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
        
        <AccessibilityControls />
      </div>
    </AccessibilityProvider>
  );
}

export default App;