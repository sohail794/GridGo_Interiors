import { ReactNode, useEffect, useRef, useState } from 'react';

type Spacing = 'sm' | 'md' | 'lg' | 'xl';
type Background = 'primary' | 'secondary' | 'gradient' | 'none';

interface SectionProps {
  children: ReactNode;
  spacing?: Spacing;
  background?: Background;
  className?: string;
  id?: string;
  animate?: boolean;
}

const spacingMap: Record<Spacing, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
  xl: 'py-32 md:py-40',
};

const backgroundMap: Record<Background, string> = {
  primary: 'bg-background-primary',
  secondary: 'bg-background-secondary',
  gradient: 'bg-gradient-to-b from-background-secondary to-background-primary',
  none: '',
};

export default function Section({
  children,
  spacing = 'md',
  background = 'none',
  className = '',
  id,
  animate = true,
}: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!animate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animate]);

  return (
    <section
      ref={ref}
      className={`
        ${spacingMap[spacing]}
        ${backgroundMap[background]}
        ${animate && isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        ${className}
      `}
      id={id}
    >
      {children}
    </section>
  );
}
