import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
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
    portrait: '💖',
    description: 'Votre cœur rayonne de compassion. Vous êtes une source d\'amour et de réconfort pour tous ceux qui vous entourent.',
    color: 'from-champagne-pink to-powder'
  },
  'Créative': {
    name: 'L\'Impératrice Créative',
    portrait: '🎨',
    description: 'Votre imagination n\'a pas de limites. Vous transformez le monde par votre art et votre créativité.',
    color: 'from-royal-purple to-aubergine-violet'
  },
  'Sage': {
    name: 'La Souveraine Sage',
    portrait: '🔮',
    description: 'Votre sagesse éclaire le chemin. Vous guidez les autres vers la vérité et la compréhension.',
    color: 'from-smokedGold to-vintage'
  },
  'Guerrière': {
    name: 'La Reine Guerrière',
    portrait: '⚔️',
    description: 'Votre force intérieure est inébranlable. Vous surmontez tous les obstacles avec courage et détermination.',
    color: 'from-indigo to-royal-purple'
  }
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handleNext = () => {
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
      
      // Trigger confetti
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D6AE60', '#D4B5A5', '#3B1E50', '#C8A96B']
        });
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-8xl mb-6">{result.portrait}</div>
            <h1 className="text-4xl font-playfair font-bold text-royal-purple mb-4">
              {result.name}
            </h1>
            <p className="text-aubergine-violet/70 font-raleway text-lg leading-relaxed max-w-xl mx-auto">
              {result.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`bg-gradient-to-br ${result.color} rounded-2xl p-8 shadow-royal border border-imperial-gold/20 mb-8`}
          >
            <h2 className="text-2xl font-playfair font-bold text-pearl mb-4">
              Votre Essence Royale
            </h2>
            <div className="grid grid-cols-2 gap-6 text-pearl/90">
              <div>
                <h3 className="font-raleway font-bold mb-2">Vos Forces</h3>
                <ul className="text-sm space-y-1">
                  <li>• Leadership naturel</li>
                  <li>• Intuition développée</li>
                  <li>• Capacité d'inspiration</li>
                </ul>
              </div>
              <div>
                <h3 className="font-raleway font-bold mb-2">Votre Mission</h3>
                <p className="text-sm">
                  Révéler votre plein potentiel et inspirer les autres à faire de même.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-royal-purple to-aubergine-violet text-pearl px-6 py-3 rounded-lg font-raleway font-medium hover:from-royal-purple/90 hover:to-aubergine-violet/90 transition-all duration-200 shadow-royal"
            >
              Recommencer le Quiz
            </button>
            <button
              onClick={() => window.location.href = '/cards'}
              className="bg-gradient-to-r from-imperial-gold to-champagne-pink text-royal-purple px-6 py-3 rounded-lg font-raleway font-medium hover:from-imperial-gold/90 hover:to-champagne-pink/90 transition-all duration-200 shadow-golden"
            >
              Voir mes Cartes
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-royal-purple font-raleway font-medium">
              Question {currentQuestion + 1} / {quizQuestions.length}
            </span>
            <span className="text-aubergine-violet/70 font-raleway text-sm">
              {Math.round(progress)}% complété
            </span>
          </div>
          <div className="w-full bg-champagne-pink/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-imperial-gold to-champagne-pink h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-playfair font-bold text-royal-purple mb-6">
              {quizQuestions[currentQuestion].question}
            </h2>
            
            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {quizQuestions[currentQuestion].options.map((option, index) => {
                const Icon = option.icon;
                const isSelected = selectedAnswer === option.id;
                
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.12 }}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-imperial-gold bg-gradient-to-r from-imperial-gold/20 to-champagne-pink/20 shadow-golden'
                        : 'border-imperial-gold/20 hover:border-imperial-gold/40 hover:bg-gradient-to-r hover:from-imperial-gold/10 hover:to-champagne-pink/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        isSelected 
                          ? 'bg-imperial-gold text-royal-purple' 
                          : 'bg-gradient-to-r from-imperial-gold/20 to-champagne-pink/20 text-imperial-gold'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`font-raleway font-medium ${
                        isSelected ? 'text-royal-purple' : 'text-aubergine-violet'
                      }`}>
                        {option.text}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-4 py-2 text-aubergine-violet hover:text-royal-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-raleway">Précédent</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="flex items-center space-x-2 bg-gradient-to-r from-royal-purple to-aubergine-violet text-pearl px-6 py-3 rounded-lg font-raleway font-medium hover:from-royal-purple/90 hover:to-aubergine-violet/90 transition-all duration-200 shadow-royal disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{currentQuestion === quizQuestions.length - 1 ? 'Voir le résultat' : 'Suivant'}</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizPage;