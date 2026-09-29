import React from 'react';
import { AlertOctagon, FolderX, Loader2 } from 'lucide-react';
import { Button } from './Button';

export const LoadingState: React.FC<{ message?: string; className?: string }> = ({
  message = 'FETCHING DATA...',
  className = 'py-16',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="p-4 bg-surface border-2 border-border shadow-brutal mb-4 animate-bounce">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
      <p className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground">
        {message}
      </p>
    </div>
  );
};

export const EmptyState: React.FC<{
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}> = ({
  title = 'NO DATA AVAILABLE',
  message = 'There are no items recorded at this moment.',
  actionLabel,
  onAction,
  className = 'py-16',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 bg-surface-muted/60 border-2 border-dashed border-border ${className}`}>
      <div className="p-3 bg-surface border-2 border-border shadow-brutal-sm mb-3">
        <FolderX className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-sans font-bold text-base uppercase tracking-tight text-foreground mb-1">
        {title}
      </h3>
      <p className="font-mono text-xs text-muted-foreground max-w-sm mb-5">
        {message}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}> = ({
  title = 'SYSTEM ENCOUNTERED AN ERROR',
  message = 'Failed to communicate with database. Please verify your connection or retry.',
  onRetry,
  className = 'py-16',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 bg-danger/5 border-2 border-danger shadow-brutal ${className}`}>
      <div className="p-3 bg-surface border-2 border-danger shadow-brutal-sm mb-3 text-danger">
        <AlertOctagon className="w-8 h-8" />
      </div>
      <h3 className="font-sans font-bold text-base uppercase tracking-tight text-danger mb-1">
        {title}
      </h3>
      <p className="font-mono text-xs text-foreground/80 max-w-md mb-5">
        {message}
      </p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          RETRY REQUEST
        </Button>
      )}
    </div>
  );
};
