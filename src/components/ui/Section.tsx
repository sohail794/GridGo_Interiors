import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
  sm: 'py-section-sm md:py-section-md',
  md: 'py-section-sm md:py-section-md',
  lg: 'py-section-md md:py-section-lg',
  xl: 'py-section-lg md:py-section-xl',
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
  const prefersReducedMotion = useReducedMotion();

  const baseClassName = `
    ${spacingMap[spacing]}
    ${backgroundMap[background]}
    ${className}
  `;

  if (!animate || prefersReducedMotion) {
    return (
      <section className={baseClassName} id={id}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      className={baseClassName}
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
