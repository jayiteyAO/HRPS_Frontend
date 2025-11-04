import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast } from './Toast';
import type { ToastProps } from './Toast';

interface ToastContextType {
  addToast: (message: string, type: ToastProps['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (message: string, type: ToastProps['type']) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: ToastProps = {
      id,
      message,
      type,
      onClose: removeToast,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-20 right-4 z-50 space-y-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
