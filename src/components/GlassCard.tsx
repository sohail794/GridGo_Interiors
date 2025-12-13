import { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  border?: 'default' | 'gold' | 'subtle' | 'none';
  style?: CSSProperties;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  padding = 'md',
  border = 'default',
  style,
}: GlassCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
  };

  const borderClasses = {
    default: 'border border-white/10',
    gold: 'border border-brand-gold/30',
    subtle: 'border border-white/5',
    none: '',
  };

  return (
    <div
      className={`
        bg-[rgba(37,37,37,0.72)]
        backdrop-blur-xl
        rounded-2xl
        shadow-card
        ${borderClasses[border]}
        ${hover ? 'transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-card-hover hover:border-brand-gold/40' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
}
