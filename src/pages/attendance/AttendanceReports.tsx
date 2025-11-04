import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { FormModal } from '@/components/FormModal';
import { FileTextIcon, DownloadIcon, CalendarIcon, TrendingUpIcon, EyeIcon, FilterIcon, PrintIcon } from '@/components/Icons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Report {
  id: string;
  name: string;
  type: string;
  period: string;
  generatedDate: string;
  status: string;
}

export const AttendanceReports = () => {
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerateOpen(false);
  };

  const reports: Report[] = [
    { id: 'RPT001', name: 'Monthly Attendance Summary', type: 'Summary', period: 'October 2024', generatedDate: '2024-11-01', status: 'Completed' },
    { id: 'RPT002', name: 'Department Attendance Report', type: 'Department', period: 'Q3 2024', generatedDate: '2024-10-28', status: 'Completed' },
    { id: 'RPT003', name: 'Late Arrivals Report', type: 'Violation', period: 'October 2024', generatedDate: '2024-11-01', status: 'Completed' },
    { id: 'RPT004', name: 'Overtime Hours Report', type: 'Overtime', period: 'October 2024', generatedDate: '2024-10-30', status: 'Completed' },
    { id: 'RPT005', name: 'Absence Analysis', type: 'Analysis', period: 'September 2024', generatedDate: '2024-10-01', status: 'Completed' },
    { id: 'RPT006', name: 'Perfect Attendance Report', type: 'Recognition', period: 'October 2024', generatedDate: '2024-11-01', status: 'Processing' },
  ];

  const handleView = (report: Report) => {
    setSelectedReport(report);
    setIsViewOpen(true);
  };

  const handleDownload = (report: Report) => {
    setSelectedReport(report);
    setIsDownloadOpen(true);
  };

  const handleExport = (report: Report) => {
    setSelectedReport(report);
    setIsExportOpen(true);
  };

  const handlePrint = (report: Report) => {
    setSelectedReport(report);
    setIsPrintOpen(true);
  };

  // Chart data
  const attendanceTrendData = [
    { date: 'Week 1', attendance: 92, target: 95 },
    { date: 'Week 2', attendance: 94, target: 95 },
    { date: 'Week 3', attendance: 91, target: 95 },
    { date: 'Week 4', attendance: 96, target: 95 },
    { date: 'Week 5', attendance: 94, target: 95 },
  ];

  const departmentAttendanceData = [
    { department: 'Engineering', attendance: 95 },
    { department: 'HR', attendance: 92 },
    { department: 'Sales', attendance: 88 },
    { department: 'Marketing', attendance: 94 },
    { department: 'Finance', attendance: 96 },
  ];

  const attendanceStatusData = [
    { name: 'Present', value: 142, color: '#7FBA00' },
    { name: 'Late', value: 8, color: '#FFB900' },
    { name: 'Absent', value: 4, color: '#E81123' },
    { name: 'On Leave', value: 2, color: '#00A4EF' },
  ];

  const COLORS = ['#7FBA00', '#FFB900', '#E81123', '#00A4EF'];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Attendance Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Generate and manage attendance reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Reports</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">48</div>
              <div className="text-sm text-[#7FBA00] mt-2">↑ 8 this month</div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileTextIcon size={24} className="text-[#0078D4]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">This Month</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">12</div>
              <div className="text-sm text-[#00A4EF] mt-2">Generated</div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CalendarIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Downloads</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">156</div>
              <div className="text-sm text-[#FFB900] mt-2">This quarter</div>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <DownloadIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Attendance</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">94.2%</div>
              <div className="text-sm text-[#7FBA00] mt-2">↑ 2.1% increase</div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUpIcon size={24} className="text-[#8661C1]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Attendance Trend Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Attendance Trend (5 Weeks)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                domain={[85, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#0078D4" 
                strokeWidth={2}
                name="Attendance %"
                dot={{ fill: '#0078D4', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#7FBA00" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target %"
                dot={{ fill: '#7FBA00', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Attendance Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Department Attendance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="department" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                domain={[80, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Bar 
                dataKey="attendance" 
                fill="#0078D4"
                name="Attendance %"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Status Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Attendance Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => {
                  const { name, percent } = props;
                  return `${name} ${(percent * 100).toFixed(0)}%`;
                }}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceStatusData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                  color: '#F9FAFB'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {attendanceStatusData.map((status, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: status.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {status.name}: <span className="font-medium text-gray-900 dark:text-white">{status.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Comparison Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Attendance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { month: 'Jul', present: 92, late: 5, absent: 3 },
              { month: 'Aug', present: 94, late: 4, absent: 2 },
              { month: 'Sep', present: 91, late: 6, absent: 3 },
              { month: 'Oct', present: 95, late: 3, absent: 2 },
              { month: 'Nov', present: 94, late: 4, absent: 2 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Bar dataKey="present" stackId="a" fill="#7FBA00" name="Present %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="late" stackId="a" fill="#FFB900" name="Late %" />
              <Bar dataKey="absent" stackId="a" fill="#E81123" name="Absent %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports History</h2>
          <div className="flex gap-3">
            <Button 
              variant="secondary"
              onClick={() => setIsGenerateOpen(true)}
              className="flex items-center gap-2"
            >
              <FilterIcon size={16} />
              <span>Filter Reports</span>
            </Button>
            <Button 
              variant="primary"
              onClick={() => setIsGenerateOpen(true)}
              className="flex items-center gap-2"
            >
              <FileTextIcon size={16} />
              <span>Generate Report</span>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Report ID</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Report Name</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Period</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Generated Date</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">{report.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{report.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{report.type}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{report.period}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{report.generatedDate}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${
                      report.status === 'Completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(report)}
                        className="bg-[#0078D4] hover:bg-[#106EBE] text-white flex items-center gap-1.5"
                      >
                        <EyeIcon size={14} />
                        <span>View</span>
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleDownload(report)}
                        className="bg-[#7FBA00] hover:bg-[#6FA000] text-white flex items-center gap-1.5"
                      >
                        <DownloadIcon size={14} />
                        <span>Download</span>
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleExport(report)}
                        className="bg-[#00A4EF] hover:bg-[#0090D1] text-white flex items-center gap-1.5"
                      >
                        <FileTextIcon size={14} />
                        <span>Export</span>
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handlePrint(report)}
                        className="flex items-center gap-1.5"
                      >
                        <PrintIcon size={14} />
                        <span>Print</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Report Dialog */}
      <FormModal
        isOpen={isGenerateOpen}
        onClose={() => setIsGenerateOpen(false)}
        onSubmit={handleSubmit}
        title="Generate Attendance Report"
        submitText="Generate Report"
        size="lg"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">Report Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4] focus:border-transparent"
              placeholder="Enter report name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">Report Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4] focus:border-transparent">
              <option value="">Select report type</option>
              <option value="summary">Summary Report</option>
              <option value="department">Department Report</option>
              <option value="violation">Violation Report</option>
              <option value="overtime">Overtime Report</option>
              <option value="analysis">Analysis Report</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4] focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4] focus:border-transparent"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">Department (Optional)</label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4] focus:border-transparent">
              <option value="">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="hr">Human Resources</option>
              <option value="sales">Sales</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">Export Format</label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4] focus:border-transparent">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
      </FormModal>

      {/* View Report Dialog */}
      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Report Details"
        size="lg"
      >
        {selectedReport && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Report ID</label>
                <p className="text-gray-900 dark:text-white font-medium mt-1">{selectedReport.id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Status</label>
                <p className="text-gray-900 dark:text-white font-medium mt-1">{selectedReport.status}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Report Name</label>
                <p className="text-gray-900 dark:text-white font-medium mt-1">{selectedReport.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Type</label>
                <p className="text-gray-900 dark:text-white font-medium mt-1">{selectedReport.type}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Period</label>
                <p className="text-gray-900 dark:text-white font-medium mt-1">{selectedReport.period}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Generated Date</label>
                <p className="text-gray-900 dark:text-white font-medium mt-1">{selectedReport.generatedDate}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Report Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Employees</span>
                  <span className="font-medium text-gray-900 dark:text-white">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average Attendance</span>
                  <span className="font-medium text-gray-900 dark:text-white">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Late Arrivals</span>
                  <span className="font-medium text-gray-900 dark:text-white">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Absences</span>
                  <span className="font-medium text-gray-900 dark:text-white">12</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button variant="secondary" onClick={() => setIsViewOpen(false)} className="flex items-center gap-2">
                <span>Close</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Download Report Dialog */}
      <FormModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onSubmit={(e) => { e.preventDefault(); setIsDownloadOpen(false); }}
        title="Download Report"
        submitText="Download"
      >
        {selectedReport && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Download report: <span className="font-medium text-gray-900 dark:text-white">{selectedReport.name}</span>
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Select Format</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4] focus:border-transparent">
                <option value="pdf">PDF Document</option>
                <option value="excel">Excel Spreadsheet</option>
                <option value="csv">CSV File</option>
                <option value="word">Word Document</option>
              </select>
            </div>
          </div>
        )}
      </FormModal>

      {/* Export Report Dialog */}
      <FormModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onSubmit={(e) => { e.preventDefault(); setIsExportOpen(false); }}
        title="Export Report"
        submitText="Export"
      >
        {selectedReport && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Export report: <span className="font-medium text-gray-900 dark:text-white">{selectedReport.name}</span>
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Export Format</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4] focus:border-transparent">
                <option value="csv">CSV (Comma Separated)</option>
                <option value="excel">Excel (.xlsx)</option>
                <option value="json">JSON</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Export Options</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Include summary statistics
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Include employee details
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input type="checkbox" className="rounded" />
                  Include charts and graphs
                </label>
              </div>
            </div>
          </div>
        )}
      </FormModal>

      {/* Print Report Dialog */}
      <FormModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        onSubmit={(e) => { e.preventDefault(); setIsPrintOpen(false); }}
        title="Print Report"
        submitText="Print"
      >
        {selectedReport && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Print report: <span className="font-medium text-gray-900 dark:text-white">{selectedReport.name}</span>
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Page Layout</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4] focus:border-transparent">
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Paper Size</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078D4] focus:border-transparent">
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-white">Print Options</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Include header and footer
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Print in color
                </label>
              </div>
            </div>
          </div>
        )}
      </FormModal>
    </div>
  );
};

export default AttendanceReports;
