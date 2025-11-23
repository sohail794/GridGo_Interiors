import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Button3DProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

export default function Button3D({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}: Button3DProps) {
  const baseClasses = 'font-semibold uppercase tracking-wide rounded-xl transition-all duration-200 ease-out inline-flex items-center justify-center gap-2 focus-ring';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-br from-[#00ff88] to-[#00b894]
      text-[#0a0e27]
      shadow-3d
      hover:shadow-3d-hover hover:scale-105 hover:-translate-y-1
      active:translate-y-0 active:scale-95
      active:shadow-3d
    `,
    secondary: `
      bg-gradient-to-br from-[#00d9ff] to-[#0088cc]
      text-[#0a0e27]
      shadow-[0_1px_2px_rgba(0,217,255,0.2),0_4px_8px_rgba(0,217,255,0.15),0_8px_16px_rgba(0,217,255,0.1),0_16px_32px_rgba(0,217,255,0.05)]
      hover:shadow-[0_2px_4px_rgba(0,217,255,0.4),0_8px_16px_rgba(0,217,255,0.3),0_16px_32px_rgba(0,217,255,0.2),0_32px_64px_rgba(0,217,255,0.1),0_0_80px_rgba(0,217,255,0.3)]
      hover:scale-105 hover:-translate-y-1
      active:translate-y-0 active:scale-95
    `,
    ghost: `
      bg-transparent
      border-2 border-[#00ff88]
      text-[#00ff88]
      hover:border-[#00d9ff]
      hover:text-[#00d9ff]
      hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]
      hover:bg-[rgba(0,255,136,0.1)]
      hover:scale-105 hover:-translate-y-1
      active:scale-95 active:translate-y-0
    `,
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
