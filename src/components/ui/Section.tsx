import { ReactNode } from 'react';

type Spacing = 'sm' | 'md' | 'lg' | 'xl';
type Background = 'primary' | 'secondary' | 'gradient' | 'none';

interface SectionProps {
  children: ReactNode;
  spacing?: Spacing;
  background?: Background;
  className?: string;
  id?: string;
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
}: SectionProps) {
  return (
    <section className={`${spacingMap[spacing]} ${backgroundMap[background]} ${className}`} id={id}>
      {children}
    </section>
  );
}
