import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Insights', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="text-2xl font-serif font-bold text-emerald italic">
              GridGo <span className="text-silver">Interiors</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-sans font-semibold transition-colors ${
                  currentPage === item.page
                    ? 'text-emerald'
                    : 'text-charcoal hover:text-emerald'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => onNavigate('contact')}
            className="hidden md:block bg-emerald text-white px-6 py-3 rounded-md font-sans font-semibold hover:bg-emerald-dark transition-colors"
          >
            Quote Now
          </button>

          <button
            className="md:hidden text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-silver-light">
          <nav className="px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-md font-sans font-semibold transition-colors ${
                  currentPage === item.page
                    ? 'bg-emerald text-white'
                    : 'text-charcoal hover:bg-silver-light'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="block w-full bg-emerald text-white px-4 py-3 rounded-md font-sans font-semibold"
            >
              Quote Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
