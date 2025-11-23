import { useEffect, useRef, useState, RefObject } from 'react';

export interface ScrollRevealOptions {
  threshold?: number | number[];
  rootMargin?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  easing?: string;
  respectReducedMotion?: boolean;
}

export interface StaggerOptions extends ScrollRevealOptions {
  staggerDelay?: number;
  staggerDirection?: 'forward' | 'backward';
}

/**
 * Hook for triggering animations when elements come into view
 * Automatically handles prefers-reduced-motion
 */
export const useScrollReveal = (
  ref: RefObject<HTMLElement>,
  options: ScrollRevealOptions = {}
): { isVisible: boolean; hasAnimated: boolean } => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    threshold = 0.2,
    rootMargin = '0px',
    delay = 0,
    duration = 600,
    distance = 30,
    easing = 'ease-out',
    respectReducedMotion = true,
  } = options;

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = respectReducedMotion && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!ref.current) return;

    const element = ref.current;

    // If reduced motion, skip animation
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Apply animation styles
            element.style.animation = `fadeInUp ${duration}ms ${easing} ${delay}ms forwards`;
            element.style.setProperty('--reveal-distance', `${distance}px`);
            
            setIsVisible(true);
            setHasAnimated(true);
            
            // Unobserve after animation
            observer.unobserve(element);
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
  }, [ref, threshold, rootMargin, delay, duration, distance, easing, respectReducedMotion, hasAnimated]);

  return { isVisible, hasAnimated };
};

/**
 * Hook for staggering animations across multiple child elements
 * Automatically applies staggered delays to each element
 */
export const useScrollRevealStagger = (
  ref: RefObject<HTMLElement>,
  options: StaggerOptions = {}
): { isVisible: boolean; hasAnimated: boolean } => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    threshold = 0.2,
    rootMargin = '0px',
    delay = 0,
    duration = 600,
    distance = 30,
    easing = 'ease-out',
    respectReducedMotion = true,
    staggerDelay = 50,
    staggerDirection = 'forward',
  } = options;

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = respectReducedMotion && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!ref.current) return;

    const element = ref.current;
    const children = Array.from(element.children) as HTMLElement[];

    // If reduced motion, skip animation
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Apply staggered animations to children
            children.forEach((child, index) => {
              const staggerIndex = staggerDirection === 'backward' 
                ? children.length - 1 - index 
                : index;
              
              const childDelay = delay + (staggerIndex * staggerDelay);
              
              child.style.animation = `fadeInUp ${duration}ms ${easing} ${childDelay}ms forwards`;
              child.style.setProperty('--reveal-distance', `${distance}px`);
            });
            
            setIsVisible(true);
            setHasAnimated(true);
            
            // Unobserve after animation
            observer.unobserve(element);
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
  }, [
    ref,
    threshold,
    rootMargin,
    delay,
    duration,
    distance,
    easing,
    respectReducedMotion,
    hasAnimated,
    staggerDelay,
    staggerDirection,
  ]);

  return { isVisible, hasAnimated };
};

/**
 * Hook for wave-like stagger animations (offset based on position)
 * Creates a wave effect starting from top-left
 */
export const useScrollRevealWave = (
  ref: RefObject<HTMLElement>,
  options: StaggerOptions = {}
): { isVisible: boolean; hasAnimated: boolean } => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    threshold = 0.2,
    rootMargin = '0px',
    delay = 0,
    duration = 600,
    distance = 30,
    easing = 'ease-out',
    respectReducedMotion = true,
    staggerDelay = 50,
  } = options;

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = respectReducedMotion && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!ref.current) return;

    const element = ref.current;
    const children = Array.from(element.children) as HTMLElement[];

    // If reduced motion, skip animation
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Get grid properties for wave calculation
            const containerRect = element.getBoundingClientRect();
            const containerWidth = element.offsetWidth;
            const containerHeight = element.offsetHeight;
            
            // Estimate grid columns (use CSS grid or fallback)
            const computedStyle = window.getComputedStyle(element);
            const gridTemplateColumns = computedStyle.gridTemplateColumns;
            const columnCount = gridTemplateColumns 
              ? gridTemplateColumns.split(' ').length 
              : 3; // Fallback to 3-column grid

            // Apply wave stagger animations to children
            children.forEach((child, index) => {
              // Calculate row and column
              const row = Math.floor(index / columnCount);
              const col = index % columnCount;
              
              // Calculate wave distance (diagonal distance from top-left)
              const distance = row + col;
              const childDelay = delay + (distance * staggerDelay);
              
              child.style.animation = `fadeInUp ${duration}ms ${easing} ${childDelay}ms forwards`;
              child.style.setProperty('--reveal-distance', `${distance}px`);
            });
            
            setIsVisible(true);
            setHasAnimated(true);
            
            // Unobserve after animation
            observer.unobserve(element);
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
  }, [
    ref,
    threshold,
    rootMargin,
    delay,
    duration,
    distance,
    easing,
    respectReducedMotion,
    hasAnimated,
    staggerDelay,
  ]);

  return { isVisible, hasAnimated };
};

/**
 * Hook to animate individual elements with delay
 * Used for form fields, list items, etc.
 */
export const useScrollRevealItem = (
  ref: RefObject<HTMLElement>,
  itemIndex: number = 0,
  options: ScrollRevealOptions & { staggerDelay?: number } = {}
): { isVisible: boolean; hasAnimated: boolean } => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    threshold = 0.2,
    rootMargin = '0px',
    delay = 0,
    duration = 600,
    distance = 30,
    easing = 'ease-out',
    respectReducedMotion = true,
    staggerDelay = 50,
  } = options;

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = respectReducedMotion && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!ref.current) return;

    const element = ref.current;

    // If reduced motion, skip animation
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Calculate delay with stagger
    const totalDelay = delay + (itemIndex * staggerDelay);

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Apply animation with staggered delay
            element.style.animation = `fadeInUp ${duration}ms ${easing} ${totalDelay}ms forwards`;
            element.style.setProperty('--reveal-distance', `${distance}px`);
            
            setIsVisible(true);
            setHasAnimated(true);
            
            // Unobserve after animation
            observer.unobserve(element);
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
  }, [
    ref,
    itemIndex,
    threshold,
    rootMargin,
    delay,
    duration,
    distance,
    easing,
    respectReducedMotion,
    hasAnimated,
    staggerDelay,
  ]);

  return { isVisible, hasAnimated };
};
