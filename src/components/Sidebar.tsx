import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DashboardIcon, 
  EmployeeIcon, 
  LeaveIcon, 
  PayrollIcon, 
  AttendanceIcon, 
  PerformanceIcon, 
  GrievanceIcon, 
  LearningIcon, 
  ReportIcon,
  MenuIcon,
  CloseIcon 
} from './Icons';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon size={20} /> },
    { name: 'Employees', path: '/employees', icon: <EmployeeIcon size={20} /> },
    { name: 'Leave Management', path: '/leave', icon: <LeaveIcon size={20} /> },
    { name: 'Payroll', path: '/payroll', icon: <PayrollIcon size={20} /> },
    { name: 'Attendance', path: '/attendance', icon: <AttendanceIcon size={20} /> },
    { name: 'Performance', path: '/performance', icon: <PerformanceIcon size={20} /> },
    { name: 'Grievances', path: '/grievances', icon: <GrievanceIcon size={20} /> },
    { name: 'Learning', path: '/learning', icon: <LearningIcon size={20} /> },
    { name: 'Reports', path: '/reports', icon: <ReportIcon size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-[#00A4EF] to-[#0078D4]">
        {!isCollapsed && (
          <NavLink to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[#00A4EF] font-bold text-sm">
              MS
            </div>
            <span className="font-bold text-lg text-white">mPayroll</span>
          </NavLink>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded hover:bg-white/10 text-white transition-colors"
        >
          {isCollapsed ? <MenuIcon size={20} /> : <CloseIcon size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 mb-1 text-sm font-medium rounded-sm transition-all ${
                isActive
                  ? 'bg-blue-50 text-[#00A4EF] dark:bg-blue-900/30 dark:text-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`
            }
            title={isCollapsed ? item.name : undefined}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {!isCollapsed ? (
          <>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A4EF] to-[#7FBA00] flex items-center justify-center text-white text-sm font-bold">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-sm text-sm font-medium text-white bg-[#F25022] hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full p-2 rounded-sm text-white bg-[#F25022] hover:bg-red-600 transition-colors"
            title="Logout"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mx-auto">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
