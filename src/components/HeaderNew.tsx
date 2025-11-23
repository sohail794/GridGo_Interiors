import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Button3D from './Button3D';
import HamburgerMenu from './HamburgerMenu';
import logo from '../assets/images/logo/gridgo-logo.svg';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenModal: () => void;
  mobileMenuOpen: boolean;
  onMobileMenuChange: (open: boolean) => void;
}

export default function HeaderNew({ currentPage, onNavigate, onOpenModal, mobileMenuOpen, onMobileMenuChange }: HeaderProps) {
  const [portfolioDropdown, setPortfolioDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
        sticky top-0 w-full z-[9999]
        glass-nav
        border-b border-white/10
        transition-all duration-200 ease-out
        backdrop-blur-md 
        ${isScrolled ? 'h-16 shadow-lg shadow-[#00ff88]/10 bg-[#0a0e27]/95' : 'h-20 bg-[#0a0e27]/80'}
      `}
      role="banner"
      aria-label="Site navigation"
    >
      <div className="max-w-[1400px] mx-auto px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div
            className="flex items-center cursor-pointer group transition-all duration-200"
            onClick={() => onNavigate('home')}
          >
            <img
              src={logo}
              alt="GridGo Interiors"
              className="h-12 w-auto transition-all duration-200 group-hover:scale-105"
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
                    text-base font-medium transition-all duration-200 ease-out
                    flex items-center gap-1
                    py-1 px-2 rounded-lg
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,255,136)]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0a0e27]
                    ${
                      currentPage === item.page
                        ? 'text-white text-glow'
                        : 'text-text-secondary hover:text-white hover:text-glow hover:bg-white/5'
                    }
                  `}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                  aria-expanded={item.hasDropdown ? portfolioDropdown : undefined}
                  aria-haspopup={item.hasDropdown ? 'true' : undefined}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={16} className={`transition-transform duration-200 ${portfolioDropdown ? 'rotate-180' : ''}`} />}
                </button>

                {item.hasDropdown && currentPage === item.page && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[rgb(0,255,136)] to-[rgb(0,217,255)]" />
                )}

                {item.hasDropdown && portfolioDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 glass-card p-2 animate-fade-in-down">
                    {portfolioItems.map((subItem) => (
                      <button
                        key={subItem.category}
                        onClick={() => {
                          onNavigate('portfolio');
                          setPortfolioDropdown(false);
                        }}
                        className="
                          w-full text-left px-4 py-3 rounded-lg
                          text-text-secondary hover:text-white
                          hover:bg-white/5 hover:translate-x-1
                          transition-all duration-200 hover:opacity-100 opacity-80
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,255,136)]/50
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

          <HamburgerMenu 
            isOpen={mobileMenuOpen}
            onClick={() => onMobileMenuChange(!mobileMenuOpen)}
          />
        </div>
      </div>
    </header>
  );
}
