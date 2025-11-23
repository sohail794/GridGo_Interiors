import { SelectHTMLAttributes } from 'react';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  errorId?: string;
  options?: { value: string; label: string }[];
}

export default function FormSelect({ error, errorId, options, className = '', children, id, ...props }: FormSelectProps) {
  const errorMessageId = errorId || (id ? `${id}-error` : undefined);

  return (
    <div className="w-full">
      <select
        id={id}
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
        aria-invalid={!!error}
        aria-required={props.required}
        aria-describedby={error ? errorMessageId : undefined}
      >
        {children}
      </select>
      {error && (
        <p id={errorMessageId} className="text-[rgb(255,107,53)] text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
