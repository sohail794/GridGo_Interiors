import { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export default function StaggerContainer({
  children,
  staggerDelay = 100,
  className = '',
  once = true,
}: StaggerContainerProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once });

  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {childArray.map((child, index) => (
        <div
          key={index}
          className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}
          style={isVisible ? { animationDelay: `${index * staggerDelay}ms` } : {}}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
