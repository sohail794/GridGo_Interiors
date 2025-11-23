import { useState, useEffect } from 'react';

interface PageTransitionProps {
  isVisible: boolean;
}

/**
 * Page Transition wrapper for smooth page entrance/exit animations
 * Used to fade in/out pages when navigating between routes
 */
export default function PageTransition({ isVisible }: PageTransitionProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        animation: isVisible ? 'fadeIn 400ms ease-out forwards' : 'fadeOut 300ms ease-in forwards',
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.8) 0%, rgba(26, 31, 58, 0.6) 100%)',
      }}
      aria-hidden="true"
    />
  );
}
