import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RoleSwitcher: React.FC = () => {
  const { roles, user, login } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleChange = async (role: string) => {
    const email = user?.email || `demo+${role.replace(/\s+/g, '').toLowerCase()}@example.com`;
    try {
      await login({ email, password: 'demo', role, remember: false });
      setOpen(false);
      navigate('/dashboard');
    } catch (err) {
      console.error('Role switch failed', err);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#00A4EF] text-white hover:bg-[#0078D4] transition-colors border border-white/20"
        title="Switch view"
        type="button"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
        </svg>
        <span>Switch View</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Switch to Role View</div>
          </div>
          <div className="py-1 max-h-96 overflow-y-auto">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => handleChange(r)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  user?.role === r 
                    ? 'bg-[#00A4EF] text-white font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={user?.role === r ? 'text-white' : 'text-gray-400'}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                  </svg>
                  <span>{r}</span>
                  {user?.role === r && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-auto text-white">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher;
