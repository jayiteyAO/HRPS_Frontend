
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
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Filter,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  PieChart,
  BarChart3,
  Eye,
  XCircle,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface PayrollRecord {
  id: string;
  month: string;
  year: number;
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
  employeeCount: number;
  status: 'processed' | 'pending' | 'approved' | 'rejected';
  processedDate: string;
  approvedBy?: string;
}

const mockPayrollRecords: PayrollRecord[] = [
  {
    id: 'PR-2024-01',
    month: 'January',
    year: 2024,
    totalGrossPay: 45500000,
    totalDeductions: 8500000,
    totalNetPay: 37000000,
    employeeCount: 245,
    status: 'approved',
    processedDate: '2024-01-31',
    approvedBy: 'Sarah Johnson'
  },
  {
    id: 'PR-2024-02',
    month: 'February',
    year: 2024,
    totalGrossPay: 46200000,
    totalDeductions: 8700000,
    totalNetPay: 37500000,
    employeeCount: 248,
    status: 'approved',
    processedDate: '2024-02-29',
    approvedBy: 'Sarah Johnson'
  },
  {
    id: 'PR-2024-03',
    month: 'March',
    year: 2024,
    totalGrossPay: 47800000,
    totalDeductions: 9100000,
    totalNetPay: 38700000,
    employeeCount: 252,
    status: 'processed',
    processedDate: '2024-03-31'
  },
  {
    id: 'PR-2024-04',
    month: 'April',
    year: 2024,
    totalGrossPay: 48500000,
    totalDeductions: 9300000,
    totalNetPay: 39200000,
    employeeCount: 255,
    status: 'pending',
    processedDate: '2024-04-30'
  },
];

const departmentPayrollData = [
  { department: 'Engineering', grossPay: 18500000, deductions: 3500000, netPay: 15000000, employees: 85 },
  { department: 'Sales', grossPay: 12300000, deductions: 2400000, netPay: 9900000, employees: 62 },
  { department: 'Marketing', grossPay: 8700000, deductions: 1700000, netPay: 7000000, employees: 45 },
  { department: 'HR', grossPay: 5200000, deductions: 1000000, netPay: 4200000, employees: 28 },
  { department: 'Finance', grossPay: 6800000, deductions: 1300000, netPay: 5500000, employees: 35 },
];

const deductionBreakdown = [
  { name: 'Income Tax', value: 4200000, color: '#00A4EF' },
  { name: 'Pension', value: 2800000, color: '#0078D4' },
  { name: 'NHF', value: 950000, color: '#50E6FF' },
  { name: 'Other Deductions', value: 550000, color: '#FFB900' },
];

const monthlyTrend = [
  { month: 'Oct', grossPay: 44200000, netPay: 36000000 },
  { month: 'Nov', grossPay: 44800000, netPay: 36500000 },
  { month: 'Dec', grossPay: 45500000, netPay: 37000000 },
  { month: 'Jan', grossPay: 46200000, netPay: 37500000 },
  { month: 'Feb', grossPay: 47800000, netPay: 38700000 },
  { month: 'Mar', grossPay: 48500000, netPay: 39200000 },
];

