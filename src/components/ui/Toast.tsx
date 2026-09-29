import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  type?: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type = 'info', message, onClose }) => {
  const typeConfig = {
    success: {
      border: 'border-success',
      bg: 'bg-emerald-50 text-emerald-950',
      icon: <CheckCircle2 className="w-5 h-5 text-success shrink-0" />,
    },
    error: {
      border: 'border-danger',
      bg: 'bg-rose-50 text-rose-950',
      icon: <AlertCircle className="w-5 h-5 text-danger shrink-0" />,
    },
    info: {
      border: 'border-border',
      bg: 'bg-surface text-foreground',
      icon: <Info className="w-5 h-5 text-accent shrink-0" />,
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={`flex items-center gap-3 p-4 border-2 ${config.border} ${config.bg} shadow-brutal text-sm font-mono font-medium`}
      role="status"
    >
      {config.icon}
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:opacity-75 transition-opacity"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
