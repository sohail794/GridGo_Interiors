/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-emerald': '#00ff88',
        'brand-emerald-dark': '#00b894',
        'brand-cyan': '#00d9ff',
        'brand-coral': '#ff6b35',
        'brand-gold': '#d4af37',
        emerald: {
          DEFAULT: '#50C878',
          dark: '#4CAF50',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          light: '#E0E0E0',
          dark: '#A0A0A0',
        },
        ivory: '#FFFFF0',
        charcoal: '#36454F',
      },
      textColor: {
        'text-primary': '#ffffff',
        'text-secondary': '#b4b4b4',
        'text-tertiary': '#6b7280',
        'text-disabled': '#4b5563',
      },
      backgroundColor: {
        'bg-primary': '#0a0e27',
        'bg-secondary': '#141b2d',
        'bg-elevated': '#1a1f3a',
        'background-primary': '#0a0e27',
      },
      boxShadow: {
        luxury: '0 4px 6px rgba(0, 0, 0, 0.1)',
        'luxury-hover': '0 6px 8px rgba(0, 0, 0, 0.15)',
        '3d': '0 10px 25px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-in-out',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)' },
          to: { transform: 'translateY(0)' },
        },
        'fade-in-down': {
          from: { 
            opacity: 0,
            transform: 'translateY(-10px)',
          },
          to: { 
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      borderRadius: {
        'radius-lg': '12px',
        'radius-2xl': '24px',
      },
    },
  },
  plugins: [],
};

