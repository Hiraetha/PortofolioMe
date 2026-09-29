import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', loading = false, icon, className = '', disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all select-none disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground';

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs font-mono gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
    };

    const variantStyles = {
      primary: 'bg-accent text-accent-foreground border-brutal shadow-brutal btn-tactile',
      secondary: 'bg-surface text-foreground border-brutal shadow-brutal btn-tactile',
      dark: 'bg-foreground text-surface border-brutal shadow-brutal btn-tactile',
      outline: 'bg-surface-muted text-foreground border-brutal shadow-brutal-sm btn-tactile',
      danger: 'bg-danger text-white border-brutal shadow-brutal btn-tactile',
      ghost: 'bg-transparent text-foreground hover:bg-surface-muted border border-transparent',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          icon && <span className="inline-flex shrink-0">{icon}</span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
