/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
      boxShadow: {
        luxury: '0 4px 6px rgba(0, 0, 0, 0.1)',
        'luxury-hover': '0 6px 8px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-in-out',
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
      },
    },
  },
  plugins: [],
};
