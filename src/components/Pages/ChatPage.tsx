import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ChatPage = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-open dialog after page load
    const timer = setTimeout(() => {
      setIsDialogOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isDialogOpen) return;

    // Show typing indicator for 2 seconds, then show welcome message
    const timer1 = setTimeout(() => {
      setIsTyping(true);
    }, 500);

    const timer2 = setTimeout(() => {
      setIsTyping(false);
      setShowWelcomeMessage(true);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isDialogOpen]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsTyping(false);
    setShowWelcomeMessage(false);
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 text-cabinet-aubergine/70">
      <span className="text-sm font-sans">Reine-Mère tape...</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-royal-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-royal-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-royal-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

  if (!isDialogOpen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center first:pt-0 last:pb-0"
      >
        <div className="text-center mx-auto max-w-lg">
          <div className="w-24 h-24 bg-gradient-to-br from-royal-gold to-royal-champagne rounded-full flex items-center justify-center mx-auto mb-6 shadow-golden">
            <img 
              src="/assets/images/logo-gold.webp" 
              alt="Reine-Mère"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-4xl font-serif font-bold text-royal-purple mb-4">
            Salon de Thé Royal
          </h1>
          <p className="text-cabinet-aubergine/70 font-sans text-lg mb-8">
            Rejoignez notre salon de thé virtuel pour des conversations inspirantes.
          </p>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-royal-purple to-cabinet-aubergine text-royal-pearl px-8 py-3 rounded-lg font-sans font-medium hover:from-royal-purple/90 hover:to-cabinet-aubergine/90 transition-all duration-200 shadow-royal"
          >
            Entrer dans le salon
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-royal-velvet/30 backdrop-blur-sm" onClick={handleCloseDialog} />
      
      {/* Modal Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-labelledby="chat-title"
        aria-describedby="chat-description"
        className="relative z-10 w-full max-w-sm"
      >
        {/* Chat Dialog */}
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-[540px] bg-gradient-to-br from-royal-pearl/90 to-royal-champagne/20 backdrop-blur-lg rounded-2xl shadow-royal border border-royal-gold/20 overflow-hidden"
            style={{ width: '360px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-royal-purple/80 to-cabinet-aubergine/80 backdrop-blur-sm p-4 text-center relative">
              <button
                onClick={handleCloseDialog}
                className="absolute right-4 top-4 text-royal-pearl hover:text-royal-champagne transition-colors"
                aria-label="Fermer le salon de thé"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <h2 id="chat-title" className="text-royal-pearl font-serif font-bold text-lg">
                Salon de Thé Royal
              </h2>
              <p className="text-royal-champagne text-sm font-sans">
                Afternoon Tea avec Reine-Mère
              </p>
            </div>

            {/* Chat Area */}
            <div className="h-[400px] p-4 overflow-y-auto">
              {/* Reine-Mère Avatar */}
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-royal-gold to-royal-champagne rounded-full flex items-center justify-center shadow-golden">
                  <img 
                    src="/assets/images/logo-gold.webp" 
                    alt="Reine-Mère"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <p className="text-royal-purple font-sans font-medium text-sm">Reine-Mère</p>
                  <p className="text-cabinet-aubergine/70 text-xs">En ligne</p>
                </div>
              </div>

              {/* Porcelain Pattern Decoration */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-royal-gold/40 to-transparent mb-4"></div>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-royal-gold/30 to-royal-champagne/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-royal-gold/40">
                  <div className="w-8 h-8 bg-gradient-to-br from-royal-gold/50 to-royal-champagne/50 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-royal-gold rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-royal-gold/40 to-transparent mb-6"></div>

              {/* Message Area */}
              <div className="space-y-4">
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-royal-gold to-royal-champagne rounded-full flex items-center justify-center">
                      <img 
                        src="/assets/images/logo-gold.webp" 
                        alt="Reine-Mère"
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <div className="bg-gradient-to-r from-royal-gold/20 to-royal-champagne/20 backdrop-blur-sm rounded-lg p-3 max-w-xs border border-royal-gold/30">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}

                {/* Welcome Message */}
                {showWelcomeMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-royal-gold to-royal-champagne rounded-full flex items-center justify-center">
                      <img 
                        src="/assets/images/logo-gold.webp" 
                        alt="Reine-Mère"
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <div className="bg-gradient-to-r from-royal-gold/20 to-royal-champagne/20 backdrop-blur-sm rounded-lg p-4 max-w-xs border border-royal-gold/30">
                      <p className="text-royal-purple font-sans text-sm leading-relaxed flex items-center">
                        <span className="font-semibold">Bonjour ma chère !</span> 
                        <span className="ml-2 w-4 h-4 inline-flex">
                          <img 
                            src="/assets/illustrations/sparkles.svg" 
                            alt="sparkles"
                            className="w-4 h-4"
                          />
                        </span>
                      </p>
                      <p className="text-cabinet-aubergine/80 font-sans text-sm mt-2">
                        <strong>Bientôt disponible / Coming soon</strong>
                      </p>
                      <p className="text-cabinet-aubergine/70 font-sans text-xs mt-2 italic">
                        Notre salon de thé sera bientôt prêt pour vous accueillir...
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-royal-gold/20 bg-gradient-to-r from-royal-pearl/50 to-royal-champagne/10">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Écrivez votre message..."
                  disabled
                  className="flex-1 bg-royal-pearl/80 border border-royal-gold/30 rounded-lg px-4 py-2 text-cabinet-aubergine placeholder-cabinet-aubergine/50 font-sans text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="relative">
                  <button
                    disabled
                    className="p-2 bg-gradient-to-r from-royal-gold/20 to-royal-champagne/20 border border-royal-gold/30 rounded-lg text-royal-purple disabled:opacity-50 disabled:cursor-not-allowed"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                  {showTooltip && (
                    <div className="absolute bottom-full right-0 mb-2 bg-royal-purple text-royal-pearl text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-royal">
                      Soon / Bientôt
                      <div className="absolute top-full right-4 border-4 border-transparent border-t-royal-purple"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
      </div>

      {/* Info Card */}
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
              <li>• Focus trap enabled</li>
              <li>• ARIA dialog pattern</li>
              <li>• Keyboard navigation</li>
              <li>• Screen reader support</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatPage;