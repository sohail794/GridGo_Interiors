import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
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
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Portfolio', page: 'portfolio', hasDropdown: true },
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

          <nav className="hidden lg:flex items-center gap-1">
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
                    px-4 py-2 rounded-lg text-base font-medium transition-all duration-300
                    flex items-center gap-1 min-h-[44px]
                    ${
                      currentPage === item.page
                        ? 'text-white bg-white/5'
                        : 'text-[#b4b4b4] hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={16} />}
                </button>

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
                          w-full text-left px-4 py-3 rounded-lg min-h-[44px]
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

            <a
              href="https://x.com/GridGoInteriors"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 text-[#b4b4b4] hover:text-white hover:bg-white/5 min-h-[44px] flex items-center"
              aria-label="Follow us on X (Twitter)"
            >
              𝕏
            </a>
          </nav>

          <div className="hidden lg:block ml-4">
            <Button3D size="sm" onClick={onOpenModal} className="animate-pulse-glow">
              GET A QUOTE
            </Button3D>
          </div>

          <button
            className="lg:hidden text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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

            <nav className="p-6 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-4 rounded-lg font-medium min-h-[44px]
                    transition-all duration-200
                    ${
                      currentPage === item.page
                        ? 'bg-[#00ff88]/10 text-white border-l-4 border-[#00ff88]'
                        : 'text-[#b4b4b4] hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}

              <a
                href="https://x.com/GridGoInteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-4 rounded-lg font-medium min-h-[44px] text-[#b4b4b4] hover:bg-white/5 hover:text-white transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl">𝕏</span>
                <span>Follow us on X</span>
              </a>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <Button3D
                className="w-full"
                onClick={() => {
                  onOpenModal();
                  setMobileMenuOpen(false);
                }}
              >
                GET A QUOTE
              </Button3D>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
