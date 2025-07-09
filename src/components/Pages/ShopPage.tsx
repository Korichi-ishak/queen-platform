import { motion } from 'framer-motion';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const ShopPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-imperial-gold to-champagne-pink rounded-full flex items-center justify-center mx-auto mb-6 shadow-golden">
          <ShoppingBagIcon className="w-12 h-12 text-royal-purple" />
        </div>
        <h1 className="text-4xl font-playfair font-bold text-royal-purple mb-4">
          Boutique Royal
        </h1>
        <p className="text-aubergine-violet/70 font-raleway text-lg max-w-md mx-auto">
          Découvrez notre collection exclusive d'accessoires et produits pour révéler votre essence royale.
        </p>
        <div className="mt-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-imperial-gold/20 to-champagne-pink/20 rounded-full px-6 py-3 border border-imperial-gold/30">
            <div className="w-3 h-3 bg-imperial-gold rounded-full animate-pulse"></div>
            <span className="text-royal-purple font-raleway font-medium">
              Coming Soon / Bientôt disponible
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopPage;