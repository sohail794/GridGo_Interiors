import { useEffect, useRef, useState, RefObject } from 'react';

export interface CountUpOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  start?: number;
  decimals?: number;
  respectReducedMotion?: boolean;
  onComplete?: () => void;
}

export interface CountUpInViewOptions extends CountUpOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook for animating counting effects
 * Used for stats, testimonial numbers, etc.
 */
export const useCountUp = (
  targetNumber: number,
  options: CountUpOptions = {}
): { displayValue: number | string; isAnimating: boolean } => {
  const [displayValue, setDisplayValue] = useState<number | string>(
    options.start || 0
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  const {
    duration = 1000,
    delay = 0,
    easing = 'ease-out',
    start = 0,
    decimals = 0,
    respectReducedMotion = true,
    onComplete,
  } = options;

  // Easing functions
  const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

  const getEasingFunction = (easingName: string) => {
    switch (easingName) {
      case 'ease-out':
        return easeOutQuad;
      case 'ease-in-out':
        return easeInOutQuad;
      case 'ease-out-cubic':
        return easeOutCubic;
      default:
        return easeOutQuad;
    }
  };

  const animate = () => {
    if (!startTimeRef.current) return;

    const now = Date.now();
    const elapsed = now - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    const easeFn = getEasingFunction(easing);
    const easedProgress = easeFn(progress);

    const newValue = start + (targetNumber - start) * easedProgress;
    setDisplayValue(
      decimals > 0
        ? newValue.toFixed(decimals)
        : Math.round(newValue)
    );

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      setDisplayValue(
        decimals > 0
          ? targetNumber.toFixed(decimals)
          : Math.round(targetNumber)
      );
      onComplete?.();
    }
  };

  useEffect(() => {
    const prefersReducedMotion = respectReducedMotion && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Skip animation if reduced motion or already animated
    if (prefersReducedMotion || hasAnimatedRef.current) {
      setDisplayValue(
        decimals > 0
          ? targetNumber.toFixed(decimals)
          : Math.round(targetNumber)
      );
      return;
    }

    const timeoutId = setTimeout(() => {
      hasAnimatedRef.current = true;
      setIsAnimating(true);
      startTimeRef.current = Date.now();
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetNumber, duration, delay, easing, start, decimals, respectReducedMotion, onComplete]);

  return { displayValue, isAnimating };
};

/**
 * Hook for counting animations triggered when element comes into view
 * Automatically handles scroll visibility detection
 */
export const useCountUpInView = (
  targetNumber: number,
  ref: RefObject<HTMLElement>,
  options: CountUpInViewOptions = {}
): { displayValue: number | string; isVisible: boolean; isAnimating: boolean } => {
  const [displayValue, setDisplayValue] = useState<number | string>(
    options.start || 0
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    duration = 1000,
    delay = 0,
    easing = 'ease-out',
    start = 0,
    decimals = 0,
    respectReducedMotion = true,
    onComplete,
    threshold = 0.5,
    rootMargin = '0px',
  } = options;

  // Easing functions
  const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

  const getEasingFunction = (easingName: string) => {
    switch (easingName) {
      case 'ease-out':
        return easeOutQuad;
      case 'ease-in-out':
        return easeInOutQuad;
      case 'ease-out-cubic':
        return easeOutCubic;
      default:
        return easeOutQuad;
    }
  };

  const animate = () => {
    if (!startTimeRef.current) return;

    const now = Date.now();
    const elapsed = now - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    const easeFn = getEasingFunction(easing);
    const easedProgress = easeFn(progress);

    const newValue = start + (targetNumber - start) * easedProgress;
    setDisplayValue(
      decimals > 0
        ? newValue.toFixed(decimals)
        : Math.round(newValue)
    );

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      setDisplayValue(
        decimals > 0
          ? targetNumber.toFixed(decimals)
          : Math.round(targetNumber)
      );
      onComplete?.();
    }
  };

  // Setup scroll detection
  useEffect(() => {
    const prefersReducedMotion = respectReducedMotion && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!ref.current) return;

    const element = ref.current;

    if (prefersReducedMotion) {
      setDisplayValue(
        decimals > 0
          ? targetNumber.toFixed(decimals)
          : Math.round(targetNumber)
      );
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);

            // Start counting animation
            const timeoutId = setTimeout(() => {
              setIsAnimating(true);
              startTimeRef.current = Date.now();
              animationRef.current = requestAnimationFrame(animate);
            }, delay);

            return () => clearTimeout(timeoutId);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, threshold, rootMargin, respectReducedMotion, targetNumber, decimals, delay, duration, easing, start, hasAnimated, onComplete]);

  return { displayValue, isVisible, isAnimating };
};

/**
 * Hook for multiple counters with staggered start times
 */
export const useCountUpStagger = (
  targets: number[],
  ref: RefObject<HTMLElement>,
  itemIndex: number = 0,
  options: CountUpInViewOptions & { staggerDelay?: number } = {}
): { displayValue: number | string; isVisible: boolean; isAnimating: boolean } => {
  const [displayValue, setDisplayValue] = useState<number | string>(
    options.start || 0
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const targetNumber = targets[itemIndex] || 0;

  const {
    duration = 1000,
    delay = 0,
    easing = 'ease-out',
    start = 0,
    decimals = 0,
    respectReducedMotion = true,
    onComplete,
    threshold = 0.5,
    rootMargin = '0px',
    staggerDelay = 100,
  } = options;

  // Easing functions
  const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

  const getEasingFunction = (easingName: string) => {
    switch (easingName) {
      case 'ease-out':
        return easeOutQuad;
      case 'ease-in-out':
        return easeInOutQuad;
      case 'ease-out-cubic':
        return easeOutCubic;
      default:
        return easeOutQuad;
    }
  };

  const animate = () => {
    if (!startTimeRef.current) return;

    const now = Date.now();
    const elapsed = now - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    const easeFn = getEasingFunction(easing);
    const easedProgress = easeFn(progress);

    const newValue = start + (targetNumber - start) * easedProgress;
    setDisplayValue(
      decimals > 0
        ? newValue.toFixed(decimals)
        : Math.round(newValue)
    );

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      setDisplayValue(
        decimals > 0
          ? targetNumber.toFixed(decimals)
          : Math.round(targetNumber)
      );
      onComplete?.();
    }
  };

  // Setup scroll detection with stagger
  useEffect(() => {
    const prefersReducedMotion = respectReducedMotion && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!ref.current) return;

    const element = ref.current;

    if (prefersReducedMotion) {
      setDisplayValue(
        decimals > 0
          ? targetNumber.toFixed(decimals)
          : Math.round(targetNumber)
      );
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);

            // Start counting animation with staggered delay
            const totalDelay = delay + (itemIndex * staggerDelay);
            const timeoutId = setTimeout(() => {
              setIsAnimating(true);
              startTimeRef.current = Date.now();
              animationRef.current = requestAnimationFrame(animate);
            }, totalDelay);

            return () => clearTimeout(timeoutId);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, threshold, rootMargin, respectReducedMotion, targetNumber, decimals, delay, duration, easing, start, hasAnimated, onComplete, itemIndex, staggerDelay]);

  return { displayValue, isVisible, isAnimating };
};
