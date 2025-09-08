import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import AccessibilityControls from './components/AccessibilityControls';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import NotFound from './components/common/NotFound';

// Lazy load components for code splitting
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3
};

function App() {
  return (
    <AccessibilityProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-dark-bg text-white font-montserrat relative overflow-x-hidden">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <LandingPage />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/app" 
                  element={
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <Dashboard />
                    </motion.div>
                  } 
                />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
            
            {/* Global Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  border: '1px solid rgba(65, 105, 225, 0.3)',
                  borderRadius: '12px',
                },
                success: {
                  iconTheme: {
                    primary: '#4169E1',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#FF007A',
                    secondary: '#fff',
                  },
                },
              }}
            />
            
            <AccessibilityControls />
          </div>
        </Router>
      </ErrorBoundary>
    </AccessibilityProvider>
  );
}

export default App;