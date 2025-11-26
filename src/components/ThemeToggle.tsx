import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'dark' | 'light';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Default to dark mode (as per requirement)
      setTheme('dark');
    }
  }, []);

  // Apply theme changes to DOM
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    
    // Persist to localStorage
    localStorage.setItem('theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0e27' : '#F7F9FB');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className={`
          w-10 h-10 rounded-full
          flex items-center justify-center
          bg-white/5 border border-white/10
          ${className}
        `}
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-5 h-5 rounded-full bg-white/20 animate-pulse" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }}
      className={`
        relative w-10 h-10 rounded-full
        flex items-center justify-center
        bg-white/5 dark:bg-white/5 light:bg-gray-100
        border border-white/10 dark:border-white/10 light:border-gray-200
        hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27] dark:focus-visible:ring-offset-[#0a0e27] light:focus-visible:ring-offset-white
        transition-all duration-200 ease-out
        group
        ${className}
      `}
      aria-pressed={theme === 'dark'}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
    >
      {/* Sun icon - shown in dark mode */}
      <Sun 
        size={18}
        className={`
          absolute
          transition-all duration-300 ease-out
          text-amber-400
          ${theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-90 scale-50'
          }
        `}
        aria-hidden="true"
      />
      
      {/* Moon icon - shown in light mode */}
      <Moon 
        size={18}
        className={`
          absolute
          transition-all duration-300 ease-out
          text-slate-600
          ${theme === 'light' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-50'
          }
        `}
        aria-hidden="true"
      />

      {/* Hover glow effect */}
      <span 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-amber-400/10 to-orange-400/10 dark:from-amber-400/10 dark:to-orange-400/10"
        aria-hidden="true"
      />
    </button>
  );
}
