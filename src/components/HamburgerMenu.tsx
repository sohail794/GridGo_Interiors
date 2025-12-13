import { motion, useReducedMotion } from 'framer-motion';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerMenu({ isOpen, onClick }: HamburgerMenuProps) {
  const prefersReducedMotion = useReducedMotion();

  const barVariants = {
    closed: {
      rotate: 0,
      y: 0,
      opacity: 1,
    },
    openTop: {
      rotate: 45,
      y: 8,
    },
    openMiddle: {
      opacity: 0,
      x: 10,
    },
    openBottom: {
      rotate: -45,
      y: -8,
    },
  };

  return (
    <motion.button
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-haspopup="true"
      className={`
        relative lg:hidden
        w-14 h-14
        flex items-center justify-center
        rounded-2xl
        group
        transition-all duration-300 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]
        border
        ${isOpen 
          ? 'bg-brand-gold/20 border-brand-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.25)]' 
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-brand-gold/30'
        }
      `}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
    >
      {/* Icon container */}
      <div className="relative w-6 h-5 flex flex-col justify-between" aria-hidden="true">
        {/* Top bar */}
        <motion.span
          className="block h-[2.5px] w-full rounded-full bg-brand-gold origin-center"
          variants={barVariants}
          initial="closed"
          animate={isOpen ? 'openTop' : 'closed'}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Middle bar */}
        <motion.span
          className="block h-[2.5px] w-full rounded-full bg-brand-gold origin-center"
          variants={barVariants}
          initial="closed"
          animate={isOpen ? 'openMiddle' : 'closed'}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Bottom bar */}
        <motion.span
          className="block h-[2.5px] w-full rounded-full bg-brand-gold origin-center"
          variants={barVariants}
          initial="closed"
          animate={isOpen ? 'openBottom' : 'closed'}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.button>
  );
}
