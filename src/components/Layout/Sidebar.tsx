import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RectangleStackIcon, 
  ChatBubbleLeftRightIcon, 
  BookOpenIcon, 
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { 
    name: 'Cards', 
    path: '/cards', 
    icon: RectangleStackIcon,
    label: 'Cards / Cartes'
  },
  { 
    name: 'Quiz', 
    path: '/quiz', 
    icon: ClipboardDocumentListIcon,
    label: 'Quiz'
  },
  { 
    name: 'Journal', 
    path: '/journal', 
    icon: BookOpenIcon,
    label: 'Journal d\'âme'
  },
  { 
    name: 'Chat', 
    path: '/chat', 
    icon: ChatBubbleLeftRightIcon,
    label: 'Chat / Afternoon Tea'
  },
  { 
    name: 'Shop', 
    path: '/shop', 
    icon: ShoppingBagIcon,
    label: 'Shop / Boutique'
  }
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:static inset-y-0 left-0 z-30 w-70 bg-gradient-to-b from-royal-purple to-aubergine-violet shadow-royal lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-imperial-gold/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-imperial-gold to-champagne-pink rounded-full flex items-center justify-center">
                  <span className="text-royal-purple font-playfair font-bold text-xl">Q</span>
                </div>
                <div>
                  <h1 className="text-pearl font-playfair text-xl font-bold">Queen de Q</h1>
                  <p className="text-champagne-pink text-sm">Dashboard</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden text-pearl hover:text-champagne-pink transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-imperial-gold/20 to-champagne-pink/20 text-imperial-gold border-l-4 border-imperial-gold' 
                      : 'text-pearl hover:bg-imperial-gold/10 hover:text-champagne-pink'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-imperial-gold' : 'text-pearl'
                  }`} />
                  <span className="font-raleway font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-imperial-gold/20">
            <div className="bg-gradient-to-r from-imperial-gold/10 to-champagne-pink/10 rounded-lg p-4">
              <p className="text-champagne-pink text-sm font-raleway">
                "Révélez votre reine intérieure"
              </p>
              <p className="text-pearl/60 text-xs mt-1">
                © 2024 Queen de Q
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;