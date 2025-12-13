import { useEffect, useRef, useState, RefObject } from 'react';
import {
  applyRevealAnimation,
  applyStaggerReveal,
  createRevealObserver,
  prefersReducedMotion,
  type RevealAnimationName,
} from '../utils/scrollAnimations';

export interface ScrollRevealOptions {
  threshold?: number | number[];
  rootMargin?: string;
  animationName?: RevealAnimationName;
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
    threshold = 0.15,
    rootMargin = '0px 0px -100px 0px',
    animationName = 'fadeInUp',
    delay = 0,
    duration = 700,
    distance = 50,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    respectReducedMotion = true,
  } = options;

  useEffect(() => {
    const reducedMotion = respectReducedMotion && prefersReducedMotion();

    if (!ref.current) return;

    const element = ref.current;

    // If reduced motion, skip animation
    if (reducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = createRevealObserver(
      element,
      () => {
        if (hasAnimated) return;
        applyRevealAnimation(element, { delay, duration, distance, easing, animationName });
        setIsVisible(true);
        setHasAnimated(true);
      },
      { threshold, rootMargin, once: true }
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, threshold, rootMargin, animationName, delay, duration, distance, easing, respectReducedMotion, hasAnimated]);

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
    threshold = 0.15,
    rootMargin = '0px 0px -100px 0px',
    animationName = 'fadeInUp',
    delay = 0,
    duration = 700,
    distance = 50,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    respectReducedMotion = true,
    staggerDelay = 120,
    staggerDirection = 'forward',
  } = options;

  useEffect(() => {
    const reducedMotion = respectReducedMotion && prefersReducedMotion();

    if (!ref.current) return;

    const element = ref.current;
    const children = Array.from(element.children) as HTMLElement[];

    // If reduced motion, skip animation
    if (reducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = createRevealObserver(
      element,
      () => {
        if (hasAnimated) return;
        applyStaggerReveal(element, {
          delay,
          duration,
          distance,
          easing,
          staggerDelay,
          staggerDirection,
          animationName,
        });
        setIsVisible(true);
        setHasAnimated(true);
      },
      { threshold, rootMargin, once: true }
    );

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
    animationName,
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
    threshold = 0.15,
    rootMargin = '0px 0px -100px 0px',
    animationName = 'fadeInUp',
    delay = 0,
    duration = 700,
    distance = 50,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    respectReducedMotion = true,
    staggerDelay = 120,
  } = options;

  useEffect(() => {
    const reducedMotion = respectReducedMotion && prefersReducedMotion();

    if (!ref.current) return;

    const element = ref.current;
    const children = Array.from(element.children) as HTMLElement[];

    // If reduced motion, skip animation
    if (reducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = createRevealObserver(
      element,
      () => {
        if (hasAnimated) return;

        // Estimate grid columns (use CSS grid or fallback)
        const computedStyle = window.getComputedStyle(element);
        const gridTemplateColumns = computedStyle.gridTemplateColumns;
        const columnCount = gridTemplateColumns ? gridTemplateColumns.split(' ').length : 3;

        children.forEach((child, index) => {
          const row = Math.floor(index / columnCount);
          const col = index % columnCount;
          const waveIndex = row + col;
          const childDelay = delay + waveIndex * staggerDelay;

          applyRevealAnimation(child, { delay: childDelay, duration, distance, easing, animationName });
        });

        setIsVisible(true);
        setHasAnimated(true);
      },
      { threshold, rootMargin, once: true }
    );

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
    animationName,
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
    threshold = 0.15,
    rootMargin = '0px 0px -100px 0px',
    animationName = 'fadeInUp',
    delay = 0,
    duration = 700,
    distance = 50,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    respectReducedMotion = true,
    staggerDelay = 120,
  } = options;

  useEffect(() => {
    const reducedMotion = respectReducedMotion && prefersReducedMotion();

    if (!ref.current) return;

    const element = ref.current;

    // If reduced motion, skip animation
    if (reducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Calculate delay with stagger
    const totalDelay = delay + (itemIndex * staggerDelay);

    const observer = createRevealObserver(
      element,
      () => {
        if (hasAnimated) return;
        applyRevealAnimation(element, {
          delay: totalDelay,
          duration,
          distance,
          easing,
          animationName,
        });
        setIsVisible(true);
        setHasAnimated(true);
      },
      { threshold, rootMargin, once: true }
    );

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
    animationName,
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
