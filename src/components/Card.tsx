import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = true,
  hover = false
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        ${padding ? 'p-6' : ''}
        ${hover ? 'hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-100' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
