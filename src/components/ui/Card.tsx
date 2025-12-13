import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Padding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: ReactNode;
  padding?: Padding;
  glass?: boolean;
  hover?: boolean;
  className?: string;
}

const paddingMap: Record<Padding, string> = {
  none: '',
  sm: 'p-4 md:p-6',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-12',
};

export default function Card({
  children,
  padding = 'md',
  glass = false,
  hover = true,
  className = '',
}: CardProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseClasses = 'rounded-radius-lg border border-white/10 transition-all duration-200 ease-out';
  const glassClasses = glass ? 'glass-card' : 'bg-background-elevated';
  const hoverClasses = hover 
    ? 'hover:border-brand-gold/40 hover:shadow-luxury-gold' 
    : '';

  const content = (
    <>
      {children}
    </>
  );

  if (!hover || prefersReducedMotion) {
    return (
      <div className={`${baseClasses} ${glassClasses} ${hoverClasses} ${paddingMap[padding]} ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${glassClasses} ${hoverClasses} ${paddingMap[padding]} ${className}`}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {content}
    </motion.div>
  );
}
