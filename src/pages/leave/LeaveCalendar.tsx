import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CalendarIcon, UserIcon, ClockIcon } from '@/components/Icons';

interface LeaveEvent {
  id: number;
  employee: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export const LeaveCalendar = () => {
  const { theme } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const leaveEvents: LeaveEvent[] = [
    { id: 1, employee: 'John Doe', leaveType: 'Annual Leave', startDate: '2025-11-15', endDate: '2025-11-20', status: 'Approved' },
    { id: 2, employee: 'Jane Smith', leaveType: 'Sick Leave', startDate: '2025-11-12', endDate: '2025-11-13', status: 'Approved' },
    { id: 3, employee: 'Bob Johnson', leaveType: 'Casual Leave', startDate: '2025-11-25', endDate: '2025-11-25', status: 'Pending' },
    { id: 4, employee: 'Alice Brown', leaveType: 'Annual Leave', startDate: '2025-12-20', endDate: '2025-12-31', status: 'Approved' },
    { id: 5, employee: 'Mike Wilson', leaveType: 'Sick Leave', startDate: '2025-11-08', endDate: '2025-11-09', status: 'Approved' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return leaveEvents.filter(event => {
      return dateStr >= event.startDate && dateStr <= event.endDate;
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const totalLeaves = leaveEvents.length;
  const approvedLeaves = leaveEvents.filter(e => e.status === 'Approved').length;
  const pendingLeaves = leaveEvents.filter(e => e.status === 'Pending').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-[#7FBA00]/20 text-[#7FBA00]';
      case 'Pending': return 'bg-[#FFB900]/20 text-[#FFB900]';
      case 'Rejected': return 'bg-[#F25022]/20 text-[#F25022]';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Leave Calendar
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">View team leave schedule</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Leaves</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalLeaves}</div>
            </div>
            <div className="w-12 h-12 bg-[#00A4EF]/20 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Approved</div>
              <div className="text-3xl font-bold text-[#7FBA00]">{approvedLeaves}</div>
            </div>
            <div className="w-12 h-12 bg-[#7FBA00]/20 flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</div>
              <div className="text-3xl font-bold text-[#FFB900]">{pendingLeaves}</div>
            </div>
            <div className="w-12 h-12 bg-[#FFB900]/20 flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>
      </div>

      <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{monthName}</h2>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className={`px-4 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600' : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'}`}
            >
              Previous
            </button>
            <button
              onClick={nextMonth}
              className={`px-4 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600' : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold text-gray-900 dark:text-white py-2">
              {day}
            </div>
          ))}
          
          {Array.from({ length: startingDayOfWeek }, (_, i) => (
            <div key={`empty-${i}`} className="h-24" />
          ))}
          
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const events = getEventsForDate(date);
            
            return (
              <div
                key={day}
                className={`h-24 p-2 border ${theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'} overflow-hidden`}
              >
                <div className="font-medium text-sm text-gray-900 dark:text-white mb-1">{day}</div>
                {events.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className="text-xs px-1 py-0.5 mb-1 truncate bg-[#00A4EF]/20 text-[#00A4EF]"
                    title={`${event.employee} - ${event.leaveType}`}
                  >
                    {event.employee.split(' ')[0]}
                  </div>
                ))}
                {events.length > 2 && (
                  <div className="text-xs text-gray-500">+{events.length - 2} more</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Leaves</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Leave Type</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Start Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">End Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Status</th>
            </tr>
          </thead>
          <tbody className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
            {leaveEvents.map((event) => (
              <tr key={event.id} className={`border-b transition-colors ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{event.employee}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{event.leaveType}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{event.startDate}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{event.endDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveCalendar;
