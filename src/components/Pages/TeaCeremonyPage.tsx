import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
const TeaCeremonyTeaser = lazy(() => import('./TeaCeremonyTeaser'));


const TeaCeremonyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); 
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ivory flex flex-col items-center justify-center p-4"
    >
      <div className={`vignette-backdrop ${isOpen ? 'show' : ''}`} />
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative z-10 w-full max-w-md"
        >
            <Suspense fallback={<div className="text-white">Loading Teaser...</div>}>
              <TeaCeremonyTeaser />
            </Suspense>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="fixed bottom-4 right-4 max-w-xs bg-gradient-to-r from-smokedGold/20 to-vintage/20 backdrop-blur-sm rounded-lg p-4 border border-imperial-gold/30 z-30"
      >
        <div className="flex items-start space-x-3">
          <InformationCircleIcon className="w-6 h-6 text-imperial-gold flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-playfair font-bold text-royal-purple text-sm mb-1">
              Accessibility Features
            </h3>
            <ul className="text-aubergine-violet/70 font-raleway text-xs space-y-1">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-imperial-gold mr-2 check-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Focus trap enabled
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-imperial-gold mr-2 check-mark" style={{animationDelay: '0.2s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                ARIA dialog pattern
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-imperial-gold mr-2 check-mark" style={{animationDelay: '0.4s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Keyboard navigation
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-imperial-gold mr-2 check-mark" style={{animationDelay: '0.6s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Screen reader support
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeaCeremonyPage; 