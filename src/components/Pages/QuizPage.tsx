import { useState, useEffect } from 'react';
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
  ArrowLeftIcon 
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
    name: 'La Reine Bienveillante',
    portrait: '/assets/images/logo-gold.webp',
    description: 'Votre cœur rayonne de compassion. Vous êtes une source d\'amour et de réconfort pour tous ceux qui vous entourent.',
    color: 'from-royal-champagne to-cabinet-powder'
  },
  'Créative': {
    name: 'L\'Impératrice Créative',
    portrait: '/assets/images/logo-gold.webp',
    description: 'Votre imagination n\'a pas de limites. Vous transformez le monde par votre art et votre créativité.',
    color: 'from-royal-purple to-cabinet-aubergine'
  },
  'Sage': {
    name: 'La Souveraine Sage',
    portrait: '/assets/images/logo-gold.webp',
    description: 'Votre sagesse éclaire le chemin. Vous guidez les autres vers la vérité et la compréhension.',
    color: 'from-ritual-smokedGold to-ritual-vintage'
  },
  'Guerrière': {
    name: 'La Reine Guerrière',
    portrait: '/assets/images/logo-gold.webp',
    description: 'Votre force intérieure est inébranlable. Vous surmontez tous les obstacles avec courage et détermination.',
    color: 'from-ritual-indigo to-royal-purple'
  }
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [result, setResult] = useState<QuizResult | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
    // Staggered icon reveal animation
    if (!prefersReducedMotion) {
      const icons = document.querySelectorAll('.quiz-option-icon');
      gsap.fromTo(icons, 
        { opacity: 0, scale: 0.8, rotateY: 90 },
        { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out"
        }
      );
    }
  }, [currentQuestion, prefersReducedMotion]);

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
      
      // Trigger confetti with lazy loading
      setTimeout(async () => {
        try {
          const confettiModule = await loadConfetti();
          const confetti = confettiModule.default;
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D6AE60', '#D4B5A5', '#3B1E50', '#C8A96B']
          });
        } catch (error) {
          console.log('Confetti could not be loaded:', error);
        }
      }, 500);

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
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResult && result) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[80vh] text-center first:pt-0 last:pb-0"
      >
        <div className={`bg-gradient-to-br ${result.color} rounded-3xl p-12 shadow-royal border border-royal-gold/30 max-w-2xl mx-auto mb-8`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-royal-gold to-royal-champagne rounded-full flex items-center justify-center mx-auto mb-6 shadow-golden">
              <img 
                src={result.portrait} 
                alt={result.name}
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-serif font-bold text-royal-pearl mb-6"
          >
            {result.name}
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-royal-pearl/90 font-sans text-lg leading-relaxed mb-8"
          >
            {result.description}
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-royal-gold/20 to-royal-champagne/20 border border-royal-gold/30 rounded-full px-8 py-3 text-royal-pearl font-sans font-medium hover:from-royal-gold/30 hover:to-royal-champagne/30 transition-all duration-200"
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
      {/* Header */}
      <div className="text-center mb-12 lg:mb-16">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-royal-purple mb-4">
          Quiz Royal
        </h1>
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
          <div className="bg-gradient-to-r from-royal-pearl to-royal-champagne/30 rounded-2xl p-8 border border-royal-gold/20 mb-8">
            <h2 className="text-2xl font-serif font-bold text-royal-purple text-center mb-8">
              {quizQuestions[currentQuestion].question}
            </h2>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {quizQuestions[currentQuestion].options.map((option, index) => {
                const Icon = option.icon;
                const isSelected = selectedAnswer === option.id;
                
                return (
                  <Tilt
                    key={option.id}
                    tiltEnable={!prefersReducedMotion}
                    tiltMaxAngleX={3}
                    tiltMaxAngleY={3}
                    perspective={1000}
                  >
                    <motion.button
                      className={`quiz-option-icon relative p-6 rounded-xl transition-all duration-300 border-2 group ${
                        isSelected
                          ? 'bg-gradient-to-br from-royal-gold/30 to-royal-champagne/30 border-royal-gold text-royal-purple shadow-golden'
                          : 'bg-gradient-to-br from-royal-pearl to-cabinet-parchment border-royal-gold/20 text-cabinet-aubergine hover:border-royal-gold/40 hover:from-royal-gold/10 hover:to-royal-champagne/10'
                      }`}
                      onClick={() => handleAnswerSelect(option.id)}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <div className={`p-4 rounded-full transition-all duration-300 ${
                          isSelected 
                            ? 'bg-gradient-to-br from-royal-gold to-royal-champagne text-royal-purple' 
                            : 'bg-gradient-to-br from-royal-purple/10 to-cabinet-aubergine/10 group-hover:from-royal-gold/20 group-hover:to-royal-champagne/20'
                        }`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className={`font-sans font-medium transition-colors ${
                          isSelected ? 'text-royal-purple' : 'text-cabinet-aubergine'
                        }`}>
                          {option.text}
                        </span>
                      </div>
                      
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-royal-gold rounded-full flex items-center justify-center"
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