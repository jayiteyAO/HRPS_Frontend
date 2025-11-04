
import { useState } from 'react';
import { Button } from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Filter,
  Eye,
  TrendingUp,
  BarChart3,
  FileText,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface AttendanceRecord {
  id: string;
  date: string;
  totalEmployees: number;
  present: number;
  absent: number;
  late: number;
  onLeave: number;
  attendanceRate: number;
  department: string;
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'ATT-2024-001',
    date: '2024-01-15',
    totalEmployees: 245,
    present: 228,
    absent: 8,
    late: 9,
    onLeave: 5,
    attendanceRate: 93.1,
    department: 'All Departments'
  },
  {
    id: 'ATT-2024-002',
    date: '2024-01-16',
    totalEmployees: 245,
    present: 235,
    absent: 5,
    late: 5,
    onLeave: 3,
    attendanceRate: 95.9,
    department: 'All Departments'
  },
  {
    id: 'ATT-2024-003',
    date: '2024-01-17',
    totalEmployees: 245,
    present: 220,
    absent: 12,
    late: 13,
    onLeave: 7,
    attendanceRate: 89.8,
    department: 'All Departments'
  },
  {
    id: 'ATT-2024-004',
    date: '2024-01-18',
    totalEmployees: 245,
    present: 232,
    absent: 6,
    late: 7,
    onLeave: 4,
    attendanceRate: 94.7,
    department: 'All Departments'
  },
  {
    id: 'ATT-2024-005',
    date: '2024-01-19',
    totalEmployees: 245,
    present: 238,
    absent: 3,
    late: 4,
    onLeave: 2,
    attendanceRate: 97.1,
    department: 'All Departments'
  },
];

const weeklyTrendData = [
  { week: 'Week 1', present: 228, absent: 8, late: 9, rate: 93.1 },
  { week: 'Week 2', present: 235, absent: 5, late: 5, rate: 95.9 },
  { week: 'Week 3', present: 220, absent: 12, late: 13, rate: 89.8 },
  { week: 'Week 4', present: 232, absent: 6, late: 7, rate: 94.7 },
];

const departmentAttendanceData = [
  { department: 'Engineering', present: 78, absent: 3, late: 4, total: 85, rate: 91.8 },
  { department: 'Sales', present: 58, absent: 2, late: 2, total: 62, rate: 93.5 },
  { department: 'Marketing', present: 42, absent: 2, late: 1, total: 45, rate: 93.3 },
  { department: 'HR', present: 26, absent: 1, late: 1, total: 28, rate: 92.9 },
  { department: 'Finance', present: 34, absent: 0, late: 1, total: 35, rate: 97.1 },
];

const attendanceDistribution = [
  { name: 'Present', value: 228, color: '#7FBA00' },
  { name: 'Late', value: 9, color: '#FFB900' },
  { name: 'Absent', value: 8, color: '#E81123' },
  { name: 'On Leave', value: 5, color: '#00A4EF' },
];

