import { useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (!success) {
          setError('Invalid credentials. Try admin@example.com / password123');
        }
      } else {
        const success = await register(formData);
        if (!success) {
          setError('Registration failed. Email may already exist.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-purple via-aubergine-violet to-indigo flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-imperial-gold to-champagne-pink rounded-full flex items-center justify-center mx-auto mb-4 shadow-golden">
            <span className="text-royal-purple font-playfair font-bold text-3xl">Q</span>
          </div>
          <h1 className="text-4xl font-playfair font-bold text-pearl mb-2">
            Queen de Q
          </h1>
          <p className="text-champagne-pink font-raleway">
            Révélez votre essence royale
          </p>
        </div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-pearl/95 backdrop-blur-sm rounded-2xl p-8 shadow-royal border border-imperial-gold/20"
        >
          {/* Toggle */}
          <div className="flex mb-6 bg-gradient-to-r from-royal-purple/10 to-champagne-pink/10 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-raleway font-medium transition-all duration-200 ${
                isLogin 
                  ? 'bg-gradient-to-r from-imperial-gold to-champagne-pink text-royal-purple shadow-soft' 
                  : 'text-aubergine-violet hover:text-royal-purple'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-raleway font-medium transition-all duration-200 ${
                !isLogin 
                  ? 'bg-gradient-to-r from-imperial-gold to-champagne-pink text-royal-purple shadow-soft' 
                  : 'text-aubergine-violet hover:text-royal-purple'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-royal-purple font-raleway font-medium mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-imperial-gold/30 focus:border-imperial-gold focus:ring-2 focus:ring-imperial-gold/20 transition-all duration-200 font-raleway"
                    required={!isLogin}
                  />
                </div>
                <div>
                  <label className="block text-royal-purple font-raleway font-medium mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-imperial-gold/30 focus:border-imperial-gold focus:ring-2 focus:ring-imperial-gold/20 transition-all duration-200 font-raleway"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-royal-purple font-raleway font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-imperial-gold/30 focus:border-imperial-gold focus:ring-2 focus:ring-imperial-gold/20 transition-all duration-200 font-raleway"
                required
              />
            </div>

            <div>
              <label className="block text-royal-purple font-raleway font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-imperial-gold/30 focus:border-imperial-gold focus:ring-2 focus:ring-imperial-gold/20 transition-all duration-200 font-raleway"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-aubergine-violet hover:text-royal-purple transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 font-raleway text-sm">{error}</p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-royal-purple to-aubergine-violet text-pearl py-3 rounded-lg font-raleway font-medium hover:from-royal-purple/90 hover:to-aubergine-violet/90 transition-all duration-200 shadow-royal disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'S\'inscrire')}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          {isLogin && (
            <div className="mt-6 p-4 bg-gradient-to-r from-imperial-gold/10 to-champagne-pink/10 rounded-lg">
              <p className="text-royal-purple font-raleway font-medium text-sm mb-2">
                Comptes de démonstration :
              </p>
              <div className="space-y-1 text-aubergine-violet/70 font-raleway text-xs">
                <p>Admin: admin@example.com / password123</p>
                <p>Client: client@example.com / password123</p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;