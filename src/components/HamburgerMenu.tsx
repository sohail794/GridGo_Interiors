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
      className="
        relative lg:hidden p-2
        min-w-[44px] min-h-[44px]
        flex items-center justify-center
        rounded-lg
        group
        transition-all duration-300
        hover:bg-[#00F5A0]/10
        focus:outline-none focus:ring-2 focus:ring-[#00F5A0]/50
        backdrop-blur-md
      "
    >
      {/* Hover glow effect */}
      <div className="
        absolute inset-0 rounded-lg opacity-0 
        group-hover:opacity-100 transition-opacity duration-300
        shadow-[0_0_20px_rgba(0,245,160,0.35)]
      " />
      
      {/* Icon container */}
      <div className="
        relative w-[30px] h-[24px]
        flex flex-col justify-center items-center
        group-hover:scale-105 transition-transform duration-300
      ">
        {/* Top bar */}
        <span
          className={`
            absolute w-full h-[2px] rounded-full
            bg-[#00F5A0] opacity-80
            group-hover:opacity-100
            transition-all duration-300 ease-in-out
            ${isOpen 
              ? 'rotate-45 translate-y-0' 
              : '-translate-y-[8px]'
            }
          `}
        />
        
        {/* Middle bar */}
        <span
          className={`
            absolute w-full h-[2px] rounded-full
            bg-[#00F5A0] opacity-80
            group-hover:opacity-100
            transition-all duration-300 ease-in-out
            ${isOpen 
              ? 'scale-0 opacity-0' 
              : 'scale-100 opacity-80'
            }
          `}
        />
        
        {/* Bottom bar */}
        <span
          className={`
            absolute w-full h-[2px] rounded-full
            bg-[#00F5A0] opacity-80
            group-hover:opacity-100
            transition-all duration-300 ease-in-out
            ${isOpen 
              ? '-rotate-45 translate-y-0' 
              : 'translate-y-[8px]'
            }
          `}
        />
      </div>
    </button>
  );
}
