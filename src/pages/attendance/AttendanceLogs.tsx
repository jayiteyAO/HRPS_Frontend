
import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CheckCircleIcon, ClockIcon, XCircleIcon, EyeIcon } from '@/components/Icons';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { showToast } from '@/components/Toast';

interface AttendanceLog {
  id: number;
  employee: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  hours: number;
}

export const AttendanceLogs: React.FC = () => {
 const { theme } = useTheme();
 const [currentTime, setCurrentTime] = useState(new Date());
 const [isCheckedIn, setIsCheckedIn] = useState(false);
 const [checkInTime, setCheckInTime] = useState<Date | null>(null);
 const [viewDialogOpen, setViewDialogOpen] = useState(false);
 const [selectedLog, setSelectedLog] = useState<AttendanceLog | null>(null);

 const logs = [
 { id: 1, employee: 'John Doe', date: '2025-02-28', checkIn: '09:00', checkOut: '17:30', status: 'Present', hours: 8.5 },
 { id: 2, employee: 'Jane Smith', date: '2025-02-28', checkIn: '08:45', checkOut: '17:15', status: 'Present', hours: 8.5 },
 { id: 3, employee: 'Mike Johnson', date: '2025-02-28', checkIn: '09:15', checkOut: '17:45', status: 'Late', hours: 8.5 },
 { id: 4, employee: 'Sarah Williams', date: '2025-02-28', checkIn: '-', checkOut: '-', status: 'Absent', hours: 0 },
 ];

 useEffect(() => {
   const timer = setInterval(() => {
     setCurrentTime(new Date());
   }, 1000);

   return () => clearInterval(timer);
 }, []);

 const handleCheckIn = () => {
   const now = new Date();
   setCheckInTime(now);
   setIsCheckedIn(true);
   showToast('Checked in successfully!', 'success');
 };

 const handleCheckOut = () => {
   if (!checkInTime) return;
   setIsCheckedIn(false);
   setCheckInTime(null);
   showToast('Checked out successfully!', 'success');
 };

 const formatTime = (date: Date): string => {
   return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
 };

 const calculateDuration = (start: Date, end: Date): string => {
   const diff = end.getTime() - start.getTime();
   const hours = Math.floor(diff / (1000 * 60 * 60));
   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
   return `${hours}h ${minutes}m`;
 };

 const getStatusColor = (status: string) => {
 switch (status) {
 case 'Present': return '#7FBA00';
 case 'Late': return '#FFB900';
 case 'Absent': return '#F25022';
 default: return '#737373';
 }
 };

 const getStatusIcon = (status: string) => {
 switch (status) {
 case 'Present': return <CheckCircleIcon size={20} className="text-[#7FBA00]" />;
 case 'Late': return <ClockIcon size={20} className="text-[#FFB900]" />;
 case 'Absent': return <XCircleIcon size={20} className="text-[#F25022]" />;
 default: return null;
 }
 };

 const handleViewLog = (log: AttendanceLog) => {
   setSelectedLog(log);
   setViewDialogOpen(true);
 };

 return (
 <div className="space-y-6">
 <div className="mb-8">
   <h1 className={`text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent`}>
     Attendance Logs
   </h1>
   <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
     Track and manage employee attendance records
   </p>
 </div>

 {/* Clock System */}
 <div className={`
   ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}
   shadow-sm border
   ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
   p-8
 `}>
   <div className="text-center mb-8">
     <ClockIcon className="w-20 h-20 text-[#00A4EF] mx-auto mb-4" />
     <h2 className={`text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
       {formatTime(currentTime)}
     </h2>
     <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
       {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
     </p>
   </div>

   {isCheckedIn && checkInTime && (
     <div className={`border p-4 mb-6 text-center ${
       theme === 'dark' 
         ? 'bg-green-900/20 border-green-800' 
         : 'bg-green-50 border-green-200'
     }`}>
       <p className={`font-medium ${theme === 'dark' ? 'text-green-200' : 'text-green-800'}`}>
         You checked in at {formatTime(checkInTime)}
       </p>
       <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>
         Duration: {calculateDuration(checkInTime, currentTime)}
       </p>
     </div>
   )}

   <div className="flex gap-4 justify-center">
     <Button
       variant="primary"
       size="lg"
       onClick={handleCheckIn}
       disabled={isCheckedIn}
       className="min-w-[180px] flex items-center justify-center gap-2"
     >
       <ClockIcon className="w-5 h-5" />
       <span>Clock In</span>
     </Button>
     <Button
       variant="danger"
       size="lg"
       onClick={handleCheckOut}
       disabled={!isCheckedIn}
       className="min-w-[180px] flex items-center justify-center gap-2"
     >
       <ClockIcon className="w-5 h-5" />
       <span>Clock Out</span>
     </Button>
   </div>
 </div>

 <div className="grid grid-cols-4 gap-6 mb-6">
 {['Present', 'Late', 'Absent', 'Leave'].map((status, index) => (
 <div
 key={status}
 className={`
 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}
 p-6 shadow-sm border
 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
 
 `}
 style={{
 animation: `scale-in 0.5s ease-out ${index * 100}ms forwards`
 }}
 >
 <div className="flex items-center justify-between">
 <div>
 <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{status}</p>
 <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
 {status === 'Present' ? 142 : status === 'Late' ? 3 : status === 'Absent' ? 2 : 8}
 </p>
 </div>
 <div className="w-12 h-12 rounded-sm flex items-center justify-center"
 style={{ backgroundColor: `${getStatusColor(status)}20` }}>
 {getStatusIcon(status)}
 </div>
 </div>
 </div>
 ))}
 </div>

 <div className={`
 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}
 shadow-sm border
 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
 overflow-hidden
 `}>
 <table className="w-full">
 <thead className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}>
 <tr>
 <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 Employee
 </th>
 <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 Date
 </th>
 <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 Check In
 </th>
 <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 Check Out
 </th>
 <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 Hours
 </th>
 <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 Status
 </th>
 <th className={`px-6 py-4 text-left text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 Actions
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
 {logs.map((log, index) => (
 <tr
 key={log.id}
 className={`
 ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}
 
 `}
 style={{
 animation: `slide-in-left 0.5s ease-out ${index * 100}ms forwards`,
 opacity: 0
 }}
 >
 <td className={`px-6 py-4 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
 {log.employee}
 </td>
 <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 {log.date}
 </td>
 <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 {log.checkIn}
 </td>
 <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 {log.checkOut}
 </td>
 <td className={`px-6 py-4 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
 {log.hours}h
 </td>
 <td className="px-6 py-4">
 <div className="flex items-center gap-2">
 {getStatusIcon(log.status)}
 <span
 className="px-3 py-1 rounded text-xs font-medium"
 style={{
 backgroundColor: `${getStatusColor(log.status)}20`,
 color: getStatusColor(log.status)
 }}
 >
 {log.status}
 </span>
 </div>
 </td>
 <td className="px-6 py-4">
   <Button
     variant="primary"
     size="sm"
     onClick={() => handleViewLog(log)}
     className="flex items-center gap-2"
   >
     <EyeIcon className="w-4 h-4" />
     <span>View</span>
   </Button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 {/* View Log Dialog */}
 <Modal
   isOpen={viewDialogOpen}
   onClose={() => setViewDialogOpen(false)}
   title="Attendance Log Details"
 >
   {selectedLog && (
     <div className="space-y-6">
       <div className="grid grid-cols-2 gap-4">
         <div>
           <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
             Employee
           </label>
           <p className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
             {selectedLog.employee}
           </p>
         </div>
         <div>
           <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
             Date
           </label>
           <p className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
             {selectedLog.date}
           </p>
         </div>
         <div>
           <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
             Check In Time
           </label>
           <p className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
             {selectedLog.checkIn}
           </p>
         </div>
         <div>
           <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
             Check Out Time
           </label>
           <p className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
             {selectedLog.checkOut}
           </p>
         </div>
         <div>
           <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
             Total Hours
           </label>
           <p className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
             {selectedLog.hours}h
           </p>
         </div>
         <div>
           <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
             Status
           </label>
           <div className="flex items-center gap-2">
             {getStatusIcon(selectedLog.status)}
             <span
               className="px-3 py-1 rounded text-xs font-medium"
               style={{
                 backgroundColor: `${getStatusColor(selectedLog.status)}20`,
                 color: getStatusColor(selectedLog.status)
               }}
             >
               {selectedLog.status}
             </span>
           </div>
         </div>
       </div>

       <div className={`border-t pt-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
         <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
           Additional Notes
         </label>
         <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
           Regular working day with no incidents reported.
         </p>
       </div>

       <div className={`flex justify-end gap-3 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
         <Button
           variant="secondary"
           onClick={() => setViewDialogOpen(false)}
         >
           Close
         </Button>
       </div>
     </div>
   )}
 </Modal>
 </div>
 );
};
