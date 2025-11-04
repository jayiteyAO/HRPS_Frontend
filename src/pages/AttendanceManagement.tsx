
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { AttendanceIcon } from '@/components/Icons';
import { attendanceRecords } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const AttendanceManagement: React.FC = () => {
 const navigate = useNavigate();
 const totalHours = attendanceRecords.reduce((sum, record) => sum + record.hours, 0);
 const avgHours = totalHours / attendanceRecords.length;

 return (
 <div className="space-y-6">
 {/* Page Header */}
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
 <AttendanceIcon size={32} className="text-[#00A4EF]" />
 Time & Attendance
 </h1>
 <p className="text-gray-600 dark:text-gray-400 mt-1">
 Track and manage employee attendance
 </p>
 </div>
 <div className="flex space-x-2">
 <Button variant="success">Clock In</Button>
 <Button variant="danger">Clock Out</Button>
 </div>
 </div>

 {/* Stats Cards */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Present Today</p>
 <p className="text-2xl font-bold text-green-600 mt-1">
 {attendanceRecords.filter(a => a.status === 'Present').length}
 </p>
 </Card>
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Hours/Day</p>
 <p className="text-2xl font-bold text-[#00A4EF] mt-1">{avgHours.toFixed(1)}</p>
 </Card>
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Late Check-ins</p>
 <p className="text-2xl font-bold text-[#FFB900] mt-1">2</p>
 </Card>
 <Card padding={false} className="p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400">Early Departures</p>
 <p className="text-2xl font-bold text-[#F25022] mt-1">1</p>
 </Card>
 </div>

 {/* Quick Clock In/Out */}
 <Card>
 <CardHeader title="Quick Clock In/Out" subtitle="Record your attendance" />
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="text-center p-6 bg-gradient-to-br from-[#00A4EF] to-[#0078D4] rounded-sm text-white">
 <div className="text-5xl font-bold mb-2">09:45</div>
 <p className="text-blue-100">Current Time</p>
 </div>
 <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-sm">
 <div className="text-center">
 <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Last Check-in</div>
 <div className="text-lg text-gray-600 dark:text-gray-400">09:00 AM</div>
 <Badge variant="success" size="sm">On Time</Badge>
 </div>
 </div>
 <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-sm">
 <div className="text-center">
 <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hours Today</div>
 <div className="text-3xl font-bold text-[#7FBA00]">0.75</div>
 </div>
 </div>
 </div>
 </Card>

 {/* Attendance Records Table */}
 <Card>
 <CardHeader
 title="Recent Attendance"
 subtitle="Last 10 attendance records"
 action={
 <Button variant="ghost" size="sm" onClick={() => navigate('/attendance/logs')}>View All</Button>
 }
 />
 <div className="overflow-x-auto">
 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
 <thead className="bg-gray-50 dark:bg-gray-800">
 <tr>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Record ID</th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check In</th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check Out</th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hours</th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
 </tr>
 </thead>
 <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
 {attendanceRecords.map((row) => (
 <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
 <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">{row.id}</span>
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
 <div>
 <p className="font-medium text-gray-900 dark:text-white">{row.employeeName}</p>
 <p className="text-sm text-gray-500 dark:text-gray-400">{row.employeeId}</p>
 </div>
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
 <span className="font-medium">{row.date}</span>
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
 <div className="flex items-center space-x-2">
 <span className="font-mono text-sm">{row.checkIn}</span>
 {row.checkIn > '09:00' && <Badge variant="warning" size="sm">Late</Badge>}
 </div>
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
 <span className="font-mono text-sm">{row.checkOut}</span>
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
 <span className="font-semibold text-[#00A4EF]">{row.hours.toFixed(1)}h</span>
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
 <Badge variant={row.status === 'Present' ? 'success' : 'danger'}>{row.status}</Badge>
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
 <Button variant="ghost" size="sm">View</Button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </Card>

 {/* Weekly Overview */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <Card>
 <CardHeader title="Weekly Overview" subtitle="Hours worked this week" />
 <div className="space-y-3">
 {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => {
 const hours = 8 + Math.random() * 2;
 return (
 <div key={day} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-sm">
 <span className="font-medium text-gray-700 dark:text-gray-300">{day}</span>
 <div className="flex items-center space-x-3">
 <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded h-2">
 <div
 className="bg-[#00A4EF] h-2 rounded"
 style={{ width: `${(hours / 10) * 100}%` }}
 />
 </div>
 <span className="font-semibold text-gray-900 dark:text-white w-12 text-right">
 {hours.toFixed(1)}h
 </span>
 </div>
 </div>
 );
 })}
 </div>
 <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-sm">
 <div className="flex justify-between items-center">
 <span className="font-medium text-gray-700 dark:text-gray-300">Total Hours</span>
 <span className="text-2xl font-bold text-[#00A4EF]">42.3h</span>
 </div>
 </div>
 </Card>

 <Card>
 <CardHeader title="Attendance Summary" subtitle="This month statistics" />
 <div className="space-y-4">
 <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-sm">
 <div className="flex justify-between items-center">
 <span className="text-gray-700 dark:text-gray-300">Present Days</span>
 <span className="text-2xl font-bold text-green-600">18</span>
 </div>
 <div className="mt-2 w-full bg-green-200 dark:bg-green-800 rounded h-2">
 <div className="bg-green-600 h-2 rounded" style={{ width: '90%' }} />
 </div>
 </div>
 <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-sm">
 <div className="flex justify-between items-center">
 <span className="text-gray-700 dark:text-gray-300">Late Arrivals</span>
 <span className="text-2xl font-bold text-yellow-600">2</span>
 </div>
 <div className="mt-2 w-full bg-yellow-200 dark:bg-yellow-800 rounded h-2">
 <div className="bg-yellow-600 h-2 rounded" style={{ width: '10%' }} />
 </div>
 </div>
 <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-sm">
 <div className="flex justify-between items-center">
 <span className="text-gray-700 dark:text-gray-300">Absent Days</span>
 <span className="text-2xl font-bold text-red-600">0</span>
 </div>
 <div className="mt-2 w-full bg-red-200 dark:bg-red-800 rounded h-2">
 <div className="bg-red-600 h-2 rounded" style={{ width: '0%' }} />
 </div>
 </div>
 </div>
 </Card>
 </div>
 </div>
 );
};

export default AttendanceManagement;
