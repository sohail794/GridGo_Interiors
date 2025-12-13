export type RevealAnimationName = 'fadeInUp' | 'revealImageScale';

export interface RevealAnimationOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  distance?: number;
  easing?: string;
  respectReducedMotion?: boolean;
  animationName?: RevealAnimationName;
}

export interface StaggerRevealOptions extends RevealAnimationOptions {
  staggerDelay?: number;
  staggerDirection?: 'forward' | 'backward';
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function applyRevealAnimation(element: HTMLElement, options: RevealAnimationOptions): void {
  const {
    delay = 0,
    duration = 700,
    distance = 50,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    animationName = 'fadeInUp',
  } = options;

  element.style.setProperty('--reveal-distance', `${distance}px`);
  element.style.animation = `${animationName} ${duration}ms ${easing} ${delay}ms forwards`;
}

export function createRevealObserver(
  element: HTMLElement,
  onEnter: () => void,
  options: Pick<RevealAnimationOptions, 'threshold' | 'rootMargin' | 'once'> = {}
): IntersectionObserver {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -100px 0px',
    once = true,
  } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        onEnter();
        if (once) observer.unobserve(element);
      });
    },
    { threshold, rootMargin }
  );

  observer.observe(element);
  return observer;
}

export function applyStaggerReveal(container: HTMLElement, options: StaggerRevealOptions): void {
  const {
    delay = 0,
    duration = 700,
    distance = 50,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    staggerDelay = 120,
    staggerDirection = 'forward',
    animationName = 'fadeInUp',
  } = options;

  const children = Array.from(container.children) as HTMLElement[];

  children.forEach((child, index) => {
    const staggerIndex = staggerDirection === 'backward' ? children.length - 1 - index : index;
    const childDelay = delay + staggerIndex * staggerDelay;

    child.style.setProperty('--reveal-distance', `${distance}px`);
    child.style.animation = `${animationName} ${duration}ms ${easing} ${childDelay}ms forwards`;
  });
}
