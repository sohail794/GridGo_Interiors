import { useCallback, useRef, useEffect } from 'react';

type Politeness = 'polite' | 'assertive';

/**
 * Hook for announcing messages to screen readers
 * Uses ARIA live regions for accessibility
 */
export function useAnnouncer() {
  const politeRef = useRef<HTMLDivElement | null>(null);
  const assertiveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create live regions if they don't exist
    if (!document.getElementById('sr-polite')) {
      const polite = document.createElement('div');
      polite.id = 'sr-polite';
      polite.setAttribute('aria-live', 'polite');
      polite.setAttribute('aria-atomic', 'true');
      polite.className = 'sr-only';
      document.body.appendChild(polite);
      politeRef.current = polite;
    } else {
      politeRef.current = document.getElementById('sr-polite') as HTMLDivElement;
    }

    if (!document.getElementById('sr-assertive')) {
      const assertive = document.createElement('div');
      assertive.id = 'sr-assertive';
      assertive.setAttribute('aria-live', 'assertive');
      assertive.setAttribute('aria-atomic', 'true');
      assertive.className = 'sr-only';
      document.body.appendChild(assertive);
      assertiveRef.current = assertive;
    } else {
      assertiveRef.current = document.getElementById('sr-assertive') as HTMLDivElement;
    }

    return () => {
      // Cleanup is optional - we can leave the regions for reuse
    };
  }, []);

  const announce = useCallback((message: string, politeness: Politeness = 'polite') => {
    const region = politeness === 'assertive' ? assertiveRef.current : politeRef.current;
    
    if (region) {
      // Clear and set the message to ensure it's announced
      region.textContent = '';
      // Small delay to ensure screen readers pick up the change
      setTimeout(() => {
        region.textContent = message;
      }, 50);
    }
  }, []);

  const announcePolite = useCallback((message: string) => {
    announce(message, 'polite');
  }, [announce]);

  const announceAssertive = useCallback((message: string) => {
    announce(message, 'assertive');
  }, [announce]);

  return {
    announce,
    announcePolite,
    announceAssertive,
  };
}

/**
 * Announce form errors to screen readers
 */
export function announceFormErrors(errors: Record<string, string | undefined>) {
  const errorMessages = Object.values(errors).filter(Boolean);
  if (errorMessages.length === 0) return;

  const region = document.getElementById('sr-assertive');
  if (region) {
    const message = errorMessages.length === 1 
      ? `Error: ${errorMessages[0]}`
      : `${errorMessages.length} errors: ${errorMessages.join('. ')}`;
    
    region.textContent = '';
    setTimeout(() => {
      region.textContent = message;
    }, 50);
  }
}

/**
 * Announce form submission status
 */
export function announceFormStatus(status: 'submitting' | 'success' | 'error', customMessage?: string) {
  const messages = {
    submitting: 'Submitting form, please wait...',
    success: customMessage || 'Form submitted successfully!',
    error: customMessage || 'Form submission failed. Please try again.',
  };

  const region = document.getElementById('sr-polite');
  if (region) {
    region.textContent = '';
    setTimeout(() => {
      region.textContent = messages[status];
    }, 50);
  }
}
