import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';
import { Button } from './Button';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  submitText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  size = 'md',
  submitText = 'Save',
  cancelText = 'Cancel',
  isSubmitting = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className={`
          relative w-full ${sizeStyles[size]}
          bg-white dark:bg-gray-800
          shadow-sm border border-gray-300 dark:border-gray-600
          animate-scale-in
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            <CloseIcon size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit}>
          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {cancelText}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : submitText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