export const AttendanceReports = () => {
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportAllOpen, setIsExportAllOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');

  const handleViewDetails = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setIsDetailsOpen(true);
  };

  const totalPresent = mockAttendanceRecords.reduce((sum, r) => sum + r.present, 0);
  const totalAbsent = mockAttendanceRecords.reduce((sum, r) => sum + r.absent, 0);
  const totalLate = mockAttendanceRecords.reduce((sum, r) => sum + r.late, 0);
  const avgAttendanceRate = (mockAttendanceRecords.reduce((sum, r) => sum + r.attendanceRate, 0) / mockAttendanceRecords.length).toFixed(1);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Attendance Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Track and analyze employee attendance patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Attendance Rate</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgAttendanceRate}%</div>
              <div className="text-sm text-[#7FBA00] mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +2.3% from last week
              </div>
            </div>
            <div className="p-3 bg-[#7FBA00]/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Present</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalPresent}</div>
              <div className="text-sm text-[#00A4EF] mt-2">Across all records</div>
            </div>
            <div className="p-3 bg-[#00A4EF]/10 rounded-lg">
              <Users className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Late</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalLate}</div>
              <div className="text-sm text-[#FFB900] mt-2">Needs attention</div>
            </div>
            <div className="p-3 bg-[#FFB900]/10 rounded-lg">
              <Clock className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Absent</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalAbsent}</div>
              <div className="text-sm text-[#E81123] mt-2">Requires follow-up</div>
            </div>
            <div className="p-3 bg-[#E81123]/10 rounded-lg">
              <XCircle className="w-6 h-6 text-[#E81123]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#00A4EF]" />
            Weekly Attendance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#7FBA00" name="Present" strokeWidth={2} />
              <Line type="monotone" dataKey="absent" stroke="#E81123" name="Absent" strokeWidth={2} />
              <Line type="monotone" dataKey="late" stroke="#FFB900" name="Late" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Attendance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${((entry.value / attendanceDistribution.reduce((sum, e) => sum + e.value, 0)) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Department Attendance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentAttendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#7FBA00" name="Present" />
            <Bar dataKey="late" fill="#FFB900" name="Late" />
            <Bar dataKey="absent" fill="#E81123" name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Records</h2>
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4 text-gray-900 dark:text-white" />
              <span className="text-gray-900 dark:text-white">Filter</span>
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setIsExportAllOpen(true)}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export All
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Total Employees</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Present</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Absent</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Late</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">On Leave</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Attendance Rate</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAttendanceRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">
                    {new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{record.totalEmployees}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className="inline-flex items-center gap-1 text-[#7FBA00]">
                      <CheckCircle className="w-4 h-4" />
                      {record.present}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span className="inline-flex items-center gap-1 text-[#E81123]">
                      <XCircle className="w-4 h-4" />
                      {record.absent}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span className="inline-flex items-center gap-1 text-[#FFB900]">
                      <Clock className="w-4 h-4" />
                      {record.late}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{record.onLeave}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`font-semibold ${record.attendanceRate >= 95 ? 'text-[#7FBA00]' : record.attendanceRate >= 90 ? 'text-[#FFB900]' : 'text-[#E81123]'}`}>
                      {record.attendanceRate}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(record)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Attendance Record Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Record ID</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedRecord.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Date</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Date(selectedRecord.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</label>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedRecord.totalEmployees}</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Present</label>
                  <p className="text-2xl font-bold text-[#7FBA00]">{selectedRecord.present}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Absent</label>
                  <p className="text-2xl font-bold text-[#E81123]">{selectedRecord.absent}</p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Late</label>
                  <p className="text-2xl font-bold text-[#FFB900]">{selectedRecord.late}</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">On Leave</label>
                  <p className="text-2xl font-bold text-[#00A4EF]">{selectedRecord.onLeave}</p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-[#00A4EF]/10 to-[#0078D4]/10 rounded-lg">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance Rate</label>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{selectedRecord.attendanceRate}%</p>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#00A4EF] to-[#0078D4] h-2 rounded-full transition-all"
                    style={{ width: `${selectedRecord.attendanceRate}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDetailsOpen(false)}>Close</Button>
            <Button variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Filter Attendance Records</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option value="">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attendance Rate</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option value="">All Rates</option>
                <option value="high">≥ 95%</option>
                <option value="medium">90% - 94%</option>
                <option value="low">&lt; 90%</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsFilterOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export All Modal */}
      <Dialog open={isExportAllOpen} onOpenChange={setIsExportAllOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Export All Attendance Records</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Export Information</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    You are about to export {mockAttendanceRecords.length} attendance records with all associated data.
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Format
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    name="exportFormat"
                    value="pdf"
                    checked={exportFormat === 'pdf'}
                    onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel' | 'csv')}
                    className="text-[#00A4EF] focus:ring-[#00A4EF]"
                  />
                  <FileText className="w-5 h-5 text-red-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">PDF Document</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Comprehensive report with all charts</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    name="exportFormat"
                    value="excel"
                    checked={exportFormat === 'excel'}
                    onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel' | 'csv')}
                    className="text-[#00A4EF] focus:ring-[#00A4EF]"
                  />
                  <FileText className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Excel Spreadsheet</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">All data in structured format</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    name="exportFormat"
                    value="csv"
                    checked={exportFormat === 'csv'}
                    onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel' | 'csv')}
                    className="text-[#00A4EF] focus:ring-[#00A4EF]"
                  />
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">CSV File</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Raw data for external analysis</div>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-[#00A4EF] focus:ring-[#00A4EF]"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Include department breakdowns</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-[#00A4EF] focus:ring-[#00A4EF]"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Include trend analysis</span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsExportAllOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsExportAllOpen(false)}>
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttendanceReports;
