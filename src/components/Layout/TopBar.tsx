import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bars3Icon, 
  MusicalNoteIcon, 
  SpeakerXMarkIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

interface TopBarProps {
  onMenuClick: () => void;
}

interface SpotsData {
  available: number;
  total: number;
  nextEvent: string;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const { user, logout } = useAuth();
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [spotsData] = useState<SpotsData>({
    available: 7,
    total: 20,
    nextEvent: "Tea Time — 13 juillet 19h GMT+1"
  });

  // Auto-mute if user prefers reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setMusicEnabled(false);
    }
  }, []);

  const handleMusicToggle = () => {
    setMusicEnabled(!musicEnabled);
    // In a real app, this would control actual audio playback
    console.log(musicEnabled ? 'Music paused' : 'Music playing');
  };

  return (
    <header className="bg-gradient-to-r from-pearl to-champagne-pink/30 shadow-soft border-b border-imperial-gold/20">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Menu & Welcome */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-imperial-gold/10 transition-colors"
            >
              <Bars3Icon className="w-6 h-6 text-royal-purple" />
            </button>
            
            <div className="hidden sm:block">
              <h2 className="text-royal-purple font-playfair text-2xl font-bold">
                Bonjour, {user?.firstName} 👑
              </h2>
              <p className="text-aubergine-violet/70 text-sm font-raleway">
                Bienvenue dans votre royaume personnel
              </p>
            </div>
          </div>

          {/* Right side - Widgets */}
          <div className="flex items-center space-x-4">
            {/* Spots Left Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-imperial-gold/20 to-champagne-pink/20 rounded-full px-4 py-2 border border-imperial-gold/30"
            >
              <SparklesIcon className="w-4 h-4 text-imperial-gold" />
              <span className="text-royal-purple font-raleway font-medium text-sm">
                {spotsData.available} spots left
              </span>
            </motion.div>

            {/* Music Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMusicToggle}
              className={`p-3 rounded-full transition-all duration-200 ${
                musicEnabled 
                  ? 'bg-gradient-to-r from-imperial-gold/20 to-champagne-pink/20 text-imperial-gold border border-imperial-gold/30' 
                  : 'bg-royal-purple/10 text-royal-purple hover:bg-royal-purple/20'
              }`}
              title={musicEnabled ? 'Pause music' : 'Play music'}
            >
              {musicEnabled ? (
                <MusicalNoteIcon className="w-5 h-5" />
              ) : (
                <SpeakerXMarkIcon className="w-5 h-5" />
              )}
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-gradient-to-r from-royal-purple/10 to-aubergine-violet/10 rounded-full px-4 py-2 hover:from-royal-purple/20 hover:to-aubergine-violet/20 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-imperial-gold to-champagne-pink rounded-full flex items-center justify-center">
                  <span className="text-royal-purple font-playfair font-bold text-sm">
                    {user?.firstName?.charAt(0)}
                  </span>
                </div>
                <span className="hidden sm:block text-royal-purple font-raleway font-medium text-sm">
                  {user?.firstName}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;