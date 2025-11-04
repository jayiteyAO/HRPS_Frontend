import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@/components/Icons';
import { SubMenuItem } from '@/types/navigation';

interface DropdownProps {
  label: string;
  items: SubMenuItem[];
  icon?: React.ReactNode;
  isActive?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, items, icon, isActive = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-3 text-sm
          transition-all duration-200 border-b-2
          ${isActive 
            ? 'text-white font-bold border-white bg-white/10' 
            : 'text-white font-medium border-transparent hover:bg-white/10 hover:border-white/50'
          }
        `}
        style={{ color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.9)' }}
      >
        {icon}
        <span>{label}</span>
        <ChevronDownIcon 
          size={16} 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 z-50">
          <div className="
            bg-white dark:bg-gray-800
            shadow-sm border border-gray-200 dark:border-gray-700
            overflow-hidden
          ">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="
                  block px-4 py-3 border-b border-gray-100 dark:border-gray-700
                  last:border-b-0
                  hover:bg-[#00A4EF]/10 dark:hover:bg-[#00A4EF]/20
                  transition-colors duration-200
                "
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </div>
                {item.description && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
