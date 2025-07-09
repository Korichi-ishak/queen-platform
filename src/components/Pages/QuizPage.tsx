import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Tilt from 'react-parallax-tilt';
import { 
  HeartIcon, 
  SparklesIcon, 
  SunIcon, 
  MoonIcon,
  FireIcon,
  BeakerIcon,
  EyeIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  StarIcon
} from '@heroicons/react/24/outline';

// Lazy load confetti
const loadConfetti = () => import('canvas-confetti');

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    icon: React.ComponentType<{ className?: string }>;
    archetype: string;
  }[];
}

interface QuizResult {
  name: string;
  portrait: string;
  description: string;
  color: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle qualité vous définit le mieux ?",
    options: [
      { id: 'a', text: 'Compassion', icon: HeartIcon, archetype: 'Bienveillante' },
      { id: 'b', text: 'Créativité', icon: SparklesIcon, archetype: 'Créative' },
      { id: 'c', text: 'Sagesse', icon: EyeIcon, archetype: 'Sage' },
      { id: 'd', text: 'Force', icon: ShieldCheckIcon, archetype: 'Guerrière' }
    ]
  },
  {
    id: 2,
    question: "Votre moment préféré de la journée ?",
    options: [
      { id: 'a', text: 'Lever du soleil', icon: SunIcon, archetype: 'Solaire' },
      { id: 'b', text: 'Coucher de soleil', icon: MoonIcon, archetype: 'Lunaire' },
      { id: 'c', text: 'Minuit', icon: MoonIcon, archetype: 'Mystique' },
      { id: 'd', text: 'Midi', icon: FireIcon, archetype: 'Visionnaire' }
    ]
  },
  {
    id: 3,
    question: "Votre environnement idéal ?",
    options: [
      { id: 'a', text: 'Jardin secret', icon: SparklesIcon, archetype: 'Bienveillante' },
      { id: 'b', text: 'Atelier créatif', icon: BeakerIcon, archetype: 'Créative' },
      { id: 'c', text: 'Bibliothèque', icon: EyeIcon, archetype: 'Sage' },
      { id: 'd', text: 'Sommet de montagne', icon: ShieldCheckIcon, archetype: 'Guerrière' }
    ]
  },
  {
    id: 4,
    question: "Votre façon d'aider les autres ?",
    options: [
      { id: 'a', text: 'Écouter avec le cœur', icon: HeartIcon, archetype: 'Bienveillante' },
      { id: 'b', text: 'Inspirer par l\'art', icon: SparklesIcon, archetype: 'Créative' },
      { id: 'c', text: 'Partager la connaissance', icon: EyeIcon, archetype: 'Sage' },
      { id: 'd', text: 'Montrer l\'exemple', icon: ShieldCheckIcon, archetype: 'Guerrière' }
    ]
  },
  {
    id: 5,
    question: "Votre plus grande force ?",
    options: [
      { id: 'a', text: 'Empathie', icon: HeartIcon, archetype: 'Bienveillante' },
      { id: 'b', text: 'Imagination', icon: SparklesIcon, archetype: 'Créative' },
      { id: 'c', text: 'Intuition', icon: EyeIcon, archetype: 'Sage' },
      { id: 'd', text: 'Détermination', icon: ShieldCheckIcon, archetype: 'Guerrière' }
    ]
  },
  {
    id: 6,
    question: "Comment rechargez-vous vos batteries ?",
    options: [
      { id: 'a', text: 'Méditation', icon: MoonIcon, archetype: 'Lunaire' },
      { id: 'b', text: 'Création artistique', icon: SparklesIcon, archetype: 'Créative' },
      { id: 'c', text: 'Lecture', icon: EyeIcon, archetype: 'Sage' },
      { id: 'd', text: 'Sport/Défi', icon: FireIcon, archetype: 'Guerrière' }
    ]
  },
  {
    id: 7,
    question: "Votre style de leadership ?",
    options: [
      { id: 'a', text: 'Avec le cœur', icon: HeartIcon, archetype: 'Bienveillante' },
      { id: 'b', text: 'Avec innovation', icon: SparklesIcon, archetype: 'Créative' },
      { id: 'c', text: 'Avec sagesse', icon: EyeIcon, archetype: 'Sage' },
      { id: 'd', text: 'Avec courage', icon: ShieldCheckIcon, archetype: 'Guerrière' }
    ]
  },
  {
    id: 8,
    question: "Votre vision du bonheur ?",
    options: [
      { id: 'a', text: 'Harmonie collective', icon: HeartIcon, archetype: 'Bienveillante' },
      { id: 'b', text: 'Expression créative', icon: SparklesIcon, archetype: 'Créative' },
      { id: 'c', text: 'Compréhension profonde', icon: EyeIcon, archetype: 'Sage' },
      { id: 'd', text: 'Accomplissement personnel', icon: ShieldCheckIcon, archetype: 'Guerrière' }
    ]
  }
];

