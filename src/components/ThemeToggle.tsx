import { useState, useEffect, useRef, useId } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import {
  type Theme,
  type ResolvedTheme,
  getInitialTheme,
  applyTheme,
  saveTheme,
  resolveTheme,
  getThemeLabel,
  cycleTheme,
  setupSystemThemeListener,
  prefersReducedMotion,
} from '../lib/theme';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [announceMessage, setAnnounceMessage] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const announceId = useId();

  // Initialize theme from storage
  useEffect(() => {
    setMounted(true);
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    setResolvedTheme(resolveTheme(initialTheme));
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;
    
    applyTheme(theme);
    saveTheme(theme);
    setResolvedTheme(resolveTheme(theme));
  }, [theme, mounted]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const cleanup = setupSystemThemeListener(() => {
      setResolvedTheme(resolveTheme('system'));
      applyTheme('system');
    });

    return cleanup;
  }, [theme, mounted]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isDropdownOpen]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsDropdownOpen(false);
    
    // Announce change for screen readers
    const label = getThemeLabel(newTheme);
    setAnnounceMessage(`Theme changed to ${label}`);
    
    // Clear message after announcement
    setTimeout(() => setAnnounceMessage(''), 1000);
  };

  const handleButtonClick = () => {
    // On click, cycle through themes
    const nextTheme = cycleTheme(theme);
    handleThemeChange(nextTheme);
  };

  const handleButtonContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleButtonClick();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setIsDropdownOpen(true);
    }
  };

  const reduceMotion = mounted && prefersReducedMotion();

  // Label for accessibility
  const iconLabel = theme === 'system' 
    ? `System (${resolvedTheme})` 
    : getThemeLabel(theme);

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
    <div className={`relative ${className}`}>
      {/* Screen reader announcement region */}
      <div
        id={announceId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announceMessage}
      </div>

      {/* Main toggle button */}
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        onContextMenu={handleButtonContextMenu}
        onKeyDown={handleKeyDown}
        className={`
          relative w-10 h-10 min-w-[44px] min-h-[44px] rounded-full
          flex items-center justify-center
          bg-white/5 dark:bg-white/5
          border border-white/10 dark:border-white/10
          hover:bg-white/10 dark:hover:bg-white/10
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald 
          focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27] dark:focus-visible:ring-offset-[#0a0e27]
          transition-all duration-200 ease-out
          group
          .light & {
            bg-gray-100 border-gray-200 hover:bg-gray-200
            focus-visible:ring-offset-white
          }
        `}
        aria-label={`Current theme: ${iconLabel}. Click to switch theme, right-click for options.`}
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
        aria-describedby={announceId}
        title={`Theme: ${iconLabel} (click to cycle, right-click for menu)`}
      >
        {/* Sun icon - shown when in dark mode (to switch to light) */}
        <Sun 
          size={18}
          className={`
            absolute
            text-amber-400
            ${reduceMotion ? '' : 'transition-all duration-300 ease-out'}
            ${resolvedTheme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-50'
            }
          `}
          aria-hidden="true"
        />
        
        {/* Moon icon - shown when in light mode (to switch to dark) */}
        <Moon 
          size={18}
          className={`
            absolute
            text-slate-600
            ${reduceMotion ? '' : 'transition-all duration-300 ease-out'}
            ${resolvedTheme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-50'
            }
          `}
          aria-hidden="true"
        />

        {/* System indicator dot */}
        {theme === 'system' && (
          <span 
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-emerald rounded-full border-2 border-[#0a0e27] dark:border-[#0a0e27]"
            aria-hidden="true"
            title="Using system theme"
          />
        )}

        {/* Hover glow effect */}
        <span 
          className={`
            absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
            ${reduceMotion ? '' : 'transition-opacity duration-200'}
            bg-gradient-to-r from-amber-400/10 to-orange-400/10
          `}
          aria-hidden="true"
        />
      </button>

      {/* Optional label */}
      {showLabel && (
        <span className="ml-2 text-sm text-gray-400">
          {iconLabel}
        </span>
      )}

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          role="listbox"
          aria-label="Theme options"
          className={`
            absolute top-full right-0 mt-2 w-36 
            bg-[#141b2d] dark:bg-[#141b2d] 
            border border-white/10 rounded-lg shadow-xl
            py-1 z-50
            ${reduceMotion ? '' : 'animate-fade-in-down'}
          `}
        >
          {(['dark', 'light', 'system'] as Theme[]).map((option) => {
            const isSelected = theme === option;
            const Icon = option === 'dark' ? Moon : option === 'light' ? Sun : Monitor;
            
            return (
              <button
                key={option}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleThemeChange(option)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 text-sm
                  transition-colors duration-150
                  focus-visible:outline-none focus-visible:bg-white/10
                  ${isSelected 
                    ? 'bg-brand-emerald/10 text-brand-emerald' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{getThemeLabel(option)}</span>
                {isSelected && (
                  <span className="ml-auto text-brand-emerald" aria-hidden="true">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
