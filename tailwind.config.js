/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['Cormorant Garamond', 'ui-serif', 'Georgia', 'serif'],
        display: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'brand-emerald': '#00ff88',
        'brand-emerald-dark': '#00b894',
        'brand-cyan': '#00d9ff',
        'brand-coral': '#ff6b35',
        'brand-gold': '#d4af37',
        'brand-gold-soft': '#e5c158',
        'brand-gold-deep': '#b8922b',
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
        'text-secondary': '#b0b0b0',
        'text-tertiary': '#a8a8a8',
        'text-disabled': '#6b7280',
      },
      backgroundColor: {
        'bg-primary': '#1a1a1a',
        'bg-secondary': '#252525',
        'bg-elevated': '#2a2a2a',
        'background-primary': '#1a1a1a',
        'background-secondary': '#252525',
        'background-elevated': '#2a2a2a',
      },
      // Spacing tokens for consistent section spacing
      spacing: {
        'section-sm': '2rem',      // 32px - subsections
        'section-md': '4rem',      // 64px - standard sections (py-16)
        'section-lg': '6rem',      // 96px - hero/major sections (py-24)
        'section-xl': '8rem',      // 128px - extra large sections (py-32)
      },
      // Padding shortcuts
      padding: {
        'section-sm': '2rem',
        'section-md': '4rem', 
        'section-lg': '6rem',
        'section-xl': '8rem',
      },
      fontSize: {
        // Display - Large hero headings
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        
        // Heading - Section headings
        'h1': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['1.75rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],
        'h5': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],
        'h6': ['1rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],
        
        // Mobile heading variants
        'h1-mobile': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2-mobile': ['1.5rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3-mobile': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        
        // Body - Reading text
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],
        'body-base': ['1rem', { lineHeight: '1.7', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0' }],
        
        // Labels & UI
        'label': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-xs': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '700', textTransform: 'uppercase' }],
      },
      boxShadow: {
        luxury: '0 4px 6px rgba(0, 0, 0, 0.1)',
        'luxury-hover': '0 12px 24px rgba(0, 0, 0, 0.3)',
        '3d': '0 10px 25px rgba(0, 0, 0, 0.3)',
        'text': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'luxury-gold': '0 12px 30px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(212, 175, 55, 0.10)',
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
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        // Display styles
        '.text-display-xl': { fontSize: theme('fontSize.display-xl') },
        '.text-display-lg': { fontSize: theme('fontSize.display-lg') },
        '.text-display-md': { fontSize: theme('fontSize.display-md') },
        
        // Heading styles
        'h1, .text-h1': { fontSize: theme('fontSize.h1'), fontWeight: '700' },
        'h2, .text-h2': { fontSize: theme('fontSize.h2'), fontWeight: '700' },
        'h3, .text-h3': { fontSize: theme('fontSize.h3'), fontWeight: '600' },
        'h4, .text-h4': { fontSize: theme('fontSize.h4'), fontWeight: '600' },
        'h5, .text-h5': { fontSize: theme('fontSize.h5'), fontWeight: '600' },
        'h6, .text-h6': { fontSize: theme('fontSize.h6'), fontWeight: '600' },
        
        // Body styles
        '.text-body-lg': { fontSize: theme('fontSize.body-lg') },
        '.text-body-base': { fontSize: theme('fontSize.body-base') },
        '.text-body-sm': { fontSize: theme('fontSize.body-sm') },
        '.text-body-xs': { fontSize: theme('fontSize.body-xs') },
        
        // Label styles
        '.text-label': { fontSize: theme('fontSize.label'), fontWeight: '500' },
        '.text-label-sm': { fontSize: theme('fontSize.label-sm'), fontWeight: '600' },
        '.text-label-xs': { fontSize: theme('fontSize.label-xs'), fontWeight: '700', textTransform: 'uppercase' },
      });
    },
  ],
};
