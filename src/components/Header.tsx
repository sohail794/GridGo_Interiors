import { useState, useEffect } from 'react';

import Button3D from './Button3D';
import logo from '../assets/images/logo/gridgo-logo.svg';
import { MENU_ITEMS, PORTFOLIO_ITEMS } from '../constants/menu';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onOpenModal?: () => void;
}

export default function Header({ onNavigate, onOpenModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [portfolioDropdown, setPortfolioDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Replaced hardcoded menu items with centralized constants
  const menuItems = MENU_ITEMS;
  const portfolioItems = PORTFOLIO_ITEMS;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all ${scrolled ? 'shadow-lg' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img
              src={logo}
              alt="GridGo Interiors - Luxury Interior Design"
              className="h-12 w-auto sm:h-14 transition-all hover:opacity-80"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.page} className="relative">
                <button
                  onClick={() => onNavigate(item.page)}
                  className="text-gray-700 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </button>
                {item.hasDropdown && (
                  <div
                    className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-opacity duration-200 ease-in-out"
                    onMouseEnter={() => setPortfolioDropdown(true)}
                    onMouseLeave={() => setPortfolioDropdown(false)}
                  >
                    {portfolioDropdown && (
                      <ul>
                        {portfolioItems.map((subItem) => (
                          <li
                            key={subItem.category}
                            className="px-4 py-2 hover:bg-gray-100 focus-visible:bg-gray-200 focus-visible:outline-none"
                            tabIndex={0}
                            role="menuitem"
                          >
                            {subItem.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              )}
            </svg>
          </button>

          {onOpenModal && (
            <Button3D onClick={onOpenModal} className="hidden md:block">
              Get a Quote
            </Button3D>
          )}
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-md p-4 space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-700 hover:text-gray-900"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
