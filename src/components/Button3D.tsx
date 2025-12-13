import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Button3DProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  loading?: boolean;
}

export default function Button3D({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled = false,
  loading = false,
  ...props
}: Button3DProps) {
  const baseClasses = 'font-semibold uppercase tracking-wide rounded-xl transition-all duration-200 ease-out inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-br from-brand-gold to-brand-gold-deep
      text-[#1a1a1a]
      shadow-luxury-gold
      hover:brightness-110 hover:-translate-y-1
      active:translate-y-0 active:scale-95 active:brightness-95
    `,
    secondary: `
      bg-white/5
      border border-white/10
      text-white
      hover:border-brand-gold/40 hover:bg-white/10
      hover:-translate-y-1
      active:translate-y-0 active:scale-95
    `,
    ghost: `
      bg-transparent
      border-2 border-brand-gold/70
      text-brand-gold
      hover:border-brand-gold hover:bg-brand-gold/10
      hover:-translate-y-1
      active:scale-95 active:translate-y-0 active:bg-brand-gold/15
    `,
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && <span className="inline-flex">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
