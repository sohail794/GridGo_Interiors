import { useEffect } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Button3D from './Button3D';

interface MobileMenuOverlayProps {
  open: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenModal: () => void;
}

export default function MobileMenuOverlay({
  open,
  onClose,
  currentPage,
  onNavigate,
  onOpenModal,
}: MobileMenuOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const menuItems = [
    { label: 'Home', page: 'home' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Insights', page: 'blog' },
  ];

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    if (open) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [open, onClose]);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    onClose();
  };

  // Animation variants for staggered menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24 
      } 
    },
    exit: { 
      opacity: 0, 
      x: 30,
      transition: { duration: 0.15 }
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in panel from right */}
          <motion.div
            id="mobile-menu"
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-[10000] bg-background-primary lg:hidden flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={prefersReducedMotion ? { duration: 0.2 } : { 
              type: 'spring', 
              stiffness: 300, 
              damping: 30 
            }}
          >
            {/* Header with close button */}
            <div className="flex justify-end items-center px-6 py-5 border-b border-white/10">
              <motion.button
                onClick={onClose}
                aria-label="Close menu"
                className="w-12 h-12 flex items-center justify-center text-brand-gold hover:text-white bg-white/5 hover:bg-brand-gold/20 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Menu content */}
            <motion.nav 
              className="flex-1 flex flex-col justify-center px-6 py-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = currentPage === item.page;
                  return (
                    <motion.button
                      key={item.page}
                      variants={itemVariants}
                      onClick={() => handleNavClick(item.page)}
                      className={`
                        w-full text-left px-6 py-4 rounded-2xl text-xl font-semibold
                        transition-all duration-300 ease-out
                        min-h-[64px] flex items-center
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-brand-gold/20 to-brand-gold-soft/10 text-brand-gold border-l-4 border-brand-gold'
                            : 'text-gray-200 hover:text-white hover:bg-white/5 hover:pl-8 border-l-4 border-transparent hover:border-brand-gold/40'
                        }
                      `}
                      aria-current={isActive ? 'page' : undefined}
                      whileHover={{ x: isActive ? 0 : 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>

              <motion.div 
                className="mt-10 pt-6 border-t border-white/10"
                variants={itemVariants}
              >
                <Button3D
                  className="w-full min-h-[60px] text-lg font-semibold"
                  onClick={() => {
                    onOpenModal();
                    onClose();
                  }}
                >
                  Get a Quote
                </Button3D>
              </motion.div>

              {/* Contact info */}
              <motion.div 
                className="mt-8 text-center"
                variants={itemVariants}
              >
                <p className="text-text-tertiary text-sm mb-2">Need help?</p>
                <a 
                  href="tel:+918595007476" 
                  className="text-brand-gold hover:text-brand-gold-soft font-medium transition-colors"
                >
                  +91 859 500 7476
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
