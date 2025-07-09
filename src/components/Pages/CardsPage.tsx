import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { XMarkIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(Flip);

interface Card {
  id: string;
  name: string;
  punchline: string;
  mirrorQuestion: string;
  image: string;
  color: string;
  height: number;
}

const demoCards: Card[] = [
  {
    id: '1',
    name: 'La Reine Visionnaire',
    punchline: 'Votre intuition guide vos pas vers l\'avenir',
    mirrorQuestion: 'Quelle vision de votre futur vous inspire le plus ?',
    image: '👑',
    color: 'from-imperial-gold to-champagne-pink',
    height: 280
  },
  {
    id: '2',
    name: 'L\'Impératrice Créative',
    punchline: 'Vos mains créent la beauté que votre âme ressent',
    mirrorQuestion: 'Quelle création révèle le mieux votre essence ?',
    image: '🎨',
    color: 'from-royal-purple to-aubergine-violet',
    height: 320
  },
  {
    id: '3',
    name: 'La Souveraine Sage',
    punchline: 'Votre sagesse éclaire le chemin des autres',
    mirrorQuestion: 'Quelle leçon de vie aimeriez-vous partager ?',
    image: '🔮',
    color: 'from-smokedGold to-vintage',
    height: 260
  },
  {
    id: '4',
    name: 'La Majesté Bienveillante',
    punchline: 'Votre cœur ouvert accueille toutes les âmes',
    mirrorQuestion: 'Comment votre compassion transforme-t-elle le monde ?',
    image: '💖',
    color: 'from-champagne-pink to-powder',
    height: 340
  },
  {
    id: '5',
    name: 'La Reine Guerrière',
    punchline: 'Votre force intérieure surmonte tous les défis',
    mirrorQuestion: 'Quelle bataille intérieure avez-vous gagnée ?',
    image: '⚔️',
    color: 'from-indigo to-royal-purple',
    height: 300
  },
  {
    id: '6',
    name: 'L\'Enchanteresse Mystique',
    punchline: 'Votre magie réside dans votre authenticité',
    mirrorQuestion: 'Quel est votre pouvoir secret le plus précieux ?',
    image: '✨',
    color: 'from-vintage to-smokedGold',
    height: 290
  },
  {
    id: '7',
    name: 'La Déesse Lunaire',
    punchline: 'Vos cycles reflètent la sagesse ancestrale',
    mirrorQuestion: 'Comment honorez-vous votre féminité sacrée ?',
    image: '🌙',
    color: 'from-powder to-champagne-pink',
    height: 310
  },
  {
    id: '8',
    name: 'La Reine Solaire',
    punchline: 'Votre lumière réchauffe tous les cœurs',
    mirrorQuestion: 'Comment votre joie illumine-t-elle votre entourage ?',
    image: '☀️',
    color: 'from-imperial-gold to-royal-gold',
    height: 270
  }
];

const CardsPage = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (card: Card) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const cardElement = cardRefs.current[card.id];
    
    if (cardElement) {
      const state = Flip.getState(cardElement);
      setSelectedCard(card);
      
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        scale: true,
        onComplete: () => setIsAnimating(false)
      });
    }
  };

  const handleCloseCard = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const cardElement = cardRefs.current[selectedCard?.id || ''];
    
    if (cardElement) {
      const state = Flip.getState(cardElement);
      setSelectedCard(null);
      
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        scale: true,
        onComplete: () => setIsAnimating(false)
      });
    }
  };

  useEffect(() => {
    // Animate cards on mount
    const cards = Object.values(cardRefs.current).filter(Boolean);
    gsap.fromTo(cards, 
      { opacity: 0, y: 50, rotateX: 15 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  }, []);

  if (selectedCard) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          ref={(el) => {
            if (el) cardRefs.current[selectedCard.id] = el;
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-pearl rounded-2xl p-8 max-w-md w-full shadow-royal border border-imperial-gold/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="text-4xl">{selectedCard.image}</div>
            <button
              onClick={handleCloseCard}
              className="p-2 hover:bg-royal-purple/10 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-royal-purple" />
            </button>
          </div>
          
          <h2 className="text-2xl font-playfair font-bold text-royal-purple mb-4">
            {selectedCard.name}
          </h2>
          
          <p className="text-aubergine-violet font-raleway mb-6 text-lg">
            {selectedCard.punchline}
          </p>
          
          <div className="bg-gradient-to-r from-imperial-gold/10 to-champagne-pink/10 rounded-lg p-4">
            <h3 className="font-playfair font-bold text-royal-purple mb-2">
              Question Miroir
            </h3>
            <p className="text-aubergine-violet/80 font-raleway italic">
              {selectedCard.mirrorQuestion}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-playfair font-bold text-royal-purple mb-4">
          Collection Royale
        </h1>
        <p className="text-aubergine-violet/70 font-raleway text-lg max-w-2xl mx-auto">
          Découvrez vos archétypes royaux. Chaque carte révèle une facette de votre essence et vous invite à la contemplation.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-6 space-y-6">
        {demoCards.map((card) => (
          <motion.div
            key={card.id}
            ref={(el) => {
              if (el) cardRefs.current[card.id] = el;
            }}
            className="break-inside-avoid mb-6 cursor-pointer group"
            style={{ height: `${card.height}px` }}
            whileHover={{ 
              rotateX: 6,
              rotateY: 3,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            onClick={() => handleCardClick(card)}
          >
            <div className={`h-full bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-royal border border-imperial-gold/20 hover:shadow-golden transition-all duration-300 group-hover:border-imperial-gold/40`}>
              <div className="flex flex-col h-full">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {card.image}
                </div>
                <h3 className="font-playfair font-bold text-pearl text-lg mb-3 group-hover:text-pearl/90 transition-colors">
                  {card.name}
                </h3>
                <p className="text-pearl/80 font-raleway text-sm leading-relaxed flex-1 group-hover:text-pearl/70 transition-colors">
                  {card.punchline}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="w-2 h-2 bg-pearl/60 rounded-full group-hover:bg-pearl transition-colors"></div>
                  <div className="text-pearl/60 text-xs font-raleway group-hover:text-pearl/80 transition-colors">
                    Cliquez pour explorer
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-imperial-gold/20 to-champagne-pink/20 rounded-full px-6 py-3 border border-imperial-gold/30">
          <div className="w-3 h-3 bg-imperial-gold rounded-full animate-pulse"></div>
          <span className="text-royal-purple font-raleway font-medium">
            Plus de cartes à venir...
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CardsPage;