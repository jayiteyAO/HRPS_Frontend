import React from 'react';

interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  maxValue?: number;
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, maxValue, height = 200 }) => {
  const max = maxValue || Math.max(...data.map(d => d.value));
  
  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between gap-2 h-full">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
            <div className="w-full bg-gray-100 dark:bg-gray-700 relative flex items-end" style={{ height: '100%' }}>
              <div
                className={`w-full ${item.color || 'bg-[#00A4EF]'} transition-all duration-300`}
                style={{ height: `${(item.value / max) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 text-center">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface LineChartProps {
  data: Array<{ label: string; value: number }>;
  color?: string;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, color = '#00A4EF', height = 200 }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.value - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((item.value - minValue) / range) * 100;
          return (
            <circle key={index} cx={x} cy={y} r="2" fill={color} />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <div key={index} className="text-xs text-gray-600 dark:text-gray-400">{item.label}</div>
        ))}
      </div>
    </div>
  );
};

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  color = 'bg-[#00A4EF]', 
  label,
  showPercentage = true 
}) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-900 dark:text-white">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface PieChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ data, size = 200 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="transparent" />
        {data.map((item, index) => {
          const angle = (item.value / total) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;
          
          const startX = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
          const startY = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
          const endX = 50 + 40 * Math.cos((Math.PI * currentAngle) / 180);
          const endY = 50 + 40 * Math.sin((Math.PI * currentAngle) / 180);
          
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          return (
            <path
              key={index}
              d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
              fill={item.color}
            />
          );
        })}
      </svg>
      <div className="flex flex-col gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {((item.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
