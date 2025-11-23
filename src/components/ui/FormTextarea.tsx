import { TextareaHTMLAttributes } from 'react';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  errorId?: string;
}

export default function FormTextarea({ error, errorId, className = '', id, ...props }: FormTextareaProps) {
  const errorMessageId = errorId || (id ? `${id}-error` : undefined);

  return (
    <div className="w-full">
      <textarea
        id={id}
        {...props}
        className={`
          w-full px-4 py-3 min-h-[120px]
          bg-white/5 border border-white/10 rounded-lg
          text-white placeholder:text-text-tertiary
          transition-all duration-200 outline-none resize-none
          focus-visible:border-[rgb(0,255,136)] focus-visible:ring-2 focus-visible:ring-[rgb(0,255,136)]/20
          hover:border-white/20
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-[rgb(255,107,53)] focus-visible:ring-[rgb(255,107,53)]/20' : ''}
          ${className}
        `}
        aria-invalid={!!error}
        aria-required={props.required}
        aria-describedby={error ? errorMessageId : undefined}
      />
      {error && (
        <p id={errorMessageId} className="text-[rgb(255,107,53)] text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
