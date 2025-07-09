/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Queen de Q Color Palette
      colors: {
        // Royal palette
        royal: {
          purple: '#3B1E50',
          gold: '#D6AE60',
          champagne: '#D4B5A5',
          velvet: '#1B1B1B',
          pearl: '#FDF7F2',
        },
        // Cabinet palette
        cabinet: {
          aubergine: '#4B2E43',
          patina: '#B79D74',
          powder: '#E8C5C1',
          parchment: '#F5EBD6',
          ink: '#181818',
        },
        // Ritual palette
        ritual: {
          indigo: '#241B2F',
          smokedGold: '#C8A96B',
          vintage: '#E3BBB2',
          moonMilk: '#FFF9F3',
          amber: '#776650',
        },
        // Primary scale based on royal purple
        primary: {
          50: '#FDF7F2',
          100: '#E8D4D9',
          200: '#D4B5A5',
          300: '#D6AE60',
          400: '#C8A96B',
          500: '#3B1E50',
          600: '#4B2E43',
          700: '#241B2F',
          800: '#1B1B1B',
          900: '#181818',
        },
        'royal-purple': '#3B1E50',
        'imperial-gold': '#D6AE60',
        'aubergine-violet': '#5A2A6D',
        'velvet-black': '#1B1B1B',
        'pearl-white': '#FDF7F2',
        'champagne-pink': '#D4B5A5',
        'royal-gold': '#C8A96B',
        'smokedGold': '#C8A96B',
        'vintage': '#E3BBB2',
        'indigo': '#241B2F',
        'powder': '#E8C5C1',
        'pearl': '#FDF7F2',
      },
      // Queen de Q Typography
      fontFamily: {
        'title': ['"Playfair Display"', 'serif'],
        'body': ['"Raleway"', 'sans-serif'],
        'quote': ['"Playfair Display"', 'serif'],
        'sans': ['"Raleway"', 'system-ui', 'sans-serif'],
        'serif': ['"Playfair Display"', 'Georgia', 'serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'cinzel': ['Cinzel', 'serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      // Gradient backgrounds
      backgroundImage: {
        'gradient-royal': 'linear-gradient(135deg, #3B1E50 0%, #4B2E43 100%)',
        'gradient-mystical': 'linear-gradient(135deg, #241B2F 0%, #3B1E50 100%)',
        'gradient-golden': 'linear-gradient(135deg, #D6AE60 0%, #B79D74 100%)',
        'gradient-soft': 'linear-gradient(135deg, #FDF7F2 0%, #E8C5C1 100%)',
        'gradient-cabinet': 'linear-gradient(135deg, #4B2E43 0%, #241B2F 100%)',
      },
      // Queen de Q Shadows
      boxShadow: {
        'royal': '0 4px 20px rgba(59, 30, 80, 0.15)',
        'golden': '0 4px 20px rgba(214, 174, 96, 0.15)',
        'soft': '0 2px 10px rgba(75, 46, 67, 0.1)',
        'glow': '0 0 30px rgba(214, 174, 96, 0.4)',
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        'inner-glow': 'inset 0 0 20px rgba(214, 174, 96, 0.1)',
      },
      // Animations mystiques
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(214, 174, 96, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(214, 174, 96, 0.6)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(214, 174, 96, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(214, 174, 96, 0.6)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
          '50%': { transform: 'scale(1.05)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

