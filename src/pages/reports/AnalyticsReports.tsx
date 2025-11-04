import { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import {
  ChartIcon,
  DownloadIcon,
  FilterIcon,
  CalendarIcon,
  EyeIcon,
  PlusIcon,
  ClockIcon,
  FileTextIcon,
} from '@/components/Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Report {
  id: string;
  name: string;
  category: string;
  description: string;
  lastRun: string;
  frequency: string;
  format: string;
  size: string;
  status: 'Completed' | 'Scheduled' | 'Failed';
  downloads: number;
}

export const AnalyticsReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [showCustomReportDialog, setShowCustomReportDialog] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [customReportName, setCustomReportName] = useState('');
  const [customReportCategory, setCustomReportCategory] = useState('Workforce');
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const reports: Report[] = [
    {
      id: 'RPT001',
      name: 'Employee Headcount Report',
      category: 'Workforce',
      description: 'Comprehensive employee count by department, location, and status',
      lastRun: '2025-11-03',
      frequency: 'Monthly',
      format: 'PDF',
      size: '2.3 MB',
      status: 'Completed',
      downloads: 24,
    },
    {
      id: 'RPT002',
      name: 'Payroll Summary Report',
      category: 'Finance',
      description: 'Detailed payroll breakdown including salaries, deductions, and taxes',
      lastRun: '2025-11-01',
      frequency: 'Monthly',
      format: 'Excel',
      size: '5.1 MB',
      status: 'Completed',
      downloads: 42,
    },
    {
      id: 'RPT003',
      name: 'Attendance Analytics',
      category: 'Attendance',
      description: 'Daily attendance patterns, tardiness, and absence trends',
      lastRun: '2025-11-02',
      frequency: 'Weekly',
      format: 'PDF',
      size: '1.8 MB',
      status: 'Completed',
      downloads: 18,
    },
    {
      id: 'RPT004',
      name: 'Performance Reviews',
      category: 'Performance',
      description: 'Employee performance ratings and review outcomes',
      lastRun: '2025-10-28',
      frequency: 'Quarterly',
      format: 'Excel',
      size: '3.2 MB',
      status: 'Completed',
      downloads: 15,
    },
    {
      id: 'RPT005',
      name: 'Leave Balance Report',
      category: 'Leave',
      description: 'Current leave balances and utilization by employee',
      lastRun: '2025-11-04',
      frequency: 'Monthly',
      format: 'PDF',
      size: '1.5 MB',
      status: 'Completed',
      downloads: 32,
    },
    {
      id: 'RPT006',
      name: 'Training Completion',
      category: 'Learning',
      description: 'Course completion rates and learning progress tracking',
      lastRun: '2025-10-30',
      frequency: 'Monthly',
      format: 'Excel',
      size: '2.1 MB',
      status: 'Scheduled',
      downloads: 12,
    },
  ];

  const totalReports = reports.length;
  const completedReports = reports.filter(r => r.status === 'Completed').length;
  const scheduledReports = reports.filter(r => r.status === 'Scheduled').length;
  const totalDownloads = reports.reduce((sum, r) => sum + r.downloads, 0);

  const reportsByCategory = [
    { name: 'Workforce', value: reports.filter(r => r.category === 'Workforce').length, color: '#00A4EF' },
    { name: 'Finance', value: reports.filter(r => r.category === 'Finance').length, color: '#7FBA00' },
    { name: 'Attendance', value: reports.filter(r => r.category === 'Attendance').length, color: '#FFB900' },
    { name: 'Performance', value: reports.filter(r => r.category === 'Performance').length, color: '#F25022' },
    { name: 'Leave', value: reports.filter(r => r.category === 'Leave').length, color: '#8764B8' },
    { name: 'Learning', value: reports.filter(r => r.category === 'Learning').length, color: '#00BCF2' },
  ].filter(c => c.value > 0);

  const monthlyReportData = [
    { month: 'Jul', generated: 15 },
    { month: 'Aug', generated: 18 },
    { month: 'Sep', generated: 22 },
    { month: 'Oct', generated: 20 },
    { month: 'Nov', generated: 17 },
  ];

  const downloadTrendData = [
    { week: 'Week 1', downloads: 45 },
    { week: 'Week 2', downloads: 58 },
    { week: 'Week 3', downloads: 62 },
    { week: 'Week 4', downloads: 71 },
  ];

  const categories = ['All', 'Workforce', 'Finance', 'Attendance', 'Performance', 'Leave', 'Learning'];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeCategory === 'All' || report.category === activeCategory;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setShowDetailsDialog(true);
  };

  const handleGenerate = (report: Report) => {
    setSelectedReport(report);
    setShowGenerateDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <ChartIcon size={32} className="text-[#00A4EF]" />
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate insights and export comprehensive reports
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <Button variant="primary" onClick={() => setShowCustomReportDialog(true)}>
            <PlusIcon size={16} />
            <span>Custom Report</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Reports</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalReports}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Available</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileTextIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{completedReports}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Recently run</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ChartIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Scheduled</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{scheduledReports}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Upcoming</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <ClockIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </Card>

        <Card padding={false} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Downloads</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalDownloads}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">This month</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <DownloadIcon size={24} className="text-[#8764B8]" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">By Category</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Report distribution</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={reportsByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {reportsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Report Generation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Monthly activity</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyReportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="generated" fill="#00A4EF" name="Reports Generated" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card padding={false} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Download Trend</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Weekly downloads</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={downloadTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="downloads" stroke="#7FBA00" strokeWidth={2} name="Downloads" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-sm font-medium ${
                  activeCategory === category
                    ? 'bg-[#00A4EF] text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
            />
            <FilterIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <div className={`h-20 flex items-center justify-center ${
                report.status === 'Completed' ? 'bg-gradient-to-br from-[#7FBA00] to-[#5a8700]' :
                report.status === 'Scheduled' ? 'bg-gradient-to-br from-[#00A4EF] to-[#0078D4]' :
                'bg-gradient-to-br from-[#F25022] to-[#d84315]'
              }`}>
                <ChartIcon size={32} className="text-white opacity-80" />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant={
                      report.status === 'Completed' ? 'success' :
                      report.status === 'Scheduled' ? 'warning' : 'danger'
                    }
                    size="sm"
                  >
                    {report.status}
                  </Badge>
                  <Badge variant="info" size="sm">{report.category}</Badge>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {report.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {report.description}
                </p>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <CalendarIcon size={14} />
                    <span>Last run: {new Date(report.lastRun).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <ClockIcon size={14} />
                    <span>Frequency: {report.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <DownloadIcon size={14} />
                    <span>{report.downloads} downloads</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <Badge variant="default" size="sm">{report.format}</Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{report.size}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleGenerate(report)}
                  >
                    Generate
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewDetails(report)}
                  >
                    <EyeIcon size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <ChartIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No reports found</p>
          </div>
        )}
      </Card>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4 py-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedReport.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {selectedReport.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Report ID</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedReport.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Frequency</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedReport.frequency}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button variant="primary">
              <DownloadIcon size={16} />
              <span>Generate Now</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="py-4 space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Generate <span className="font-semibold">{selectedReport.name}</span>?
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date Range
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Last Year</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowGenerateDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowGenerateDialog(false)}>
              <DownloadIcon size={16} />
              <span>Generate & Download</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCustomReportDialog} onOpenChange={setShowCustomReportDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Custom Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Report Name
                </label>
                <input
                  type="text"
                  value={customReportName}
                  onChange={(e) => setCustomReportName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter report name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={customReportCategory}
                  onChange={(e) => setCustomReportCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option>Workforce</option>
                  <option>Finance</option>
                  <option>Attendance</option>
                  <option>Performance</option>
                  <option>Leave</option>
                  <option>Learning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date Range
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Last Week</option>
                  <option>Last Month</option>
                  <option>Last Quarter</option>
                  <option>Last Year</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Sources
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Employees', 'Departments', 'Payroll', 'Attendance', 'Performance', 'Leave'].map((source) => (
                  <label key={source} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDataSources.includes(source)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDataSources([...selectedDataSources, source]);
                        } else {
                          setSelectedDataSources(selectedDataSources.filter(s => s !== source));
                        }
                      }}
                      className="w-4 h-4 text-[#00A4EF] border-gray-300 rounded focus:ring-[#00A4EF]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Metrics
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Count', 'Average', 'Sum', 'Percentage', 'Trend', 'Comparison'].map((metric) => (
                  <label key={metric} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMetrics.includes(metric)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMetrics([...selectedMetrics, metric]);
                        } else {
                          setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
                        }
                      }}
                      className="w-4 h-4 text-[#00A4EF] border-gray-300 rounded focus:ring-[#00A4EF]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{metric}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filters
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['By Department', 'By Location', 'By Status', 'By Role'].map((filter) => (
                  <label key={filter} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters([...selectedFilters, filter]);
                        } else {
                          setSelectedFilters(selectedFilters.filter(f => f !== filter));
                        }
                      }}
                      className="w-4 h-4 text-[#00A4EF] border-gray-300 rounded focus:ring-[#00A4EF]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{filter}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Export Format
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    defaultChecked
                    className="w-4 h-4 text-[#00A4EF] border-gray-300 focus:ring-[#00A4EF]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">PDF</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    className="w-4 h-4 text-[#00A4EF] border-gray-300 focus:ring-[#00A4EF]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Excel</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    className="w-4 h-4 text-[#00A4EF] border-gray-300 focus:ring-[#00A4EF]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">CSV</span>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowCustomReportDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowCustomReportDialog(false)}>
              <PlusIcon size={16} />
              <span>Create Report</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnalyticsReports;
