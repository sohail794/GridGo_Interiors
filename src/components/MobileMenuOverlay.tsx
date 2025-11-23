import { useEffect } from 'react';
import { ChevronDown, Linkedin, Mail, X } from 'lucide-react';
import Button3D from './Button3D';
import logo from '../assets/images/logo/gridgo-logo.svg';
import { CONTACT } from '../config/contact';

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

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 mt-10 pt-8 border-t border-white/10">
            <a
              href="https://x.com/GridGoInteriors"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-[#b4b4b4] hover:text-[#00ff88] rounded-lg transition-all hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00ff88]/50"
              aria-label="X (Twitter)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/gridgo-interiors"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-[#b4b4b4] hover:text-[#00ff88] rounded-lg transition-all hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00ff88]/50"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            {CONTACT.whatsappUrl && (
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[#b4b4b4] hover:text-[#00ff88] rounded-lg transition-all hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00ff88]/50"
                aria-label="WhatsApp"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            )}
            <a
              href="mailto:info@gridgointeriors.com"
              className="p-3 text-[#b4b4b4] hover:text-[#00ff88] rounded-lg transition-all hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00ff88]/50"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
