import { useEffect } from 'react';
import { X } from 'lucide-react';
import Button3D from './Button3D';
import logo from '../assets/images/logo/gridgo-logo.svg';

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
  const menuItems = [
    { label: 'Home', page: 'home' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Insights', page: 'blog' },
  ];

  // Lock body scroll when menu is open and prevent scroll-up animations
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.documentElement.style.overflow = '';
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

  if (!open) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNavClick = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`
        fixed inset-0 w-full h-full z-[99999] bg-[#0a0e27] backdrop-blur-md lg:hidden flex flex-col
        transition-all duration-300 ease-in-out
        ${open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
      `}
      role="navigation"
      aria-label="Mobile navigation menu"
      aria-hidden={!open}
    >
      {/* Header with logo and close button */}
      <div className="fixed top-0 left-0 right-0 z-[100000] bg-[#0a0e27] border-b border-white/10">
        <div className="flex justify-between items-center px-6 py-4 max-w-[1400px] mx-auto w-full">
          <img
            src={logo}
            alt="GridGo Interiors"
            className="h-10 w-auto"
          />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-[rgb(0,255,136)] hover:text-[rgb(0,217,255)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,255,136)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27] rounded-lg hover:bg-white/5"
          >
            <X size={28} />
          </button>
        </div>
      </div>

      {/* Centered menu content */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 pt-20 pb-6">
        <nav className="flex flex-col items-center gap-3 w-full max-w-md">
          {menuItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`
                  w-full text-left px-6 py-4 rounded-xl text-lg font-semibold
                  transition-all duration-200 ease-out
                  min-h-[56px] flex items-center touch-manipulation
                  active:scale-[0.98] active:bg-white/5
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,255,136)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27]
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-[rgb(0,255,136)]/20 to-[rgb(0,217,255)]/10 text-[rgb(0,255,136)] border-l-4 border-[rgb(0,255,136)] font-bold shadow-[0_0_20px_rgba(0,255,136,0.1)]'
                      : 'text-gray-300 hover:text-[rgb(0,255,136)] hover:bg-white/5 hover:translate-x-2 border-l-4 border-transparent hover:border-[rgb(0,255,136)]/30'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}

          <div className="w-full mt-6">
            <Button3D
              className="w-full min-h-[56px] text-lg font-semibold"
              onClick={() => {
                onOpenModal();
                onClose();
              }}
            >
              Get a Quote
            </Button3D>
          </div>
        </nav>
      </div>
    </div>
  );
}
