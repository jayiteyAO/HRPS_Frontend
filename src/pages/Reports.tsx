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
} from '@/components/Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

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

export const Reports: React.FC = () => {
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
        <DialogContent className="bg-white dark:bg-gray-900 max-w-lg">
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
        <DialogContent className="bg-white dark:bg-gray-900 max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Custom Report</DialogTitle>
          </DialogHeader>
          
          <div className="py-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Report Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customReportName}
                  onChange={(e) => setCustomReportName(e.target.value)}
                  placeholder="e.g., Q4 Performance Analysis"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={customReportCategory}
                  onChange={(e) => setCustomReportCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="Workforce">Workforce</option>
                  <option value="Finance">Finance</option>
                  <option value="Attendance">Attendance</option>
                  <option value="Performance">Performance</option>
                  <option value="Leave">Leave</option>
                  <option value="Learning">Learning</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Data Sources <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { id: 'employees', label: 'Employee Records', icon: '👥' },
                  { id: 'payroll', label: 'Payroll Data', icon: '💰' },
                  { id: 'attendance', label: 'Attendance Logs', icon: '📅' },
                  { id: 'performance', label: 'Performance Reviews', icon: '⭐' },
                  { id: 'leave', label: 'Leave Records', icon: '🏖️' },
                  { id: 'training', label: 'Training Data', icon: '📚' },
                ].map((source) => (
                  <label
                    key={source.id}
                    className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${
                      selectedDataSources.includes(source.id)
                        ? 'border-[#00A4EF] bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDataSources.includes(source.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDataSources([...selectedDataSources, source.id]);
                        } else {
                          setSelectedDataSources(selectedDataSources.filter(s => s !== source.id));
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-xl">{source.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{source.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Metrics to Include <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[
                  'Headcount',
                  'Turnover Rate',
                  'Average Salary',
                  'Attendance Rate',
                  'Overtime Hours',
                  'Leave Balance',
                  'Performance Score',
                  'Training Hours',
                  'Diversity Ratio',
                  'Cost per Hire',
                  'Time to Fill',
                  'Engagement Score',
                ].map((metric) => (
                  <label
                    key={metric}
                    className={`flex items-center gap-2 p-3 border rounded-sm cursor-pointer transition-colors ${
                      selectedMetrics.includes(metric)
                        ? 'border-[#7FBA00] bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
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
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{metric}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Filters & Grouping
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  'By Department',
                  'By Location',
                  'By Job Level',
                  'By Employment Type',
                  'By Gender',
                  'By Age Group',
                ].map((filter) => (
                  <label
                    key={filter}
                    className={`flex items-center gap-2 p-3 border rounded-sm cursor-pointer transition-colors ${
                      selectedFilters.includes(filter)
                        ? 'border-[#FFB900] bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
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
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{filter}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date Range
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>Year to Date</option>
                  <option>Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Export Format
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>PDF</option>
                  <option>Excel (.xlsx)</option>
                  <option>CSV</option>
                  <option>JSON</option>
                  <option>PowerPoint (.pptx)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Description (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Add a description for this report..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-sm p-5">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Report Preview</h4>
              <div className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Name:</strong> {customReportName || 'Untitled Report'}</p>
                <p><strong>Category:</strong> {customReportCategory}</p>
                <p><strong>Data Sources:</strong> {selectedDataSources.length > 0 ? selectedDataSources.length + ' selected' : 'None selected'}</p>
                <p><strong>Metrics:</strong> {selectedMetrics.length > 0 ? selectedMetrics.length + ' selected' : 'None selected'}</p>
                <p><strong>Filters:</strong> {selectedFilters.length > 0 ? selectedFilters.length + ' selected' : 'None'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="saveTemplate" className="w-4 h-4" />
              <label htmlFor="saveTemplate" className="text-sm text-gray-700 dark:text-gray-300">
                Save as template for future use
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="scheduleReport" className="w-4 h-4" />
              <label htmlFor="scheduleReport" className="text-sm text-gray-700 dark:text-gray-300">
                Schedule this report to run automatically
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => {
              setShowCustomReportDialog(false);
              setCustomReportName('');
              setSelectedDataSources([]);
              setSelectedMetrics([]);
              setSelectedFilters([]);
            }}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setShowCustomReportDialog(false)}
              disabled={!customReportName || selectedDataSources.length === 0 || selectedMetrics.length === 0}
            >
              <DownloadIcon size={16} />
              <span>Generate Report</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
