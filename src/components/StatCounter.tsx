import { useRef } from 'react';
import { useCountUpInView } from '../hooks/useCountUp';

interface StatCounterProps {
  value: string;
  label: string;
  index?: number;
}

export default function StatCounter({ value, label, index = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parse the numeric value and suffix (e.g., "20+" -> 20, "+")
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? numericMatch[2] : '';
  
  const { displayValue, isVisible } = useCountUpInView(numericValue, ref, {
    duration: 2000,
    delay: index * 150,
    easing: 'ease-out-cubic',
    threshold: 0.3,
  });

  return (
    <div ref={ref} className="text-center p-6 md:p-8">
      <div 
        className={`text-4xl sm:text-5xl md:text-display-md font-bold gradient-text mb-3 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {displayValue}{suffix}
      </div>
      <div className="text-body-sm text-text-tertiary uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
}