export const PayrollReports = () => {
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showExportAllModal, setShowExportAllModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');

  const formatCurrency = (amount: number) => {
    return `₵${new Intl.NumberFormat('en-GH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'processed':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'processed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const handleViewDetails = (record: PayrollRecord) => {
    setSelectedRecord(record);
    setShowDetailsModal(true);
  };

  const handleExport = (record: PayrollRecord) => {
    setSelectedRecord(record);
    setShowExportModal(true);
  };

  const handleApprove = (record: PayrollRecord) => {
    setSelectedRecord(record);
    setShowApprovalModal(true);
  };

  const totalGrossPay = mockPayrollRecords.reduce((sum, r) => sum + r.totalGrossPay, 0);
  const totalDeductions = mockPayrollRecords.reduce((sum, r) => sum + r.totalDeductions, 0);
  const totalNetPay = mockPayrollRecords.reduce((sum, r) => sum + r.totalNetPay, 0);
  const avgEmployeeCount = Math.round(mockPayrollRecords.reduce((sum, r) => sum + r.employeeCount, 0) / mockPayrollRecords.length);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
              Payroll Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Comprehensive payroll analytics and reports
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter className="w-4 h-4 text-gray-900 dark:text-white" />
              <span className="text-gray-900 dark:text-white">Filter</span>
            </Button>
            <Button
              onClick={() => setShowExportAllModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#00A4EF] text-white rounded-sm hover:bg-[#0078D4]"
            >
              <Download className="w-4 h-4" />
              <span>Export All</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Gross Pay (YTD)</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalGrossPay)}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>↑ 8.5% from last quarter</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <DollarSign className="w-6 h-6 text-[#00A4EF]" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Deductions</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalDeductions)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {((totalDeductions / totalGrossPay) * 100).toFixed(1)}% of gross pay
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <AlertCircle className="w-6 h-6 text-[#FF8C00]" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Net Pay (YTD)</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalNetPay)}
              </div>
              <div className="text-sm text-[#00A4EF] mt-2">Across {mockPayrollRecords.length} pay periods</div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-6 h-6 text-[#7FBA00]" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Employees</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{avgEmployeeCount}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Per pay period</div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="w-6 h-6 text-[#8661C5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Trend Chart */}
        <div className="p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#00A4EF]" />
              Monthly Payroll Trend
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" tickFormatter={(value) => `₵${(value / 1000000).toFixed(0)}M`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
              />
              <Legend />
              <Line type="monotone" dataKey="grossPay" stroke="#00A4EF" strokeWidth={2} name="Gross Pay" />
              <Line type="monotone" dataKey="netPay" stroke="#7FBA00" strokeWidth={2} name="Net Pay" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Deduction Breakdown Chart */}
        <div className="p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#00A4EF]" />
              Deduction Breakdown
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={deductionBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {deductionBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        {/* Department Payroll Chart */}
        <div className="p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#00A4EF]" />
              Department Payroll Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPayrollData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="department" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" tickFormatter={(value) => `₵${(value / 1000000).toFixed(0)}M`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="grossPay" fill="#00A4EF" name="Gross Pay" />
              <Bar dataKey="deductions" fill="#FF8C00" name="Deductions" />
              <Bar dataKey="netPay" fill="#7FBA00" name="Net Pay" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payroll Records Table */}
      <div className="p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payroll Records</h2>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowFilterModal(true)}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="secondary" onClick={() => setShowExportAllModal(true)}>
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Gross Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockPayrollRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {record.month} {record.year}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{record.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">{record.employeeCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(record.totalGrossPay)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-orange-600 dark:text-orange-400">
                      {formatCurrency(record.totalDeductions)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(record.totalNetPay)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(record)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-blue-600 dark:text-blue-400"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleExport(record)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-600 dark:text-gray-400"
                        title="Export"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {record.status === 'processed' && (
                        <button
                          onClick={() => handleApprove(record)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-green-600 dark:text-green-400"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Payroll Details - {selectedRecord?.month} {selectedRecord?.year}
            </DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Payroll ID</div>
                    <div className="text-base font-medium text-gray-900 dark:text-white">{selectedRecord.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Pay Period</div>
                    <div className="text-base font-medium text-gray-900 dark:text-white">
                      {selectedRecord.month} {selectedRecord.year}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Number of Employees</div>
                    <div className="text-base font-medium text-gray-900 dark:text-white">{selectedRecord.employeeCount}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                      {getStatusIcon(selectedRecord.status)}
                      {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Processed Date</div>
                    <div className="text-base font-medium text-gray-900 dark:text-white">
                      {new Date(selectedRecord.processedDate).toLocaleDateString()}
                    </div>
                  </div>
                  {selectedRecord.approvedBy && (
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Approved By</div>
                      <div className="text-base font-medium text-gray-900 dark:text-white">{selectedRecord.approvedBy}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Financial Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Gross Pay</span>
                    <span className="text-lg font-bold text-[#00A4EF]">{formatCurrency(selectedRecord.totalGrossPay)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Deductions</span>
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      - {formatCurrency(selectedRecord.totalDeductions)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Net Pay</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(selectedRecord.totalNetPay)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Department Breakdown</h4>
                <div className="space-y-2">
                  {departmentPayrollData.map((dept) => (
                    <div key={dept.department} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{dept.department}</span>
                        <span className="text-xs text-gray-500">({dept.employees} employees)</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(dept.netPay)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleExport(selectedRecord!)}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Modal */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Export Payroll Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
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
                    <div className="text-xs text-gray-500 dark:text-gray-400">Formatted report with charts</div>
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
                    <div className="text-xs text-gray-500 dark:text-gray-400">Detailed data with formulas</div>
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
                    <div className="text-xs text-gray-500 dark:text-gray-400">Raw data for import</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowExportModal(false)}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Modal */}
      <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Approve Payroll</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Approval Confirmation</div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    You are about to approve the payroll for {selectedRecord?.month} {selectedRecord?.year}.
                    This action will process payments for {selectedRecord?.employeeCount} employees.
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Net Pay</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(selectedRecord?.totalNetPay || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Employee Count</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedRecord?.employeeCount}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowApprovalModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowApprovalModal(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve & Process
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Filter Payroll Records</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent">
                <option value="">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent">
                <option value="">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="processed">Processed</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">From</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">To</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Employee Count Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Min</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Max</label>
                  <input
                    type="number"
                    placeholder="1000"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
              Reset
            </Button>
            <Button variant="primary" onClick={() => setShowFilterModal(false)}>
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export All Modal */}
      <Dialog open={showExportAllModal} onOpenChange={setShowExportAllModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Export All Payroll Records</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Export Information</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    You are about to export {mockPayrollRecords.length} payroll records with all associated data.
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
                    name="exportAllFormat"
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
                    name="exportAllFormat"
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
                    name="exportAllFormat"
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
                <span className="text-sm text-gray-700 dark:text-gray-300">Include deduction details</span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowExportAllModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowExportAllModal(false)}>
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayrollReports;
