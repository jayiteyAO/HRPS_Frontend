import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles = 'font-medium border transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-offset-1 inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-[#00A4EF] hover:bg-[#0078D4] border-[#00A4EF] hover:border-[#0078D4] text-white focus:ring-[#00A4EF]',
    secondary: 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:text-white focus:ring-gray-400',
    success: 'bg-[#7FBA00] hover:bg-[#5a8a00] border-[#7FBA00] hover:border-[#5a8a00] text-white focus:ring-[#7FBA00]',
    danger: 'bg-[#F25022] hover:bg-[#d43d15] border-[#F25022] hover:border-[#d43d15] text-white focus:ring-[#F25022]',
    warning: 'bg-[#FFB900] hover:bg-[#e6a500] border-[#FFB900] hover:border-[#e6a500] text-gray-900 focus:ring-[#FFB900]',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent text-gray-700 dark:text-gray-300 focus:ring-gray-400',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm h-7',
    md: 'px-4 py-1.5 text-sm h-8',
    lg: 'px-5 py-2 text-base h-10',
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