const queenResults: { [key: string]: QuizResult } = {
  'Bienveillante': {
    name: 'La Reine Solaire',
    portrait: '/assets/quiz-results/solar-queen.svg',
    description: 'Votre énergie rayonne comme le soleil, illuminant tout sur votre passage. Vous êtes une source naturelle d\'inspiration et de chaleur humaine. Votre présence apporte joie et réconfort à ceux qui vous entourent.',
    color: 'from-[#F5E6E9] to-[#FDF7F2]'
  },
  'Créative': {
    name: 'L\'Impératrice Rebelle',
    portrait: '/assets/quiz-results/rebel-queen.svg',
    description: 'Votre esprit libre défie les conventions avec grâce et audace. Vous n\'avez pas peur de tracer votre propre chemin et d\'inspirer les autres à embrasser leur authenticité. Votre créativité révolutionnaire change le monde.',
    color: 'from-[#E3BBB2] to-[#F5E6E9]'
  },
  'Sage': {
    name: 'La Souveraine Sage',
    portrait: '/assets/quiz-results/sage-queen.svg',
    description: 'Votre sagesse profonde et votre intuition vous guident vers la vérité. Vous êtes une source de conseil et de guidance pour ceux qui cherchent des réponses. Votre connaissance éclaire le chemin des autres.',
    color: 'from-[#C8A96B] to-[#F5E6E9]'
  },
  'Guerrière': {
    name: 'La Reine Lunaire',
    portrait: '/assets/quiz-results/lunar-queen.svg',
    description: 'Votre force mystique puise dans les cycles naturels et l\'intuition féminine. Vous maîtrisez l\'art de la transformation et de l\'adaptation. Votre sagesse émotionnelle guide vos décisions avec une profondeur remarquable.',
    color: 'from-[#D4B5A5] to-[#F9ECEF]'
  }
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [result, setResult] = useState<QuizResult | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  
  const ariaLiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Staggered answer reveal animation
    if (!prefersReducedMotion) {
      const options = document.querySelectorAll('.quiz-option-card');
      gsap.fromTo(options, 
        { opacity: 0, y: 20, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08, // 80ms delay
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" // ease-out-cubic
        }
      );
    }
  }, [currentQuestion, prefersReducedMotion]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResult) return;
      
      const keyNumber = parseInt(e.key);
      if (keyNumber >= 1 && keyNumber <= 4) {
        const option = quizQuestions[currentQuestion]?.options[keyNumber - 1];
        if (option) {
          handleAnswerSelect(option.id);
          // Update aria-live region
          if (ariaLiveRef.current) {
            ariaLiveRef.current.textContent = `Option ${keyNumber} selected: ${option.text}`;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, showResult]);

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handleNext = async () => {
    if (!selectedAnswer) return;

    const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
    setAnswers(newAnswers);
    setSelectedAnswer('');

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const archetypes: { [key: string]: number } = {};
      Object.values(newAnswers).forEach(answer => {
        const question = quizQuestions[Object.keys(newAnswers).indexOf(answer)];
        const option = question.options.find(opt => opt.id === answer);
        if (option) {
          archetypes[option.archetype] = (archetypes[option.archetype] || 0) + 1;
        }
      });

      const topArchetype = Object.keys(archetypes).reduce((a, b) => 
        archetypes[a] > archetypes[b] ? a : b
      );

      setResult(queenResults[topArchetype]);
      setShowResult(true);

      // Track event (placeholder for Plausible)
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('quiz_finished', {
          props: { result: topArchetype }
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer('');
    setShowResult(false);
    setResult(null);
    setConfettiTriggered(false);
  };

  const handleShareResult = async (result: QuizResult) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quiz Royal - ${result.name}`,
          text: `Je suis ${result.name}! Découvrez votre archétype royal avec le Quiz Royal de Queen de Q.`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `Je suis ${result.name}! Découvrez votre archétype royal avec le Quiz Royal de Queen de Q. ${window.location.href}`;
      navigator.clipboard.writeText(text);
      alert('Résultat copié dans le presse-papiers!');
    }
  };

  // Trigger confetti when result screen mounts
  useEffect(() => {
    if (showResult && !confettiTriggered && !prefersReducedMotion) {
      setConfettiTriggered(true);
      
      setTimeout(async () => {
        try {
          const confettiModule = await loadConfetti();
          const confetti = confettiModule.default;
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#D6AE60', '#D4B5A5', '#3B1E50', '#C8A96B'],
            ticks: 200
          });
        } catch {
          // Silently fail if confetti can't be loaded
        }
      }, 300);
    }
  }, [showResult, confettiTriggered, prefersReducedMotion]);


  if (showResult && result) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[80vh] text-center first:pt-0 last:pb-0"
      >
        <div className={`bg-gradient-to-br ${result.color} rounded-3xl p-12 shadow-royal border border-royal-gold/30 max-w-3xl mx-auto mb-8`}>
          {/* Large Queen archetype illustration */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8"
          >
            <div className="w-48 h-48 mx-auto mb-6 flex items-center justify-center">
              <img 
                src={result.portrait} 
                alt={result.name}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-5xl font-serif font-bold text-royal-purple mb-6"
          >
            Vous êtes {result.name}
          </motion.h1>

          {/* Crown icon with bounce animation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : {
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: "easeOut"
              }}
              className="w-12 h-12 bg-royal-gold/20 rounded-full flex items-center justify-center"
            >
              <StarIcon className="w-6 h-6 text-royal-purple" />
            </motion.div>
          </motion.div>
          
          {/* 3-line description */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <p className="text-royal-purple/90 font-sans text-lg leading-relaxed max-w-2xl mx-auto">
              {result.description}
            </p>
          </motion.div>

          {/* Mirror affirmation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-[#D4B5A5] font-sans text-lg italic">
              "Vous portez en vous la force et la beauté de votre archétype royal."
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => handleShareResult(result)}
              className="bg-gradient-to-r from-royal-gold/20 to-royal-champagne/20 border border-royal-gold/30 rounded-full px-8 py-3 text-royal-purple font-sans font-medium hover:from-royal-gold/30 hover:to-royal-champagne/30 transition-all duration-200"
            >
              Partager mon résultat
            </button>
            <button
              onClick={() => window.location.href = '/cards'}
              className="bg-gradient-to-r from-royal-purple/20 to-cabinet-aubergine/20 border border-royal-purple/30 rounded-full px-8 py-3 text-royal-purple font-sans font-medium hover:from-royal-purple/30 hover:to-cabinet-aubergine/30 transition-all duration-200"
            >
              Explorer vos cartes
            </button>
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-cabinet-aubergine/20 to-royal-purple/20 border border-cabinet-aubergine/30 rounded-full px-8 py-3 text-cabinet-aubergine font-sans font-medium hover:from-cabinet-aubergine/30 hover:to-royal-purple/30 transition-all duration-200"
            >
              Recommencer
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="first:pt-0 last:pb-0"
    >
      {/* Aria-live region for keyboard selections */}
      <div
        ref={ariaLiveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    
      {/* Header */}
      <div className="text-center mb-12 lg:mb-16">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-royal-purple">
            Quiz Royal
          </h1>
          
          {/* Circular Progress Badge */}
          <div className="relative group">
            <div 
              className="w-10 h-10 cursor-help"
              title={`${currentQuestion + 1} / ${quizQuestions.length} completed`}
            >
              <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
                {/* Background circle */}
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-royal-gold/20"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-royal-gold"
                  initial={{ strokeDasharray: "0 100.53" }}
                  animate={{ 
                    strokeDasharray: `${((currentQuestion + 1) / quizQuestions.length) * 100.53} 100.53`
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-royal-purple font-sans font-bold text-xs">
                  {currentQuestion + 1}
                </span>
              </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-royal-velvet text-royal-pearl text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {currentQuestion + 1} / {quizQuestions.length} completed
            </div>
          </div>
        </div>
        <p className="text-cabinet-aubergine/70 font-sans text-lg max-w-2xl mx-auto">
          Découvrez votre archétype royal en 8 questions. Laissez votre intuition vous guider vers votre véritable essence.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="max-w-xl mx-auto mb-12 lg:mb-16">
        <div className="flex items-center justify-between mb-4">
          <span className="text-royal-purple font-sans font-medium">
            Question {currentQuestion + 1} / {quizQuestions.length}
          </span>
          <span className="text-cabinet-aubergine/70 font-sans text-sm">
            {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% complété
          </span>
        </div>
        <div className="w-full bg-royal-champagne/20 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-royal-gold to-royal-champagne h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-[#F5E6E9] to-[#FDF7F2] rounded-2xl p-8 border border-royal-gold/20 mb-8">
            <h2 id="question-title" className="text-2xl font-serif font-bold text-royal-purple text-center mb-8">
              {quizQuestions[currentQuestion].question}
            </h2>

            {/* Options Grid */}
            <div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              role="radiogroup"
              aria-labelledby="question-title"
            >
              {quizQuestions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswer === option.id;
                const iconMap: { [key: string]: string } = {
                  'HeartIcon': '/assets/quiz-icons/heart.svg',
                  'SparklesIcon': '/assets/quiz-icons/sparkles.svg',
                  'SunIcon': '/assets/quiz-icons/sun.svg',
                  'MoonIcon': '/assets/quiz-icons/moon.svg',
                  'FireIcon': '/assets/quiz-icons/fire.svg',
                  'BeakerIcon': '/assets/quiz-icons/beaker.svg',
                  'EyeIcon': '/assets/quiz-icons/eye.svg',
                  'ShieldCheckIcon': '/assets/quiz-icons/shield.svg'
                };
                
                return (
                  <Tilt
                    key={option.id}
                    tiltEnable={!prefersReducedMotion}
                    tiltMaxAngleX={3}
                    tiltMaxAngleY={3}
                    perspective={1000}
                  >
                    <motion.button
                      className={`quiz-option-card relative p-6 rounded-2xl transition-all duration-300 border group ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#F9ECEF] to-[#FDF7F2] border-royal-gold text-royal-purple shadow-inner-soft'
                          : 'bg-gradient-to-br from-[#F5E6E9] to-[#FDF7F2] border-royal-gold/30 text-cabinet-aubergine hover:border-royal-gold/60 hover:bg-gradient-to-br hover:from-[#F9ECEF] hover:to-[#FDF7F2]'
                      } ${!prefersReducedMotion ? 'hover:quiz-option-sparkle' : ''}`}
                      onClick={() => handleAnswerSelect(option.id)}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      role="radio"
                      aria-checked={isSelected}
                      aria-labelledby={`option-${option.id}`}
                    >
                      {/* Keyboard number indicator - Gold tab */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-royal-gold rounded-full flex items-center justify-center shadow-soft">
                        <span className="text-royal-purple font-sans font-bold text-xs">
                          {index + 1}
                        </span>
                      </div>

                      <div className="flex flex-col items-center space-y-4">
                        <div className={`p-4 rounded-full transition-all duration-300 ${
                          isSelected 
                            ? 'bg-royal-gold/20 backdrop-blur-sm' 
                            : 'bg-white/30 backdrop-blur-sm group-hover:bg-royal-gold/10'
                        }`}>
                          <img 
                            src={iconMap[option.icon.name] || '/assets/quiz-icons/heart.svg'} 
                            alt=""
                            className="w-8 h-8"
                          />
                        </div>
                        <span 
                          id={`option-${option.id}`}
                          className={`font-sans font-medium transition-colors text-center leading-tight ${
                            isSelected ? 'text-royal-purple' : 'text-cabinet-aubergine'
                          }`}
                        >
                          {option.text}
                        </span>
                      </div>
                      
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-royal-gold rounded-full flex items-center justify-center shadow-soft"
                        >
                          <div className="w-2 h-2 bg-royal-purple rounded-full"></div>
                        </motion.div>
                      )}
                    </motion.button>
                  </Tilt>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between max-w-xl mx-auto">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-6 py-3 rounded-full border border-royal-gold/30 text-cabinet-aubergine disabled:opacity-50 disabled:cursor-not-allowed hover:bg-royal-gold/10 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-sans">Précédent</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-royal-gold/20 to-royal-champagne/20 border border-royal-gold/30 text-royal-purple font-sans font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-royal-gold/30 hover:to-royal-champagne/30 transition-all duration-200"
            >
              <span>
                {currentQuestion === quizQuestions.length - 1 ? 'Voir résultat' : 'Suivant'}
              </span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizPage;