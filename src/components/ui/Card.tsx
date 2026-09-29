import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'accent';
  hoverEffect?: boolean;
  borderThick?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  shadow = 'md',
  hoverEffect = false,
  borderThick = false,
  className = '',
  ...props
}) => {
  const shadowStyles = {
    none: '',
    sm: 'shadow-brutal-sm',
    md: 'shadow-brutal',
    lg: 'shadow-brutal-lg',
    accent: 'shadow-brutal-accent',
  };

  const hoverStyles = hoverEffect
    ? 'transition-all duration-150 hover:-translate-y-1 hover:shadow-brutal-lg'
    : '';

  const borderStyles = borderThick ? 'border-brutal-3' : 'border-brutal';

  return (
    <div
      className={`bg-surface ${borderStyles} ${shadowStyles[shadow]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
