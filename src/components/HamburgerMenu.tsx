interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerMenu({ isOpen, onClick }: HamburgerMenuProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-haspopup="true"
      className={`
        relative lg:hidden
        w-12 h-12
        flex items-center justify-center
        rounded-xl
        group
        transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]
        border border-white/10
        active:scale-95
        ${isOpen 
          ? 'bg-brand-gold/15 border-brand-gold/50 shadow-luxury-gold' 
          : 'hover:bg-white/5 hover:border-brand-gold/30'
        }
      `}
    >
      {/* Premium glow effect on hover */}
      <div className={`
        absolute inset-0 rounded-xl transition-all duration-500
        bg-gradient-to-br from-brand-gold/10 to-brand-gold-soft/5
        ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
      `} aria-hidden="true" />
      
      {/* Icon container */}
      <div className="relative w-5 h-4 flex flex-col justify-between" aria-hidden="true">
        {/* Top bar */}
        <span
          className={`
            block h-[2.5px] rounded-full
            bg-gradient-to-r from-brand-gold to-brand-gold-soft
            transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
            origin-center
            ${isOpen 
              ? 'rotate-45 translate-y-[7px] w-full' 
              : 'rotate-0 translate-y-0 w-full group-hover:w-4'
            }
          `}
        />
        
        {/* Middle bar */}
        <span
          className={`
            block h-[2.5px] rounded-full
            bg-gradient-to-r from-brand-gold to-brand-gold-soft
            transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isOpen 
              ? 'opacity-0 scale-x-0 translate-x-2' 
              : 'opacity-100 scale-x-100 translate-x-0 w-3/4 group-hover:w-full'
            }
          `}
        />
        
        {/* Bottom bar */}
        <span
          className={`
            block h-[2.5px] rounded-full
            bg-gradient-to-r from-brand-gold to-brand-gold-soft
            transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
            origin-center
            ${isOpen 
              ? '-rotate-45 -translate-y-[7px] w-full' 
              : 'rotate-0 translate-y-0 w-1/2 group-hover:w-full'
            }
          `}
        />
      </div>

      {/* Subtle glow effect */}
      <div className={`
        absolute inset-0 rounded-xl transition-all duration-400
        pointer-events-none
        ${isOpen 
          ? 'opacity-100 shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
          : 'opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_16px_rgba(212,175,55,0.18)]'
        }
      `} aria-hidden="true" />
    </button>
  );
}
