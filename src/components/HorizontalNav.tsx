import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from './Dropdown';
import { navigationItems } from '@/config/navigationConfig';

export const HorizontalNav: React.FC = () => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-[#00A4EF] border-b border-[#0078D4] shadow-md sticky top-16 z-40 w-full">
      <div className="px-4 w-full">
        <div className="flex items-center justify-center gap-1">
          {navigationItems.map((item) => (
            item.subMenu ? (
              <Dropdown
                key={item.path}
                label={item.name}
                items={item.subMenu}
                icon={item.icon}
                isActive={isActivePath(item.path)}
              />
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm
                  transition-all duration-200 border-b-2
                  ${isActivePath(item.path)
                    ? 'text-white font-bold border-white bg-white/10'
                    : 'text-white font-medium border-transparent hover:bg-white/10 hover:border-white/50'
                  }
                `}
                style={{ color: isActivePath(item.path) ? '#ffffff' : 'rgba(255, 255, 255, 0.9)' }}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNav;
