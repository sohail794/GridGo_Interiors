import { ReactNode } from 'react';
import { HTMLMotionProps, motion, useReducedMotion } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseClasses = 'rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-br from-brand-gold to-brand-gold-deep
      text-[#1a1a1a]
      shadow-luxury-gold
      hover:from-brand-gold-soft hover:to-brand-gold
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-200
    `,
    secondary: `
      bg-transparent
      border-2 border-brand-gold/70
      text-brand-gold
      hover:bg-brand-gold hover:text-[#1a1a1a]
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-200
    `,
    ghost: `
      bg-transparent
      text-brand-gold
      hover:bg-brand-gold/10
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-200
    `,
  };

  const canAnimate = !prefersReducedMotion && !disabled && !loading;

  return (
    <motion.button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      disabled={disabled || loading}
      whileHover={canAnimate ? { y: -1, scale: 1.05 } : undefined}
      whileTap={canAnimate ? { y: 0, scale: 0.99 } : undefined}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </motion.button>
  );
}
