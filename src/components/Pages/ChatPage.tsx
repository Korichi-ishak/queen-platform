import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const ChatPage = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
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
  }, []);

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 text-aubergine-violet/70">
      <span className="text-sm font-raleway">Grand-mère tape...</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-imperial-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-imperial-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-imperial-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-sm">
        {/* Chat Dialog */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[540px] bg-gradient-to-br from-pearl to-champagne-pink/30 rounded-2xl shadow-royal border border-imperial-gold/20 overflow-hidden"
          style={{ width: '360px' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-royal-purple to-aubergine-violet p-4 text-center">
            <h2 className="text-pearl font-playfair font-bold text-lg">
              Salon de Thé Royal
            </h2>
            <p className="text-champagne-pink text-sm font-raleway">
              Afternoon Tea with Grand-mère
            </p>
          </div>

          {/* Chat Area */}
          <div className="h-[400px] p-4 overflow-y-auto">
            {/* Grand-mère Avatar */}
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-imperial-gold to-champagne-pink rounded-full flex items-center justify-center text-2xl shadow-golden">
                👵🏻
              </div>
              <div>
                <p className="text-royal-purple font-raleway font-medium text-sm">Grand-mère</p>
                <p className="text-aubergine-violet/70 text-xs">En ligne</p>
              </div>
            </div>

            {/* Porcelain Pattern Decoration */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-imperial-gold/30 to-transparent mb-4"></div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-imperial-gold/20 to-champagne-pink/20 rounded-full flex items-center justify-center border-2 border-imperial-gold/30">
                <div className="w-8 h-8 bg-gradient-to-br from-imperial-gold/40 to-champagne-pink/40 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-imperial-gold rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-imperial-gold/30 to-transparent mb-6"></div>

            {/* Message Area */}
            <div className="space-y-4">
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-imperial-gold to-champagne-pink rounded-full flex items-center justify-center text-sm">
                    👵🏻
                  </div>
                  <div className="bg-gradient-to-r from-imperial-gold/10 to-champagne-pink/10 rounded-lg p-3 max-w-xs">
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
                  <div className="w-8 h-8 bg-gradient-to-br from-imperial-gold to-champagne-pink rounded-full flex items-center justify-center text-sm">
                    👵🏻
                  </div>
                  <div className="bg-gradient-to-r from-imperial-gold/10 to-champagne-pink/10 rounded-lg p-4 max-w-xs border border-imperial-gold/20">
                    <p className="text-royal-purple font-raleway text-sm leading-relaxed">
                      <span className="font-semibold">Bientôt disponible</span> ✨
                    </p>
                    <p className="text-aubergine-violet/70 font-raleway text-xs mt-2">
                      <span className="font-semibold">Coming Soon</span> - Notre salon de thé ouvre ses portes très prochainement !
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-imperial-gold/20 bg-gradient-to-r from-pearl to-champagne-pink/20">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Tapez votre message..."
                  disabled
                  className="w-full px-4 py-3 bg-gradient-to-r from-imperial-gold/5 to-champagne-pink/5 border border-imperial-gold/30 rounded-lg font-raleway text-sm text-aubergine-violet placeholder-aubergine-violet/50 cursor-not-allowed opacity-60"
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                />
                
                {/* Tooltip */}
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-royal-purple text-pearl px-3 py-2 rounded-lg text-xs font-raleway whitespace-nowrap shadow-royal"
                  >
                    Soon / Bientôt disponible
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-royal-purple"></div>
                  </motion.div>
                )}
              </div>
              
              <button
                disabled
                className="p-3 bg-gradient-to-r from-imperial-gold/20 to-champagne-pink/20 rounded-lg border border-imperial-gold/30 cursor-not-allowed opacity-60"
              >
                <PaperAirplaneIcon className="w-5 h-5 text-imperial-gold" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 bg-gradient-to-r from-smokedGold/10 to-vintage/10 rounded-lg p-4 border border-imperial-gold/20"
        >
          <div className="flex items-start space-x-3">
            <InformationCircleIcon className="w-6 h-6 text-imperial-gold flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-playfair font-bold text-royal-purple text-sm mb-1">
                Accessibility Notes
              </h3>
              <ul className="text-aubergine-violet/70 font-raleway text-xs space-y-1">
                <li>• Focus management ready</li>
                <li>• Screen reader compatible</li>
                <li>• Keyboard navigation support</li>
                <li>• High contrast mode available</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatPage;