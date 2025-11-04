
import { useTheme } from '@/contexts/ThemeContext';
import { CalendarIcon, TrendUpIcon, ClockIcon, CheckCircleIcon } from '@/components/Icons';

interface LeaveType {
  type: string;
  total: number;
  used: number;
  pending: number;
  available: number;
  color: string;
}

export const LeaveBalance = () => {
  const { theme } = useTheme();

  const leaveTypes: LeaveType[] = [
    { type: 'Annual Leave', total: 21, used: 12, pending: 2, available: 7, color: '#00A4EF' },
    { type: 'Sick Leave', total: 10, used: 3, pending: 0, available: 7, color: '#F25022' },
    { type: 'Casual Leave', total: 7, used: 2, pending: 1, available: 4, color: '#FFB900' },
    { type: 'Maternity Leave', total: 90, used: 0, pending: 0, available: 90, color: '#7FBA00' },
    { type: 'Paternity Leave', total: 5, used: 0, pending: 0, available: 5, color: '#737373' },
    { type: 'Compassionate Leave', total: 5, used: 1, pending: 0, available: 4, color: '#00A4EF' },
  ];

  const totalLeave = leaveTypes.reduce((sum, lt) => sum + lt.total, 0);
  const totalUsed = leaveTypes.reduce((sum, lt) => sum + lt.used, 0);
  const totalPending = leaveTypes.reduce((sum, lt) => sum + lt.pending, 0);
  const totalAvailable = leaveTypes.reduce((sum, lt) => sum + lt.available, 0);

  const getProgressPercentage = (used: number, total: number) => {
    return (used / total) * 100;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Leave Balance
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Track your leave entitlement and usage</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Leave Days</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalLeave}</div>
            </div>
            <div className="w-12 h-12 bg-[#00A4EF]/20 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Used</div>
              <div className="text-3xl font-bold text-[#F25022]">{totalUsed}</div>
            </div>
            <div className="w-12 h-12 bg-[#F25022]/20 flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-[#F25022]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</div>
              <div className="text-3xl font-bold text-[#FFB900]">{totalPending}</div>
            </div>
            <div className="w-12 h-12 bg-[#FFB900]/20 flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>
        <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Available</div>
              <div className="text-3xl font-bold text-[#7FBA00]">{totalAvailable}</div>
            </div>
            <div className="w-12 h-12 bg-[#7FBA00]/20 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {leaveTypes.map((leave) => (
          <div
            key={leave.type}
            className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: `${leave.color}20` }}>
                  <div style={{ color: leave.color }}>
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{leave.type}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{leave.total} days total</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Used</span>
                <span className="font-medium text-[#F25022]">{leave.used} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Pending</span>
                <span className="font-medium text-[#FFB900]">{leave.pending} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Available</span>
                <span className="font-medium text-[#7FBA00]">{leave.available} days</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                <span>Usage</span>
                <span>{Math.round(getProgressPercentage(leave.used, leave.total))}%</span>
              </div>
              <div className={`w-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${getProgressPercentage(leave.used, leave.total)}%`,
                    backgroundColor: leave.color
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Leave Usage Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#00A4EF]/20 flex items-center justify-center">
              <TrendUpIcon className="w-5 h-5 text-[#00A4EF]" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Most Used</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Annual Leave (57%)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#7FBA00]/20 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-[#7FBA00]" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Best Month</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">December (peak usage)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#FFB900]/20 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-[#FFB900]" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Projected Balance</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{totalAvailable - 5} days by year end</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalance;
