interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  onClick?: () => void;
}

export default function Logo({ className = '', size = 'md', variant = 'full', onClick }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`
          ${iconSizeClasses[size]}
          flex items-center justify-center
          rounded-xl
          bg-gradient-to-br from-brand-gold to-brand-gold-deep
          shadow-luxury
          transition-all duration-300
          hover:shadow-luxury-gold hover:scale-105
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]
          ${className}
        `}
        aria-label="GridGo Interiors - Go to homepage"
      >
        <span className="text-background-primary font-bold font-display tracking-tight">
          G
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group flex items-center gap-2
        transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]
        rounded-lg px-1
        ${className}
      `}
      aria-label="GridGo Interiors - Go to homepage"
    >
      {/* Logo Icon */}
      <div className={`
        ${iconSizeClasses[size]}
        flex items-center justify-center
        rounded-xl
        bg-gradient-to-br from-brand-gold to-brand-gold-deep
        shadow-luxury
        transition-all duration-300
        group-hover:shadow-luxury-gold group-hover:scale-105
        border border-brand-gold/20
      `}>
        <span className="text-background-primary font-bold font-display tracking-tight text-lg">
          G
        </span>
      </div>

      {/* Logo Text */}
      <div className={`flex flex-col ${sizeClasses[size]}`}>
        <span className="font-display font-bold tracking-tight leading-none text-white group-hover:text-brand-gold transition-colors duration-300">
          GridGo
        </span>
        <span className="font-serif italic text-brand-gold text-sm tracking-wide leading-none mt-0.5">
          Interiors
        </span>
      </div>
    </button>
  );
}

