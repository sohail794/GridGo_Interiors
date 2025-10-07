import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Linkedin, Mail } from 'lucide-react';
import Button3D from './Button3D';
import logo from '../assets/images/logo/GridGo_Original_Logo.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenModal: () => void;
}

export default function HeaderNew({ currentPage, onNavigate, onOpenModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [portfolioDropdown, setPortfolioDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', page: 'home' },
    { label: 'Portfolio', page: 'portfolio', hasDropdown: true },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Insights', page: 'blog' },
  ];

  const portfolioItems = [
    { label: 'Residential', category: 'residential' },
    { label: 'Commercial', category: 'commercial' },
    { label: 'Fabrication', category: 'fabrication' },
    { label: 'View All', category: 'all' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-[1000]
        glass-nav
        border-b border-white/10
        transition-all duration-300
        ${scrolled ? 'bg-opacity-95' : 'bg-opacity-80'}
      `}
    >
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <img
              src={logo}
              alt="GridGo Interiors"
              className="h-12 w-auto transition-all group-hover:scale-105"
            />
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.page}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setPortfolioDropdown(true)}
                onMouseLeave={() => item.hasDropdown && setPortfolioDropdown(false)}
              >
                <button
                  onClick={() => onNavigate(item.page)}
                  className={`
                    text-base font-medium transition-all duration-300
                    flex items-center gap-1
                    ${
                      currentPage === item.page
                        ? 'text-white text-glow'
                        : 'text-[#b4b4b4] hover:text-white hover:text-glow'
                    }
                  `}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={16} />}
                </button>

                {item.hasDropdown && currentPage === item.page && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00ff88] to-[#00d9ff]" />
                )}

                {item.hasDropdown && portfolioDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 glass-card p-2 animate-fade-in">
                    {portfolioItems.map((subItem) => (
                      <button
                        key={subItem.category}
                        onClick={() => {
                          onNavigate('portfolio');
                          setPortfolioDropdown(false);
                        }}
                        className="
                          w-full text-left px-4 py-3 rounded-lg
                          text-[#b4b4b4] hover:text-white
                          hover:bg-white/5
                          transition-all duration-200
                        "
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button3D size="sm" onClick={onOpenModal}>
              Get a Quote
            </Button3D>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[998]"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 w-[80%] h-full glass-card z-[999] animate-slide-in-right">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="text-xl font-bold gradient-text">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={28} className="text-white" />
              </button>
            </div>

            <nav className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full text-left px-6 py-4 text-lg font-medium
                    transition-all duration-200
                    min-h-[44px] flex items-center
                    ${
                      currentPage === item.page
                        ? 'text-white'
                        : 'text-[#b4b4b4] hover:text-white'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4 border-t border-white/10 bg-[#0a0e27]/95">
              <Button3D
                className="w-full min-h-[52px]"
                onClick={() => {
                  onOpenModal();
                  setMobileMenuOpen(false);
                }}
              >
                Get a Quote
              </Button3D>

              <div className="flex items-center justify-center gap-6 pt-2">
                <a
                  href="https://x.com/GridGoInteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b4b4b4] hover:text-white transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/gridgo-interiors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b4b4b4] hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b4b4b4] hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <a
                  href="mailto:info@gridgointeriors.com"
                  className="text-[#b4b4b4] hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
