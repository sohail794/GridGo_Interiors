import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Button3D from './Button3D';
import HamburgerMenu from './HamburgerMenu';
import Logo from './Logo';

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
  const prefersReducedMotion = useReducedMotion();

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
    <motion.header
      className={`
        sticky top-0 w-full z-[9999]
        glass-nav
        border-b border-white/10
        transition-all duration-200 ease-out
        backdrop-blur-md 
        ${isScrolled ? 'h-16 shadow-luxury bg-[#1a1a1a]/95' : 'h-20 bg-[#1a1a1a]/80'}
      `}
      role="banner"
      aria-label="Site navigation"
      initial={prefersReducedMotion ? undefined : { y: -100 }}
      animate={prefersReducedMotion ? undefined : { y: 0 }}
      transition={prefersReducedMotion ? undefined : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[1400px] mx-auto px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Logo size="md" onClick={() => onNavigate('home')} />

          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <ul className="flex items-center space-x-8" role="menubar">
              {menuItems.map((item) => (
                <li
                  key={item.page}
                  className="relative"
                  role="none"
                  onMouseEnter={() => item.hasDropdown && setPortfolioDropdown(true)}
                  onMouseLeave={() => item.hasDropdown && setPortfolioDropdown(false)}
                >
                  <a
                    href={`#${item.page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.page);
                    }}
                    className={`relative inline-flex items-center text-sm md:text-base font-medium group transition-all duration-300 ${
                      currentPage === item.page ? "text-white" : "text-gray-300 hover:text-white"
                    }`}
                    role="menuitem"
                    aria-current={currentPage === item.page ? 'page' : undefined}
                    aria-haspopup={item.hasDropdown ? 'menu' : undefined}
                    aria-expanded={item.hasDropdown ? portfolioDropdown : undefined}
                  >
                    <span className="transition-transform duration-300 group-hover:-translate-y-[1px]">
                      {item.label}
                      {item.hasDropdown && <ChevronDown size={16} className={`inline-block ml-1 transition-transform duration-300 ${portfolioDropdown ? 'rotate-180' : ''}`} aria-hidden="true" />}
                    </span>
                    <span
                      className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-brand-gold transition-transform duration-300 group-hover:scale-x-100 ${
                        currentPage === item.page ? "scale-x-100" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </a>

                  <AnimatePresence>
                    {item.hasDropdown && portfolioDropdown && (
                      <motion.ul
                        className="absolute top-full left-0 mt-2 w-48 glass-card p-2"
                        role="menu"
                        aria-label="Portfolio categories"
                        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                        transition={prefersReducedMotion ? undefined : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {portfolioItems.map((subItem) => (
                          <li key={subItem.category} role="none">
                            <button
                              onClick={() => {
                                onNavigate('portfolio');
                                setPortfolioDropdown(false);
                              }}
                              className="
                                w-full text-left px-4 py-3 min-h-[44px] rounded-lg
                                text-text-secondary hover:text-white
                                hover:bg-white/5 active:bg-white/10 hover:translate-x-1
                                transition-all duration-300
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60
                              "
                              role="menuitem"
                            >
                              {subItem.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
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
    </motion.header>
  );
}
