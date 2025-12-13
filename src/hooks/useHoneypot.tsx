import { useState, useCallback } from 'react';

/**
 * Hook for honeypot spam protection
 * If the honeypot field is filled, it's likely a bot
 */
export function useHoneypot() {
  const [honeypotValue, setHoneypotValue] = useState('');

  const isSpam = useCallback(() => {
    // If the honeypot field has a value, it's likely spam
    return honeypotValue.length > 0;
  }, [honeypotValue]);

  const HoneypotField = () => (
    <div 
      aria-hidden="true" 
      style={{ 
        position: 'absolute', 
        left: '-9999px', 
        top: '-9999px',
        opacity: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <label htmlFor="website_url">Website (leave blank)</label>
      <input
        type="text"
        id="website_url"
        name="website_url"
        value={honeypotValue}
        onChange={(e) => setHoneypotValue(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );

  return {
    isSpam,
    HoneypotField,
    honeypotValue,
  };
}
