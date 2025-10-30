import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const TopNav: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-microsoft-blue to-microsoft-dark-blue flex items-center justify-center text-white font-bold shadow">HR</div>
            <nav className="hidden sm:flex gap-4 text-sm font-semibold">
              <a href="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-microsoft-blue">Dashboard</a>
              <a href="/modules" className="text-gray-700 dark:text-gray-200 hover:text-microsoft-blue">Modules</a>
              <a href="/reports" className="text-gray-700 dark:text-gray-200 hover:text-microsoft-blue">Reports</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-sm text-gray-700 dark:text-gray-200">{user.name}</div>
                <button onClick={logout} className="px-3 py-1 rounded-md bg-red-600 text-white text-sm">Logout</button>
              </>
            ) : (
              <a href="/login" className="text-sm text-microsoft-blue">Login</a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;

