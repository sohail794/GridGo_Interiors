import { SelectHTMLAttributes } from 'react';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options?: { value: string; label: string }[];
}

export default function FormSelect({ error, options, className = '', children, ...props }: FormSelectProps) {
  return (
    <div className="w-full">
      <select
        {...props}
        className={`
          w-full px-4 py-3 min-h-[44px]
          bg-white/5 border border-white/10 rounded-lg
          text-white
          transition-all duration-200 outline-none
          focus:border-[rgb(0,255,136)] focus:ring-2 focus:ring-[rgb(0,255,136)]/20
          hover:border-white/20
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-[rgb(255,107,53)] focus:ring-[rgb(255,107,53)]/20' : ''}
          ${className}
        `}
      >
        {children}
      </select>
      {error && (
        <p className="text-[rgb(255,107,53)] text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
