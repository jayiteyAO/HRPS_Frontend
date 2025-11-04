import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

export function Table<T extends Record<string, any>>({ 
  data, 
  columns,
  onRowClick 
}: TableProps<T>) {
  return (
    <div className="border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-100' : ''}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
          No data available
        </div>
      )}
    </div>
  );
}
