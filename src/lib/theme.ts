/**
 * Theme Management Utility
 * 
 * Provides a complete theme system with:
 * - Three modes: dark (default), light, system
 * - localStorage + cookie fallback persistence
 * - Event emitter for change notifications
 * - SSR-safe initialization
 */

export type Theme = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

type ThemeChangeCallback = (theme: Theme, resolvedTheme: ResolvedTheme) => void;

// Event listeners for theme changes
const listeners: Set<ThemeChangeCallback> = new Set();

// Media query for system preference
let mediaQuery: MediaQueryList | null = null;

/**
 * Get the system's preferred color scheme
 */
export function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get stored theme from localStorage or cookie
 */
export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  
  try {
    // Try localStorage first
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored && ['dark', 'light', 'system'].includes(stored)) {
      return stored;
    }
    
    // Cookie fallback
    const cookieMatch = document.cookie.match(/(?:^|; )theme=([^;]+)/);
    if (cookieMatch && ['dark', 'light', 'system'].includes(cookieMatch[1])) {
      return cookieMatch[1] as Theme;
    }
  } catch (e) {
    // Ignore errors (e.g., localStorage disabled)
  }
  
  return null;
}

/**
 * Get the initial theme (with dark default for first-time visitors)
 */
export function getInitialTheme(): Theme {
  const stored = getStoredTheme();
  
  // If user has explicitly chosen a theme, respect it
  if (stored) return stored;
  
  // Default to dark for first-time visitors (per brief)
  return 'dark';
}

/**
 * Resolve a theme preference to an actual theme (dark or light)
 */
export function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Apply theme to the document
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  
  const resolved = resolveTheme(theme);
  const root = document.documentElement;
  
  // Add transition class (will be removed after transition completes)
  if (!prefersReducedMotion()) {
    root.classList.add('theme-transition');
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);
  }
  
  // Apply the resolved theme
  if (resolved === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
  
  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', resolved === 'dark' ? '#0a0e27' : '#F7F9FB');
  }
  
  // Notify listeners
  notifyListeners(theme, resolved);
  
  // Emit analytics event
  emitAnalyticsEvent(theme, resolved);
}

/**
 * Save theme preference to localStorage and cookie
 */
export function saveTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Cookie fallback (1 year expiry)
    document.cookie = `theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Subscribe to theme changes
 * Returns an unsubscribe function
 */
export function onThemeChange(callback: ThemeChangeCallback): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/**
 * Notify all listeners of theme change
 */
function notifyListeners(theme: Theme, resolvedTheme: ResolvedTheme): void {
  listeners.forEach((callback) => {
    try {
      callback(theme, resolvedTheme);
    } catch (e) {
      console.error('Theme change callback error:', e);
    }
  });
}

/**
 * Emit analytics event for theme change
 */
function emitAnalyticsEvent(theme: Theme, resolvedTheme: ResolvedTheme): void {
  if (typeof window === 'undefined') return;
  
  // Google Analytics / GTM
  if ('dataLayer' in window && Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push({
      event: 'theme_change',
      theme,
      resolvedTheme,
    });
  }
  
  // Custom event for other listeners
  window.dispatchEvent(new CustomEvent('themechange', {
    detail: { theme, resolvedTheme }
  }));
}

/**
 * Setup system theme change listener
 */
export function setupSystemThemeListener(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = () => callback();
  
  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery?.removeEventListener('change', handler);
  }
  
  // Legacy browsers
  mediaQuery.addListener(handler);
  return () => mediaQuery?.removeListener(handler);
}

/**
 * Cycle through themes: dark → light → system → dark
 */
export function cycleTheme(current: Theme): Theme {
  const order: Theme[] = ['dark', 'light', 'system'];
  const currentIndex = order.indexOf(current);
  return order[(currentIndex + 1) % order.length];
}

/**
 * Get a human-readable label for a theme
 */
export function getThemeLabel(theme: Theme): string {
  switch (theme) {
    case 'dark':
      return 'Dark';
    case 'light':
      return 'Light';
    case 'system':
      return 'System';
    default:
      return theme;
  }
}
