import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import CarouselContent from './CarouselContent';

// Lazy load keen-slider
const loadKeenSlider = () => import('keen-slider/react');

const slideData = [
  {
    id: 'explore',
    illustration: '/assets/illustrations/explore.svg',
    title: 'Explorer / Explore',
    caption: 'Clique sur une carte pour révéler son message / Click a card to reveal its message.',
    ariaLabel: 'Explorer - découvrez comment explorer vos cartes'
  },
  {
    id: 'spread',
    illustration: '/assets/illustrations/spread.svg',
    title: 'Tirage / Spread',
    caption: 'Utilise le tirage 3 cartes pour une méditation guidée / Use the 3-card spread for guided reflection.',
    ariaLabel: 'Tirage - découvrez comment faire un tirage de cartes'
  },
  {
    id: 'journal',
    illustration: '/assets/illustrations/journal.svg',
    title: 'Journale / Journal',
    caption: 'Ajoute la question miroir à ton journal / Add the mirror question to your journal.',
    ariaLabel: 'Journaler - découvrez comment utiliser votre journal'
  },
  {
    id: 'progress',
    illustration: '/assets/illustrations/progress.svg',
    title: 'Progresser / Progress',
    caption: 'Débloque des célébrations en découvrant plus de cartes / Unlock celebrations as you reveal more cards.',
    ariaLabel: 'Progresser - découvrez comment suivre votre progression'
  }
];

interface CardInstructionCarouselProps {
  className?: string;
}

const CardInstructionCarousel = ({ className = '' }: CardInstructionCarouselProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [KeenSlider, setKeenSlider] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load keen-slider when component becomes visible
  useEffect(() => {
    if (isVisible && !isLoaded) {
      loadKeenSlider()
        .then((module) => {
          setKeenSlider(module);
          setIsLoaded(true);
        })
        .catch(() => {
          console.warn('Failed to load keen-slider, using fallback');
        });
    }
  }, [isVisible, isLoaded]);

  // Render loading state
  if (!isVisible || !isLoaded) {
    return (
      <div ref={containerRef} className={`mt-20 ${className}`}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-royal-gold/20 rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-royal-gold/10 rounded mb-8 max-w-lg mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-royal-pearl/30 rounded-xl p-6 border border-royal-gold/20">
                  <div className="w-8 h-8 bg-royal-gold/20 rounded mb-4"></div>
                  <div className="h-4 bg-royal-gold/20 rounded mb-2"></div>
                  <div className="h-3 bg-royal-gold/10 rounded mb-3"></div>
                  <div className="h-3 bg-royal-gold/10 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render with keen-slider
  if (KeenSlider && isLoaded) {
    return (
      <CarouselContent
        slideData={slideData}
        KeenSlider={KeenSlider}
        prefersReducedMotion={prefersReducedMotion}
        className={className}
      />
    );
  }

  // Fallback static version
  return (
    <section 
      ref={containerRef}
      className={`mt-20 ${className}`}
      role="region"
      aria-label="How to use your cards"
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-[#F9F5EF] rounded-xl p-8 border border-royal-gold/20 shadow-soft overflow-hidden">
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-royal-purple mb-4">
                Comment utiliser vos cartes
              </h2>
              <p className="text-lg text-cabinet-aubergine/70 font-sans max-w-2xl mx-auto">
                Quatre étapes simples pour commencer votre voyage introspectif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {slideData.map((slide, index) => (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full min-h-[180px] p-6 bg-royal-pearl/50 rounded-xl border border-royal-gold/40 hover:border-royal-gold/60 transition-all duration-300 hover:-translate-y-0.5"
                  role="button"
                  aria-label={slide.ariaLabel}
                  tabIndex={0}
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <img 
                      src={slide.illustration} 
                      alt="" 
                      className="w-12 h-12 mb-4 text-royal-purple"
                      style={{ filter: 'brightness(0) saturate(100%) invert(17%) sepia(45%) saturate(1352%) hue-rotate(238deg) brightness(91%) contrast(96%)' }}
                    />
                    <h3 className="font-serif font-bold text-royal-purple text-lg mb-2">
                      {slide.title}
                    </h3>
                    <p className="font-sans text-sm text-cabinet-aubergine/90 leading-relaxed">
                      {slide.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardInstructionCarousel;