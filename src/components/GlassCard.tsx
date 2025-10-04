import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  padding = 'md',
}: GlassCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12',
  };

  return (
    <div
      className={`
        glass-card
        shadow-card
        ${hover ? 'transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover hover:border-[rgba(0,255,136,0.3)]' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
