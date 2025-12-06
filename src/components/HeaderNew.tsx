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
      <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <button
            type="button"
            className="flex items-center cursor-pointer group transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,255,136)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27] rounded-lg"
            onClick={() => onNavigate('home')}
            aria-label="Go to homepage"
          >
            <img
              src={logo}
              alt="GridGo Interiors"
              className="h-12 w-auto transition-all duration-200 group-hover:scale-105"
              width="150"
              height="48"
            />
          </button>

          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10" role="menubar">
            {menuItems.map((item) => (
              <div
                key={item.page}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setPortfolioDropdown(true)}
                onMouseLeave={() => item.hasDropdown && setPortfolioDropdown(false)}
              >
                {item.hasDropdown ? (
                  <button
                    type="button"
                    onClick={() => setPortfolioDropdown(!portfolioDropdown)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setPortfolioDropdown(!portfolioDropdown);
                      } else if (e.key === 'Escape') {
                        setPortfolioDropdown(false);
                      }
                    }}
                    className={`relative inline-flex items-center text-sm md:text-base font-medium group transition-all duration-200 ${
                      currentPage === item.page ? "text-white" : "text-gray-300 hover:text-white"
                    }`}
                    aria-expanded={portfolioDropdown}
                    aria-haspopup="menu"
                    aria-current={currentPage === item.page ? 'page' : undefined}
                  >
                    <span className="transition-transform duration-200 group-hover:-translate-y-[1px]">
                      {item.label}
                      <ChevronDown size={16} className={`inline-block ml-1 transition-transform duration-200 ${portfolioDropdown ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </span>
                    <span
                      className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-[#00F5A0] transition-transform duration-200 group-hover:scale-x-100 ${
                        currentPage === item.page ? "scale-x-100" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <a
                    href={`#${item.page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.page);
                    }}
                    className={`relative inline-flex items-center text-sm md:text-base font-medium group transition-all duration-200 ${
                      currentPage === item.page ? "text-white" : "text-gray-300 hover:text-white"
                    }`}
                    aria-current={currentPage === item.page ? 'page' : undefined}
                    role="menuitem"
                  >
                    <span className="transition-transform duration-200 group-hover:-translate-y-[1px]">
                      {item.label}
                    </span>
                    <span
                      className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-[#00F5A0] transition-transform duration-200 group-hover:scale-x-100 ${
                        currentPage === item.page ? "scale-x-100" : ""
                      }`}
                    />
                  </a>
                )}

                {item.hasDropdown && portfolioDropdown && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 glass-card p-2 animate-fade-in-down"
                    role="menu"
                    aria-label="Portfolio categories"
                  >
                    {portfolioItems.map((subItem, index) => (
                      <button
                        key={subItem.category}
                        onClick={() => {
                          onNavigate('portfolio');
                          setPortfolioDropdown(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setPortfolioDropdown(false);
                          } else if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            const next = e.currentTarget.nextElementSibling as HTMLButtonElement;
                            next?.focus();
                          } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            const prev = e.currentTarget.previousElementSibling as HTMLButtonElement;
                            prev?.focus();
                          }
                        }}
                        className="
                          w-full text-left px-4 py-3 min-h-[44px] rounded-lg
                          text-text-secondary hover:text-white
                          hover:bg-white/5 active:bg-white/10 hover:translate-x-1
                          transition-all duration-200
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,255,136)]/50
                        "
                        role="menuitem"
                        tabIndex={index === 0 ? 0 : -1}
                        autoFocus={index === 0}
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
