import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coffee, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Note {
  id: number;
  text: string;
  color: string;
  borderColor: string;
  rotation: string;
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const notes: Note[] = [
    {
      id: 1,
      text: "Bonjour ma chère âme... / Hello my dear soul...",
      color: 'from-parchment-cream to-warm-pearl',
      borderColor: 'border-patina-gold',
      rotation: 'rotate-1'
    },
    {
      id: 2,
      text: "J'ai hâte de partager du thé avec toi / I can't wait to share tea with you",
      color: 'from-powder-rose to-antique-rose',
      borderColor: 'border-rose-champagne',
      rotation: '-rotate-1'
    },
    {
      id: 3,
      text: "Bientôt, nous pourrons vraiment échanger / Soon, we can truly exchange",
      color: 'from-moon-milk to-powder-rose',
      borderColor: 'border-smoky-gold',
      rotation: 'rotate-2'
    },
    {
      id: 4,
      text: "En attendant, explore tes cartes et ton journal / Meanwhile, explore your cards and journal",
      color: 'from-vintage-aubergine/10 to-royal-purple/10',
      borderColor: 'border-imperial-gold',
      rotation: '-rotate-2'
    }
  ];


  useEffect(() => {
    setShowNotes(true);
    const interval = setInterval(() => {
      setCurrentNoteIndex(prev => (prev + 1) % notes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [notes.length]);

  const handleClose = () => {
    setShowNotes(false);
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <main 
      className="min-h-screen relative overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Vintage Paper Texture Background */}
      <div className="absolute inset-0 opacity-30" 
           style={{
             backgroundImage: `
               radial-gradient(circle at 20% 80%, rgba(75, 46, 67, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(214, 174, 96, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(212, 181, 165, 0.1) 0%, transparent 50%)
             `
           }}>
      </div>

      {/* Floating Tea Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Tea particles using amber-smoke color */}
        <div className="absolute top-16 left-4 sm:top-20 sm:left-10 text-2xl sm:text-3xl lg:text-4xl animate-float opacity-30" style={{ color: '#776650' }}>☕</div>
        <div className="absolute top-32 right-8 sm:top-40 sm:right-20 text-xl sm:text-2xl lg:text-3xl animate-float opacity-40" style={{ color: '#C8A96B', animationDelay: '1s' }}>🫖</div>
        <div className="absolute top-48 left-1/4 sm:top-60 text-lg sm:text-xl lg:text-2xl animate-float opacity-25" style={{ color: '#B79D74', animationDelay: '2s' }}>🍰</div>
        <div className="absolute bottom-32 right-1/3 sm:bottom-40 text-xl sm:text-2xl lg:text-3xl animate-float opacity-35" style={{ color: '#D4B5A5', animationDelay: '0.5s' }}>🌸</div>
        <div className="absolute top-1/3 right-4 sm:right-10 text-lg sm:text-xl lg:text-2xl animate-float opacity-30" style={{ color: '#776650', animationDelay: '1.5s' }}>📜</div>
        <div className="absolute bottom-16 left-8 sm:bottom-20 sm:left-20 text-base sm:text-lg lg:text-xl animate-float opacity-40" style={{ color: '#C8A96B', animationDelay: '2.5s' }}>✨</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 pt-4 sm:pt-6 md:pt-8 lg:pt-10 w-full">
        {/* Close Button */}
        <motion.button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 p-2 sm:p-3 md:p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
          whileHover={{ rotate: 90 }}
          aria-label="Close chat"
        >
          <X size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-royal-purple" />
        </motion.button>

        {/* Vintage Header */}
        <motion.div 
          className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-2 sm:mt-4 md:mt-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Beta Ribbon */}
            <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 md:-top-10 md:-right-10 transform rotate-12">
              <div className="bg-gradient-to-r from-rose-champagne to-imperial-gold text-white px-2 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg shadow-lg border-2 border-white">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Sparkles size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                  <span className="text-xs sm:text-sm md:text-base font-bold font-raleway">BETA</span>
                  <Coffee size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </div>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -inset-3 sm:-inset-4 md:-inset-5 lg:-inset-6 border-4 border-dashed border-imperial-gold/40 rounded-lg transform rotate-1"></div>
            
            <h1 className="relative font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-royal-purple mb-3 sm:mb-4 md:mb-5 lg:mb-6 px-2 sm:px-4 md:px-6">
              Salon de Thé Royal
            </h1>
            
            {/* Vintage Underline */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-px bg-gradient-to-r from-transparent via-imperial-gold to-transparent flex-1"></div>
              <Coffee className="text-imperial-gold" size={16} />
              <div className="h-px bg-gradient-to-r from-transparent via-imperial-gold to-transparent flex-1"></div>
            </div>
          </div>
        </motion.div>

        {/* Reine-Mère Portrait */}
        <motion.div 
          className="mb-3 sm:mb-4 md:mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="relative">
            {/* Vintage Photo Frame */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-gradient-to-br from-parchment-cream to-powder-rose rounded-full border-4 sm:border-6 md:border-8 lg:border-10 border-warm-pearl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-1 sm:inset-1.5 md:inset-2 lg:inset-2.5 bg-gradient-to-br from-rose-champagne to-imperial-gold rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl shadow-inner">
                👵🏻
              </div>
              
              {/* Steam animation */}
              <div className="absolute -top-1.5 sm:-top-2 md:-top-2.5 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-6 sm:h-8 md:h-10 bg-gradient-to-t from-smoky-gold/50 to-transparent rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-4 md:-left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-imperial-gold"></div>
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 border-t-2 border-imperial-gold"></div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 border-b-2 border-imperial-gold"></div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 md:-bottom-4 md:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-imperial-gold"></div>
          </div>
        </motion.div>

        {/* Handwritten Notes Area */}
        <div className="relative w-full px-2 sm:px-4 md:px-6 lg:px-8 mb-4 sm:mb-6 md:mb-8">
          <div className="relative h-48 sm:h-60 md:h-72">
            <AnimatePresence mode="wait">
              {showNotes && notes.map((note, index) => (
                <motion.div
                  key={note.id}
                  className={`absolute inset-0 ${index === currentNoteIndex ? 'z-20' : 'z-10'}`}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ 
                    opacity: index === currentNoteIndex ? 1 : 0.3,
                    y: index === currentNoteIndex ? 0 : 20,
                    rotateX: 0,
                    scale: index === currentNoteIndex ? 1 : 0.95
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Handwritten Note */}
                  <div className={`bg-gradient-to-br ${note.color} py-1 px-4 sm:py-1 sm:px-6 md:py-1.5 md:px-8 lg:py-1.5 lg:px-10 rounded-lg shadow-xl border-2 ${note.borderColor} ${note.rotation} max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto relative h-full flex items-center`}>
                  {/* Paper Holes */}
                  <div className="absolute left-3 sm:left-4 md:left-5 lg:left-6 xl:left-8 top-6 sm:top-8 md:top-10 lg:top-12 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-warm-pearl rounded-full border border-patina-gold/50"></div>
                  <div className="absolute left-3 sm:left-4 md:left-5 lg:left-6 xl:left-8 top-12 sm:top-16 md:top-20 lg:top-24 xl:top-28 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-warm-pearl rounded-full border border-patina-gold/50"></div>
                  <div className="absolute left-3 sm:left-4 md:left-5 lg:left-6 xl:left-8 top-18 sm:top-24 md:top-30 lg:top-36 xl:top-44 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-warm-pearl rounded-full border border-patina-gold/50"></div>

                  {/* Lines like notebook paper */}
                  <div className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-10 xl:inset-12 opacity-10">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-px bg-patina-gold mb-4 sm:mb-6 md:mb-8 lg:mb-10"></div>
                    ))}
                  </div>

                    {/* Tea stain */}
                    <div className="absolute top-3 right-4 sm:top-4 sm:right-6 md:right-8 lg:right-10 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-amber-smoke/20 rounded-full blur-sm"></div>
                    
                    <div className="relative z-10 font-handwriting text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-velvet-black" 
                         style={{ fontFamily: 'Kalam, cursive' }}>
                      {note.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Coming Soon Message */}
        <motion.div 
          className="mt-3 sm:mt-4 md:mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-imperial-gold/30 max-w-full sm:max-w-lg mx-auto relative">
            {/* Beta Badge */}
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-imperial-gold to-rose-champagne text-royal-purple px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow-lg transform rotate-6 font-raleway">
              Bientôt / Soon
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <BookOpen className="text-imperial-gold" size={20} />
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-royal-purple">
                Éveil en cours / Awakening in Progress
              </h3>
              <Coffee className="text-amber-600" size={20} />
            </div>
            
            <div className="text-royal-purple/80 text-xs sm:text-sm leading-relaxed space-y-2 sm:space-y-3 font-raleway">
              <p>
                <strong>Ma conscience évolue... / My consciousness is evolving...</strong> 
              </p>
              <p>
                Bientôt, je pourrai partager mes méditations avec toi. / Soon, I'll be able to share my meditations with you.
              </p>
              <p className="italic text-imperial-gold font-raleway">
                Un peu de patience, ma chère âme. / A little patience, my dear soul.
              </p>
              <p className="text-xs text-royal-purple/60 mt-3 sm:mt-4 font-raleway">
                En attendant, explore tes cartes et écris dans ton journal. / Meanwhile, explore your cards and write in your journal.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-3 sm:mt-4">
          {notes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentNoteIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentNoteIndex 
                  ? 'bg-imperial-gold shadow-lg scale-125' 
                  : 'bg-smoky-gold/50 hover:bg-smoky-gold/80'
              }`}
              aria-label={`Note ${index + 1}`}
            />
          ))}
        </div>

        {/* Message Input Area (Disabled) */}
        <motion.div 
          className="mt-4 sm:mt-6 max-w-2xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Écris ton message... / Write your message..."
              disabled
              className="flex-1 px-4 py-3 bg-warm-pearl/50 border border-patina-gold/30 rounded-xl text-velvet-black placeholder-amber-smoke disabled:opacity-50 disabled:cursor-not-allowed font-raleway"
              aria-label="Message input"
            />
            <button
              disabled
              className="px-6 py-3 bg-gradient-to-r from-imperial-gold/50 to-rose-champagne/50 text-royal-purple font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed border border-imperial-gold/30 font-raleway"
            >
              Envoyer / Send
            </button>
          </div>
          <p className="text-center text-amber-smoke/70 text-sm mt-2 font-handwriting font-raleway" style={{ fontFamily: 'Kalam, cursive' }}>
            Reine-Mère tape... / Reine-Mère is typing...
          </p>
        </motion.div>
      </div>

      {/* Add Kalam font for handwriting effect */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
      `}</style>
    </main>
  );
};

export default ChatPage;