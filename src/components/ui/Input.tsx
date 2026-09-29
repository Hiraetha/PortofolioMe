import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-1.5"
          >
            {label}
            {props.required && <span className="text-accent ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full px-3.5 py-2.5 bg-surface text-foreground font-mono text-sm border-2 border-border shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-border transition-colors disabled:bg-surface-muted disabled:cursor-not-allowed ${
            error ? 'border-danger focus:ring-danger' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs font-mono font-semibold text-danger">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs font-mono text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
