import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, CheckIcon, ClockIcon, AlertIcon, CalendarIcon } from './Icons';

interface Notification {
  id: string;
  type: 'leave' | 'payroll' | 'task' | 'system' | 'approval' | 'announcement';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon?: React.ReactNode;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'leave',
    title: 'Leave Request Approved',
    message: 'Your annual leave request for Dec 25-30 has been approved.',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'payroll',
    title: 'Payslip Available',
    message: 'Your November payslip is now ready to view.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'task',
    title: 'Performance Review Due',
    message: 'Complete your Q4 self-assessment by Friday.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'approval',
    title: 'Approval Pending',
    message: 'John Doe has submitted a leave request for your approval.',
    time: '2 days ago',
    read: false,
  },
  {
    id: '5',
    type: 'announcement',
    title: 'Company Holiday',
    message: 'Office will be closed on Dec 25-26 for Christmas.',
    time: '3 days ago',
    read: true,
  },
  {
    id: '6',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Sunday 2 AM - 4 AM.',
    time: '1 week ago',
    read: true,
  },
];

type NotificationTab = 'all' | 'leave' | 'payroll' | 'task' | 'approval' | 'system';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const tabs: { key: NotificationTab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: notifications.length },
    { key: 'leave', label: 'Leave', count: notifications.filter(n => n.type === 'leave').length },
    { key: 'payroll', label: 'Payroll', count: notifications.filter(n => n.type === 'payroll').length },
    { key: 'task', label: 'Tasks', count: notifications.filter(n => n.type === 'task').length },
    { key: 'approval', label: 'Approvals', count: notifications.filter(n => n.type === 'approval').length },
  ];

  const filteredNotifications = activeTab === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeTab);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'leave':
        return <CalendarIcon size={20} className="text-[#00A4EF]" />;
      case 'payroll':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#7FBA00]">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" fill="currentColor"/>
        </svg>;
      case 'task':
        return <CheckIcon size={20} className="text-[#FFB900]" />;
      case 'approval':
        return <ClockIcon size={20} className="text-[#F25022]" />;
      case 'announcement':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#7FBA00]">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="currentColor"/>
        </svg>;
      default:
        return <AlertIcon size={20} className="text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-30"
        onClick={onClose}
      />
      <div className="absolute right-0 mt-1 w-96 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 z-40 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-[#00A4EF]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Notifications</h3>
              <p className="text-xs text-white/90">{unreadCount} unread messages</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-white hover:underline transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 scrollbar-thin">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 min-w-fit px-3 py-2 text-xs font-medium transition-colors relative ${
                activeTab === tab.key
                  ? 'text-[#00A4EF] dark:text-[#00A4EF] bg-white dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`ml-1 px-1.5 py-0.5 text-[10px] font-medium ${
                  activeTab === tab.key
                    ? 'bg-[#00A4EF] text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {tab.count}
                </span>
              )}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A4EF]" />
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto scrollbar-thin">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <BellIcon size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10 border-l-2 border-[#00A4EF]' : ''
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.link) {
                      onClose();
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-medium ${
                          notification.read
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="flex-shrink-0 w-1.5 h-1.5 bg-[#00A4EF] rounded-full mt-1"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <Link
            to="/notifications"
            onClick={onClose}
            className="block text-center text-sm font-medium text-[#00A4EF] hover:text-[#0078D4] transition-colors"
          >
            View all notifications
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotificationsDropdown;
