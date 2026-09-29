import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'outline' | 'tech';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-mono font-bold uppercase tracking-wider select-none';

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantStyles = {
    default: 'bg-surface text-foreground border-2 border-border shadow-[2px_2px_0px_var(--border)]',
    accent: 'bg-accent text-accent-foreground border-2 border-border shadow-[2px_2px_0px_var(--border)]',
    success: 'bg-emerald-100 text-emerald-900 border-2 border-emerald-800 shadow-[2px_2px_0px_var(--border)]',
    warning: 'bg-amber-100 text-amber-900 border-2 border-amber-800 shadow-[2px_2px_0px_var(--border)]',
    outline: 'bg-transparent text-foreground border-2 border-border',
    tech: 'bg-surface-muted text-foreground border border-border/80 text-[11px] font-medium tracking-normal',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
