import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  RectangleStackIcon, 
  ClipboardDocumentListIcon,
  BookOpenIcon, 
  ChatBubbleLeftRightIcon, 
  ShoppingBagIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const quickActions = [
  {
    title: 'Cards Collection',
    description: 'Explorez vos cartes personnalisées',
    icon: RectangleStackIcon,
    path: '/cards',
    color: 'from-imperial-gold/20 to-champagne-pink/20',
    iconColor: 'text-imperial-gold'
  },
  {
    title: 'Quiz Royal',
    description: 'Testez votre essence royale',
    icon: ClipboardDocumentListIcon,
    path: '/quiz',
    color: 'from-royal-purple/20 to-aubergine-violet/20',
    iconColor: 'text-royal-purple'
  },
  {
    title: 'Journal d\'âme',
    description: 'Créez votre journal personnel',
    icon: BookOpenIcon,
    path: '/journal',
    color: 'from-champagne-pink/20 to-powder/20',
    iconColor: 'text-champagne-pink'
  },
  {
    title: 'Afternoon Tea',
    description: 'Rejoignez le salon de thé',
    icon: ChatBubbleLeftRightIcon,
    path: '/chat',
    color: 'from-smokedGold/20 to-vintage/20',
    iconColor: 'text-smokedGold'
  }
];

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-royal-purple/10 to-champagne-pink/10 rounded-2xl p-8 border border-imperial-gold/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-royal-purple mb-2">
              Bienvenue, {user?.firstName} 👑
            </h1>
            <p className="text-aubergine-violet/70 font-raleway text-lg">
              Votre royaume personnel vous attend. Explorez, découvrez, révélez votre essence royale.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <SparklesIcon className="w-8 h-8 text-imperial-gold" />
            <div className="text-right">
              <p className="text-royal-purple font-raleway font-bold text-2xl">7</p>
              <p className="text-aubergine-violet/70 text-sm">spots left</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Link
                to={action.path}
                className={`block p-6 rounded-xl bg-gradient-to-br ${action.color} border border-imperial-gold/30 shadow-soft hover:shadow-royal transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-pearl to-champagne-pink/20 ${action.iconColor} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="w-2 h-2 bg-imperial-gold rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="font-playfair font-bold text-royal-purple text-lg mb-2">
                  {action.title}
                </h3>
                <p className="text-aubergine-violet/70 font-raleway text-sm">
                  {action.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-r from-pearl to-champagne-pink/30 rounded-2xl p-8 border border-imperial-gold/20">
        <h2 className="text-2xl font-playfair font-bold text-royal-purple mb-6">
          Activité Récente
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-imperial-gold/10 to-champagne-pink/10 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-imperial-gold to-champagne-pink rounded-full flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-royal-purple" />
            </div>
            <div>
              <p className="font-raleway font-medium text-royal-purple">
                Bienvenue dans votre royaume !
              </p>
              <p className="text-aubergine-violet/70 text-sm">
                Explorez vos premières cartes pour commencer votre voyage royal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Boutique Preview */}
      <div className="bg-gradient-to-r from-smokedGold/10 to-vintage/10 rounded-2xl p-8 border border-imperial-gold/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-playfair font-bold text-royal-purple mb-2">
              Boutique Royal
            </h2>
            <p className="text-aubergine-violet/70 font-raleway">
              Découvrez notre collection exclusive
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-imperial-gold/20 to-champagne-pink/20 rounded-full px-6 py-3 border border-imperial-gold/30 hover:from-imperial-gold/30 hover:to-champagne-pink/30 transition-all duration-200"
          >
            <ShoppingBagIcon className="w-5 h-5 text-imperial-gold" />
            <span className="text-royal-purple font-raleway font-medium">
              Voir la boutique
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;