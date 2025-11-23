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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
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
            className="p-2 text-[#00ff88] hover:text-[#00d9ff] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00ff88]/50 rounded-lg hover:bg-white/5"
          >
            <X size={28} />
          </button>
        </div>
      </div>

      {/* Centered menu content */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 pt-20 pb-6">
        <nav className="flex flex-col items-center gap-4 w-full max-w-md">
          {menuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`
                w-full text-center px-8 py-4 rounded-xl text-lg font-semibold
                transition-all duration-200 ease-in-out
                hover:scale-[1.02] active:scale-95
                focus:outline-none focus:ring-2 focus:ring-[#00ff88]/50 focus:ring-offset-2 focus:ring-offset-[#0a0e27]
                ${
                  currentPage === item.page
                    ? 'bg-gradient-to-r from-[#00ff88]/20 to-[#00d9ff]/20 text-white border border-[#00ff88]/50 shadow-[0_0_20px_rgba(0,255,136,0.15)]'
                    : 'text-[#b4b4b4] hover:text-[#00ff88] hover:bg-white/5 border border-white/10 hover:border-[#00ff88]/50'
                }
              `}
            >
              {item.label}
            </button>
          ))}

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
