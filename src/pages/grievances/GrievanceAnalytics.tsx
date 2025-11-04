
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle, Clock, FileText, Download, Filter } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', total: 45, resolved: 38, pending: 7 },
  { month: 'Feb', total: 52, resolved: 41, pending: 11 },
  { month: 'Mar', total: 48, resolved: 45, pending: 3 },
  { month: 'Apr', total: 61, resolved: 52, pending: 9 },
  { month: 'May', total: 58, resolved: 50, pending: 8 },
  { month: 'Jun', total: 65, resolved: 58, pending: 7 },
];

const categoryData = [
  { name: 'Harassment', value: 28, color: '#FF6B6B' },
  { name: 'Discrimination', value: 22, color: '#FFB900' },
  { name: 'Workplace Safety', value: 18, color: '#00A4EF' },
  { name: 'Policy Violation', value: 15, color: '#7FBA00' },
  { name: 'Others', value: 12, color: '#8E8E93' },
];

const resolutionTimeData = [
  { range: '0-7 days', count: 45 },
  { range: '8-14 days', count: 32 },
  { range: '15-21 days', count: 18 },
  { range: '22-30 days', count: 12 },
  { range: '30+ days', count: 8 },
];

const departmentData = [
  { department: 'Sales', total: 24, resolved: 20, pending: 4, avgResolutionDays: 8 },
  { department: 'Engineering', total: 32, resolved: 28, pending: 4, avgResolutionDays: 10 },
  { department: 'HR', total: 15, resolved: 14, pending: 1, avgResolutionDays: 6 },
  { department: 'Marketing', total: 18, resolved: 15, pending: 3, avgResolutionDays: 9 },
  { department: 'Operations', total: 21, resolved: 18, pending: 3, avgResolutionDays: 11 },
  { department: 'Finance', total: 12, resolved: 11, pending: 1, avgResolutionDays: 7 },
];

export const GrievanceAnalytics = () => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<any>(null);

  const handleExport = () => {
    console.log('Exporting analytics data...');
    setExportDialogOpen(false);
  };

  const handleFilter = () => {
    console.log('Applying filters...');
    setFilterDialogOpen(false);
  };

  const handleViewDetails = (dept: any) => {
    setSelectedDept(dept);
    setDetailDialogOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
          Grievance Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Comprehensive analytics and insights on grievance management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Grievances</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">324</div>
              <div className="text-sm text-[#7FBA00] mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>↑ 12% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Resolved</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">276</div>
              <div className="text-sm text-[#7FBA00] mt-2">85% resolution rate</div>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">48</div>
              <div className="text-sm text-[#FFB900] mt-2">Needs attention</div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#FFB900]" />
            </div>
          </div>
        </div>

        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Resolution Time</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">9.2</div>
              <div className="text-sm text-[#00A4EF] mt-2">days</div>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-[#8661C5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <Button 
          variant="primary" 
          onClick={() => setFilterDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filter Data</span>
        </Button>
        <Button 
          variant="success" 
          onClick={() => setExportDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </Button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trends */}
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#00A4EF]" />
            Monthly Grievance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Legend />
              <Bar dataKey="total" fill="#00A4EF" name="Total" />
              <Bar dataKey="resolved" fill="#7FBA00" name="Resolved" />
              <Bar dataKey="pending" fill="#FFB900" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00A4EF]" />
            Grievance Categories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Resolution Time Distribution */}
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#00A4EF]" />
            Resolution Time Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resolutionTimeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="range" type="category" stroke="#9CA3AF" width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="count" fill="#8661C5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cumulative Trend */}
        <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00A4EF]" />
            Resolution Rate Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="resolved" stroke="#7FBA00" strokeWidth={2} name="Resolved" />
              <Line type="monotone" dataKey="pending" stroke="#FFB900" strokeWidth={2} name="Pending" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Analytics Table */}
      <div className="p-6 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#00A4EF]" />
            Department-wise Analytics
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Department</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Total Grievances</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Resolved</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Pending</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Avg Resolution (days)</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.map((dept, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{dept.department}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{dept.total}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-[#7FBA00] text-xs font-semibold">
                      {dept.resolved}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-[#FFB900] text-xs font-semibold">
                      {dept.pending}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{dept.avgResolutionDays}</td>
                  <td className="py-4 px-4 text-sm">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleViewDetails(dept)}
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Details</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-[#00A4EF]" />
              <span>Export Analytics Report</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Format
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                />
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]"
                />
              </div>
            </div>
            <div className="flex gap-4 justify-end pt-4">
              <Button variant="secondary" onClick={() => setExportDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={handleExport} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#00A4EF]" />
              <span>Filter Analytics Data</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]">
                <option value="">All Departments</option>
                <option>Sales</option>
                <option>Engineering</option>
                <option>HR</option>
                <option>Marketing</option>
                <option>Operations</option>
                <option>Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]">
                <option value="">All Statuses</option>
                <option>Resolved</option>
                <option>Pending</option>
                <option>In Progress</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF]">
                <option value="">All Categories</option>
                <option>Harassment</option>
                <option>Discrimination</option>
                <option>Workplace Safety</option>
                <option>Policy Violation</option>
                <option>Others</option>
              </select>
            </div>
            <div className="flex gap-4 justify-end pt-4">
              <Button variant="secondary" onClick={() => setFilterDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleFilter} className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Apply Filters</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#00A4EF]" />
              <span>Department Details: {selectedDept?.department}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedDept && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Grievances</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDept.total}</div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Resolution Rate</div>
                  <div className="text-2xl font-bold text-[#7FBA00]">
                    {((selectedDept.resolved / selectedDept.total) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pending Cases</div>
                  <div className="text-2xl font-bold text-[#FFB900]">{selectedDept.pending}</div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Resolution Time</div>
                  <div className="text-2xl font-bold text-[#00A4EF]">{selectedDept.avgResolutionDays} days</div>
                </div>
              </div>
              <div className="flex gap-4 justify-end pt-4">
                <Button variant="secondary" onClick={() => setDetailDialogOpen(false)}>
                  Close
                </Button>
                <Button variant="success" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Export Department Report</span>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GrievanceAnalytics;
