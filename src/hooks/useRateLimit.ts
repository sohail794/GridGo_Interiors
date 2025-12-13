import { useState, useCallback, useRef, useEffect } from 'react';

interface RateLimitOptions {
  maxAttempts: number; // Maximum number of attempts allowed
  windowMs: number; // Time window in milliseconds
  blockDurationMs?: number; // How long to block after exceeding limit
}

interface RateLimitResult {
  isAllowed: boolean;
  remainingAttempts: number;
  resetTime: number | null;
  recordAttempt: () => void;
  isBlocked: boolean;
}

/**
 * Hook for implementing rate limiting on form submissions
 * Prevents spam by limiting the number of submissions in a time window
 */
export function useRateLimit(options: RateLimitOptions): RateLimitResult {
  const { maxAttempts, windowMs, blockDurationMs = windowMs } = options;
  
  const [attempts, setAttempts] = useState<number[]>([]);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up old attempts outside the time window
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();
      setAttempts(prev => prev.filter(timestamp => now - timestamp < windowMs));
    };

    const interval = setInterval(cleanup, 1000);
    return () => clearInterval(interval);
  }, [windowMs]);

  // Clear block timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const isBlocked = useCallback(() => {
    if (!blockedUntil) return false;
    const now = Date.now();
    if (now < blockedUntil) return true;
    
    // Block expired, clear it
    setBlockedUntil(null);
    return false;
  }, [blockedUntil]);

  const recordAttempt = useCallback(() => {
    const now = Date.now();
    const recentAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      // Block the user
      const blockUntil = now + blockDurationMs;
      setBlockedUntil(blockUntil);
      
      // Set timer to unblock
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setBlockedUntil(null);
        setAttempts([]);
      }, blockDurationMs);
    } else {
      setAttempts([...recentAttempts, now]);
    }
  }, [attempts, maxAttempts, windowMs, blockDurationMs]);

  const now = Date.now();
  const recentAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
  const remainingAttempts = Math.max(0, maxAttempts - recentAttempts.length);
  const isCurrentlyBlocked = isBlocked();

  return {
    isAllowed: !isCurrentlyBlocked && remainingAttempts > 0,
    remainingAttempts,
    resetTime: blockedUntil,
    recordAttempt,
    isBlocked: isCurrentlyBlocked,
  };
}
