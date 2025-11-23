import { ReactNode } from 'react';

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  children: ReactNode;
  maxWidth?: MaxWidth;
  className?: string;
}

const maxWidthMap: Record<MaxWidth, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-[1400px]',
  full: 'max-w-full',
};

export default function Container({ 
  children, 
  maxWidth = 'xl',
  className = ''
}: ContainerProps) {
  return (
    <div className={`${maxWidthMap[maxWidth]} mx-auto px-4 sm:px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
