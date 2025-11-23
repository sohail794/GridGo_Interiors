import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={alignClass}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
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
