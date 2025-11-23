import { useEffect, useState } from 'react';

/**
 * Hook to detect when element reaches 50% scroll position
 * Returns whether element is in view and scroll progress
 */
export const useScrollIntoView = (): { scrollProgress: number; isVisible: boolean } => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
      setIsVisible(progress > 10); // Visible after 10% scroll
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollProgress, isVisible };
};
