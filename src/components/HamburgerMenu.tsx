interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerMenu({ isOpen, onClick }: HamburgerMenuProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      className={`
        relative lg:hidden
        w-11 h-11
        flex items-center justify-center
        rounded-xl
        group
        transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27]
        border border-white/10
        ${isOpen 
          ? 'bg-brand-gold/10 border-brand-gold/40 shadow-luxury' 
          : 'hover:bg-white/5 hover:border-brand-gold/30'
        }
      `}
    >
      {/* Premium glow effect on hover */}
      <div className="
        absolute inset-0 rounded-xl opacity-0 
        group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-br from-brand-gold/10 to-brand-gold-soft/5
      " />
      
      {/* Icon container */}
      <div className="relative w-5 h-4 flex flex-col justify-between">
        {/* Top bar */}
        <span
          className={`
            block h-[2px] w-full rounded-full
            bg-gradient-to-r from-brand-gold to-brand-gold-soft
            transition-all duration-300 ease-out
            origin-center
            ${isOpen 
              ? 'rotate-45 translate-y-[7px]' 
              : 'rotate-0 translate-y-0'
            }
          `}
        />
        
        {/* Middle bar */}
        <span
          className={`
            block h-[2px] w-full rounded-full
            bg-gradient-to-r from-brand-gold to-brand-gold-soft
            transition-all duration-300 ease-out
            ${isOpen 
              ? 'opacity-0 scale-0' 
              : 'opacity-100 scale-100'
            }
          `}
        />
        
        {/* Bottom bar */}
        <span
          className={`
            block h-[2px] w-full rounded-full
            bg-gradient-to-r from-brand-gold to-brand-gold-soft
            transition-all duration-300 ease-out
            origin-center
            ${isOpen 
              ? '-rotate-45 -translate-y-[7px]' 
              : 'rotate-0 translate-y-0'
            }
          `}
        />
      </div>

      {/* Subtle glow effect */}
      <div className={`
        absolute inset-0 rounded-xl transition-opacity duration-300
        ${isOpen 
          ? 'opacity-100 shadow-[0_0_16px_rgba(212,175,55,0.22)]' 
          : 'opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_16px_rgba(212,175,55,0.16)]'
        }
      `} />
    </button>
  );
}
