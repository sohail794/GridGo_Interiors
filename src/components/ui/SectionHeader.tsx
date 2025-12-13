import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
  id?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  id,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={alignClass}>
      <h2 
        id={id}
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-text-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
