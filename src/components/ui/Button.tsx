import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  children: ReactNode;
}

export default function Button({
  variant,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'rounded-[0.5rem] font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2';

  const variantClasses = {
    primary: `
      px-6 py-3
      bg-[#00F5A0]
      text-[#0A0E27]
      hover:brightness-110
      hover:scale-102
      active:scale-100
    `,
    secondary: `
      px-6 py-3
      bg-transparent
      border-2 border-[#00F5A0]
      text-[#00F5A0]
      hover:bg-[#00F5A010]
      active:bg-[#00F5A015]
    `,
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
