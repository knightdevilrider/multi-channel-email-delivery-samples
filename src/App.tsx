import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import AccessibilityControls from './components/AccessibilityControls';
import HeroSection from './components/HeroSection';
import BenefitsGrid from './components/BenefitsGrid';
import JourneyTimeline from './components/JourneyTimeline';
import TestimonialsSection from './components/TestimonialsSection';
import SocialProofTicker from './components/SocialProofTicker';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Interactive3DBackground from './components/Interactive3DBackground';
import Navigation from './components/Navigation';

function App() {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-dark-bg text-white font-montserrat relative overflow-x-hidden">
        {/* 3D Interactive Background */}
        <div className="fixed inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <Interactive3DBackground />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={false}
              autoRotate={false}
            />
          </Canvas>
        </div>
        
        {/* Gradient Overlay */}
        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-dark-bg/30 to-dark-bg z-10 pointer-events-none" />
        
        <Navigation />
        
        <div className="relative z-20">
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
        </div>
        
        <AccessibilityControls />
      </div>
    </AccessibilityProvider>
  );
}

export default App;