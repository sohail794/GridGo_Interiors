import { ReactNode } from 'react';

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
  const baseClasses = 'rounded-radius-lg border border-white/10 transition-all duration-200 ease-out';
  const glassClasses = glass ? 'glass-card' : 'bg-background-elevated';
  const hoverClasses = hover 
    ? 'hover:border-[rgb(0,255,136)]/50 hover:shadow-lg hover:shadow-[rgb(0,255,136)]/10 hover:scale-[1.02]' 
    : '';

  return (
    <div className={`${baseClasses} ${glassClasses} ${hoverClasses} ${paddingMap[padding]} ${className}`}>
      {children}
    </div>
  );
}
