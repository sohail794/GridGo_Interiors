import { TextareaHTMLAttributes } from 'react';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  errorId?: string;
  showCharCount?: boolean;
  charLimit?: number;
}

export default function FormTextarea({ 
  error, 
  errorId, 
  className = '', 
  id, 
  showCharCount = false,
  charLimit = 500,
  value,
  ...props 
}: FormTextareaProps) {
  const errorMessageId = errorId || (id ? `${id}-error` : undefined);
  const charCount = typeof value === 'string' ? value.length : 0;
  const isOverLimit = charCount > charLimit;

  return (
    <div className="w-full">
      <textarea
        id={id}
        value={value}
        {...props}
        className={`
          w-full px-4 py-3 min-h-[120px]
          bg-white/5 border border-white/10 rounded-lg
          text-white placeholder:text-gray-300
          transition-all duration-200 outline-none resize-none
          focus-visible:border-[rgb(0,255,136)] focus-visible:ring-2 focus-visible:ring-[rgb(0,255,136)]/20
          hover:border-white/20
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error || isOverLimit ? 'border-[rgb(255,107,53)] focus-visible:ring-[rgb(255,107,53)]/20' : ''}
          ${className}
        `}
        aria-invalid={!!error || isOverLimit}
        aria-required={props.required}
        aria-describedby={error ? errorMessageId : undefined}
      />
      <div className="flex justify-between items-start mt-1">
        {error ? (
          <p id={errorMessageId} className="text-[rgb(255,107,53)] text-xs" role="alert">
            {error}
          </p>
        ) : (
          <span />
        )}
        {showCharCount && (
          <span className={`text-xs ${isOverLimit ? 'text-[rgb(255,107,53)]' : 'text-gray-300'}`}>
            {charCount}/{charLimit}
          </span>
        )}
      </div>
    </div>
  );
}
