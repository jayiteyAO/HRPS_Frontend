import React, { useEffect } from 'react';
import { AlertIcon, CloseIcon } from './Icons';
import { Button } from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isProcessing?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  isProcessing = false,
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

  const iconColors = {
    danger: 'text-[#F25022]',
    warning: 'text-[#FFB900]',
    info: 'text-[#00A4EF]',
  };

  const handleConfirm = () => {
    onConfirm();
    if (!isProcessing) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="
          relative w-full max-w-md
          bg-white dark:bg-gray-800
          shadow-sm border border-gray-300 dark:border-gray-600
          animate-scale-in
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <AlertIcon size={24} className={iconColors[variant]} />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            disabled={isProcessing}
          >
            <CloseIcon size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isProcessing}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
