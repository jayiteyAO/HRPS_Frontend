import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon,
  trend,
  color = 'blue'
}) => {
  const iconColorStyles = {
    blue: 'bg-[#00A4EF]/10 text-[#00A4EF]',
    green: 'bg-[#7FBA00]/10 text-[#7FBA00]',
    yellow: 'bg-[#FFB900]/10 text-[#FFB900]',
    red: 'bg-[#F25022]/10 text-[#F25022]',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{value}</p>
          {trend && (
            <div className={`flex items-center text-xs font-medium ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                {trend.isPositive ? (
                  <path fillRule="evenodd" d="M12 7a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H13a1 1 0 01-1-1z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M12 13a1 1 0 011 1v4a1 1 0 11-2 0v-2.586l-4.293 4.293a1 1 0 01-1.414 0L8 13.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 13.586 14.586 9H13a1 1 0 01-1-1z" clipRule="evenodd" />
                )}
              </svg>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-3 ${iconColorStyles[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
