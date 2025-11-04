
import { useTheme } from '@/contexts/ThemeContext';
import { CalendarIcon, DollarIcon } from '@/components/Icons';

export const PayrollRuns: React.FC = () => {
 const { theme } = useTheme();

 const payrollRuns = [
 { id: 1, period: 'January 2025', status: 'Completed', date: '2025-01-31', amount: '$245,000', employees: 145 },
 { id: 2, period: 'February 2025', status: 'Processing', date: '2025-02-28', amount: '$248,500', employees: 147 },
 { id: 3, period: 'March 2025', status: 'Pending', date: '2025-03-31', amount: '$250,000', employees: 148 },
 ];

 return (
 <div className="space-y-6">
 <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
 Payroll Runs
 </h1>

 <div className="grid gap-6">
 {payrollRuns.map((run, index) => (
 <div
 key={run.id}
 className={`
 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}
 p-6 shadow-sm border
 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
 transform hover:scale-[1.02] 
 `}
 style={{
 animation: `slide-in-right 0.5s ease-out ${index * 100}ms forwards`,
 opacity: 0
 }}
 >
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-4">
 <div className="w-16 h-16 bg-gradient-to-br from-[#7FBA00] to-[#6AA000] flex items-center justify-center">
 <DollarIcon size={32} className="text-white" />
 </div>
 <div>
 <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
 {run.period}
 </h3>
 <div className="flex items-center gap-2 mt-1">
 <CalendarIcon size={16} className="text-gray-400" />
 <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
 {run.date}
 </span>
 </div>
 </div>
 </div>

 <div className="text-right">
 <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
 {run.amount}
 </div>
 <span className={`
 px-4 py-2 rounded text-sm font-medium
 ${run.status === 'Completed'
 ? 'bg-[#7FBA00]/20 text-[#7FBA00]'
 : run.status === 'Processing'
 ? 'bg-[#FFB900]/20 text-[#FFB900]'
 : 'bg-[#00A4EF]/20 text-[#00A4EF]'
 }
 `}>
 {run.status}
 </span>
 </div>
 </div>

 <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
 <div className="flex items-center justify-between">
 <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
 {run.employees} employees processed
 </span>
 <button className="
 px-6 py-2 bg-[#00A4EF] text-white rounded-sm
 hover:bg-[#0078D4] 
 font-medium
">
 View Details
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
};
