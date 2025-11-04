import React, { useEffect } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InfoIcon, CloseIcon } from './Icons';

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: (id: string) => void;
}

// Helper function for showing toasts (placeholder - use useToast hook in components)
export const showToast = (message: string, type: ToastProps['type'] = 'info') => {
  console.log(`Toast: ${type} - ${message}`);
  // This is a placeholder. In components, use the useToast hook instead.
};

export const Toast: React.FC<ToastProps> = ({ id, message, type, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const typeStyles = {
    success: {
      bg: 'bg-gradient-to-r from-[#7FBA00]/90 to-[#5a8a00]/90',
      icon: <CheckCircleIcon size={24} />,
    },
    error: {
      bg: 'bg-gradient-to-r from-[#F25022]/90 to-[#d43d15]/90',
      icon: <ExclamationCircleIcon size={24} />,
    },
    warning: {
      bg: 'bg-gradient-to-r from-[#FFB900]/90 to-[#e6a500]/90',
      icon: <ExclamationCircleIcon size={24} />,
    },
    info: {
      bg: 'bg-gradient-to-r from-[#00A4EF]/90 to-[#0078D4]/90',
      icon: <InfoIcon size={24} />,
    },
  };

  const config = typeStyles[type];

  return (
    <div
      className={`
        ${config.bg} backdrop-blur-xl border border-white/20
        text-white px-6 py-4 shadow-sm
        flex items-center gap-4 min-w-[320px] max-w-md
        animate-slide-in-right
      `}
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <p className="flex-1 font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 hover:bg-white/20 rounded-sm transition-colors"
      >
        <CloseIcon size={18} />
      </button>
    </div>
  );
};
