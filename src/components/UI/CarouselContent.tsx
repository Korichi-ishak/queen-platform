import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SlideData {
  id: string;
  illustration: string;
  title: string;
  caption: string;
  ariaLabel: string;
}

interface CarouselContentProps {
  slideData: SlideData[];
  KeenSlider: any;
  prefersReducedMotion: boolean;
  className?: string;
}

const CarouselContent = ({ slideData, KeenSlider, prefersReducedMotion, className = '' }: CarouselContentProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [hasPulseAnimated, setHasPulseAnimated] = useState(false);
  const [sliderRef, setSliderRef] = useState<any>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Setup keen-slider
  const { useKeenSlider } = KeenSlider;
  const [sliderReference] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 24,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 4,
          spacing: 24,
        },
      },
    },
    slideChanged(slider: any) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider: any) {
      setSliderRef(slider);
    },
  });

  // Setup autoplay
  const startAutoplay = useCallback(() => {
    if (prefersReducedMotion || autoplayPaused) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
      if (sliderRef?.next) {
        sliderRef.next();
      }
    }, 6000);
  }, [prefersReducedMotion, autoplayPaused, sliderRef, slideData.length]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle autoplay
  useEffect(() => {
    if (!prefersReducedMotion) {
      startAutoplay();
    }
    
    return () => stopAutoplay();
  }, [prefersReducedMotion, startAutoplay, stopAutoplay]);

  // Pause autoplay on hover/focus
  const handleMouseEnter = useCallback(() => {
    setAutoplayPaused(true);
    stopAutoplay();
  }, [stopAutoplay]);

  const handleMouseLeave = useCallback(() => {
    setAutoplayPaused(false);
    if (!prefersReducedMotion) {
      startAutoplay();
    }
  }, [prefersReducedMotion, startAutoplay]);

  // Pulse animation for first slide
  useEffect(() => {
    if (!hasPulseAnimated) {
      const timer = setTimeout(() => {
        setHasPulseAnimated(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasPulseAnimated]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setCurrentSlide(index);
      if (sliderRef?.moveToIdx) {
        sliderRef.moveToIdx(index);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setCurrentSlide(index - 1);
      if (sliderRef?.prev) {
        sliderRef.prev();
      }
    } else if (e.key === 'ArrowRight' && index < slideData.length - 1) {
      setCurrentSlide(index + 1);
      if (sliderRef?.next) {
        sliderRef.next();
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className={`mt-20 ${className}`}
      role="region"
      aria-label="How to use your cards"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-[#F9F5EF] rounded-xl p-8 border border-royal-gold/20 shadow-soft overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-royal-gold to-royal-champagne"></div>
          </div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-royal-purple mb-4">
                Comment utiliser vos cartes
              </h2>
              <p className="text-lg text-cabinet-aubergine/70 font-sans max-w-2xl mx-auto">
                Quatre étapes simples pour commencer votre voyage introspectif.
              </p>
            </div>

            {/* Carousel */}
            <div ref={sliderReference} className="keen-slider">
              {slideData.map((slide, index) => (
                <div key={slide.id} className="keen-slider__slide">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`h-full min-h-[180px] p-6 bg-royal-pearl/50 rounded-xl border-2 transition-all duration-300 cursor-pointer
                      ${currentSlide === index ? 'border-royal-gold shadow-royal' : 'border-royal-gold/40 hover:border-royal-gold/60'}
                      ${!hasPulseAnimated && index === 0 ? 'animate-pulse' : ''}
                      hover:-translate-y-0.5 focus-within:-translate-y-0.5
                    `}
                    tabIndex={0}
                    role="button"
                    aria-label={slide.ariaLabel}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onClick={() => {
                      setCurrentSlide(index);
                      if (sliderRef?.moveToIdx) {
                        sliderRef.moveToIdx(index);
                      }
                    }}
                  >
                    <div className="flex items-start space-x-4 h-full">
                      {/* Illustration - Left 40% */}
                      <div className="w-2/5 flex-shrink-0 flex items-center justify-center">
                        <img 
                          src={slide.illustration} 
                          alt="" 
                          className="w-12 h-12 text-royal-purple"
                          style={{ filter: 'brightness(0) saturate(100%) invert(17%) sepia(45%) saturate(1352%) hue-rotate(238deg) brightness(91%) contrast(96%)' }}
                        />
                      </div>
                      
                      {/* Content - Right 60% */}
                      <div className="w-3/5 flex flex-col justify-center">
                        <h3 className="font-serif font-bold text-royal-purple text-lg mb-2">
                          {slide.title}
                        </h3>
                        <p className="font-sans text-sm text-cabinet-aubergine/90 leading-relaxed">
                          {slide.caption}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {slideData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    if (sliderRef?.moveToIdx) {
                      sliderRef.moveToIdx(index);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-royal-gold/60 ${
                    currentSlide === index 
                      ? 'bg-royal-gold' 
                      : 'bg-royal-gold/30 hover:bg-royal-gold/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselContent;