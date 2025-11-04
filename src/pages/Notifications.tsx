import { useState } from 'react';
import { BellIcon, CheckIcon, TrashIcon } from '@/components/Icons';

interface Notification {
 id: string;
 title: string;
 message: string;
 type: 'info' | 'success' | 'warning' | 'error';
 timestamp: string;
 read: boolean;
}

const Notifications: React.FC = () => {
 const [notifications, setNotifications] = useState<Notification[]>([
 {
 id: '1',
 title: 'Leave Request Approved',
 message: 'Your annual leave request for Nov 15-20 has been approved by your manager.',
 type: 'success',
 timestamp: '2 hours ago',
 read: false,
 },
 {
 id: '2',
 title: 'Payslip Available',
 message: 'Your payslip for November 2025 is now available for download.',
 type: 'info',
 timestamp: '5 hours ago',
 read: false,
 },
 {
 id: '3',
 title: 'Performance Review Due',
 message: 'Your quarterly performance review is scheduled for next week.',
 type: 'warning',
 timestamp: '1 day ago',
 read: true,
 },
 {
 id: '4',
 title: 'Training Session Reminder',
 message: 'Cybersecurity awareness training starts tomorrow at 10 AM.',
 type: 'info',
 timestamp: '1 day ago',
 read: true,
 },
 {
 id: '5',
 title: 'Attendance Alert',
 message: 'You have 3 pending attendance regularization requests.',
 type: 'warning',
 timestamp: '2 days ago',
 read: true,
 },
 {
 id: '6',
 title: 'New Policy Update',
 message: 'The company has updated the remote work policy. Please review.',
 type: 'info',
 timestamp: '3 days ago',
 read: true,
 },
 {
 id: '7',
 title: 'Birthday Wishes',
 message: 'Happy Birthday! 🎉 The HR team wishes you a wonderful day.',
 type: 'success',
 timestamp: '4 days ago',
 read: true,
 },
 {
 id: '8',
 title: 'Benefits Enrollment',
 message: 'Benefits enrollment period ends in 5 days. Complete your selections.',
 type: 'warning',
 timestamp: '5 days ago',
 read: true,
 },
 ]);

 const [filter, setFilter] = useState<'all' | 'unread'>('all');

 const markAsRead = (id: string) => {
 setNotifications(notifications.map(n => 
 n.id === id ? { ...n, read: true } : n
 ));
 };

 const markAllAsRead = () => {
 setNotifications(notifications.map(n => ({ ...n, read: true })));
 };

 const deleteNotification = (id: string) => {
 setNotifications(notifications.filter(n => n.id !== id));
 };

 const filteredNotifications = filter === 'all' 
 ? notifications 
 : notifications.filter(n => !n.read);

 const getTypeColor = (type: string) => {
 switch (type) {
 case 'success': return 'bg-[#7FBA00]/10 border-[#7FBA00]';
 case 'warning': return 'bg-[#FFB900]/10 border-[#FFB900]';
 case 'error': return 'bg-[#F25022]/10 border-[#F25022]';
 default: return 'bg-[#00A4EF]/10 border-[#00A4EF]';
 }
 };

 const getTypeIconColor = (type: string) => {
 switch (type) {
 case 'success': return 'text-[#7FBA00]';
 case 'warning': return 'text-[#FFB900]';
 case 'error': return 'text-[#F25022]';
 default: return 'text-[#00A4EF]';
 }
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
 <div className="max-w-4xl mx-auto">
 {/* Header */}
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
 Notifications
 </h1>
 <p className="text-gray-600 dark:text-gray-400">
 Stay updated with your latest activities and alerts
 </p>
 </div>

 {/* Actions Bar */}
 <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-4 mb-6 border border-gray-200/50 dark:border-gray-700/50 ">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
 <div className="flex gap-2">
 <button
 onClick={() => setFilter('all')}
 className={`px-4 py-2 rounded-sm font-medium ${
 filter === 'all'
 ? 'bg-[#00A4EF] text-white shadow-sm'
 : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
 }`}
 >
 All ({notifications.length})
 </button>
 <button
 onClick={() => setFilter('unread')}
 className={`px-4 py-2 rounded-sm font-medium ${
 filter === 'unread'
 ? 'bg-[#00A4EF] text-white shadow-sm'
 : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
 }`}
 >
 Unread ({notifications.filter(n => !n.read).length})
 </button>
 </div>
 <button
 onClick={markAllAsRead}
 className="flex items-center gap-2 px-4 py-2 bg-[#7FBA00] text-white rounded-sm hover:bg-[#6BA000] shadow-sm hover:shadow-sm"
 >
 <CheckIcon size={18} />
 Mark All as Read
 </button>
 </div>
 </div>

 {/* Notifications List */}
 <div className="space-y-3">
 {filteredNotifications.length === 0 ? (
 <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-12 text-center border border-gray-200/50 dark:border-gray-700/50">
 <BellIcon size={64} className="mx-auto mb-4 text-gray-400" />
 <p className="text-gray-500 dark:text-gray-400 text-lg">
 {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
 </p>
 </div>
 ) : (
 filteredNotifications.map((notification) => (
 <div
 key={notification.id}
 className={`bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm hover:shadow-sm p-5 border-l-4 ${getTypeColor(notification.type)} border-gray-200/50 dark:border-gray-700/50 [1.01] cursor-pointer `}
 onClick={() => !notification.read && markAsRead(notification.id)}
 >
 <div className="flex items-start justify-between gap-4">
 <div className="flex items-start gap-4 flex-1">
 <div className={`p-3 rounded ${getTypeColor(notification.type)}`}>
 <BellIcon size={24} className={getTypeIconColor(notification.type)} />
 </div>
 <div className="flex-1">
 <div className="flex items-center gap-2 mb-1">
 <h3 className="font-semibold text-gray-900 dark:text-white">
 {notification.title}
 </h3>
 {!notification.read && (
 <span className="w-2 h-2 bg-[#00A4EF] rounded"></span>
 )}
 </div>
 <p className="text-gray-600 dark:text-gray-300 mb-2">
 {notification.message}
 </p>
 <span className="text-sm text-gray-500 dark:text-gray-400">
 {notification.timestamp}
 </span>
 </div>
 </div>
 <div className="flex items-center gap-2">
 {!notification.read && (
 <button
 onClick={(e) => {
 e.stopPropagation();
 markAsRead(notification.id);
 }}
 className="p-2 rounded-sm bg-[#7FBA00]/10 hover:bg-[#7FBA00]/20 text-[#7FBA00]"
 title="Mark as read"
 >
 <CheckIcon size={18} />
 </button>
 )}
 <button
 onClick={(e) => {
 e.stopPropagation();
 deleteNotification(notification.id);
 }}
 className="p-2 rounded-sm bg-[#F25022]/10 hover:bg-[#F25022]/20 text-[#F25022]"
 title="Delete"
 >
 <TrashIcon size={18} />
 </button>
 </div>
 </div>
 </div>
 ))
 )}
 </div>
 </div>
 </div>
 );
};

export default Notifications;
