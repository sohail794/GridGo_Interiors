import { useEffect, useState } from 'react';

/**
 * Hook for scroll progress indicator
 * Returns scroll percentage (0-100)
 */
export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
      setProgress(Math.min(progress, 100));
    };

    // Initial calculation
    calculateProgress();

    // Use requestAnimationFrame for smooth updates
    let animationFrameId: number;
    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return progress;
};
