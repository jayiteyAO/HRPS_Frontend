import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ClockIcon, UserIcon, SearchIcon, CheckCircleIcon, XCircleIcon, UsersIcon, FilterIcon, DownloadIcon, EyeIcon, ChartIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/Button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
  status: 'success' | 'failed';
}

const AuditTrail: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [filterModule, setFilterModule] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isChartsOpen, setIsChartsOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2025-11-03 10:23:45',
      user: 'John Doe',
      role: 'HR Admin',
      action: 'CREATE',
      module: 'Employee Management',
      details: 'Created new employee record for Sarah Williams',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: '2',
      timestamp: '2025-11-03 10:15:32',
      user: 'Jane Smith',
      role: 'Payroll Manager',
      action: 'UPDATE',
      module: 'Payroll',
      details: 'Updated salary for employee ID: EMP-2024-001',
      ipAddress: '192.168.1.101',
      status: 'success'
    },
    {
      id: '3',
      timestamp: '2025-11-03 09:45:12',
      user: 'Mike Johnson',
      role: 'HR Manager',
      action: 'APPROVE',
      module: 'Leave Management',
      details: 'Approved annual leave request for John Doe',
      ipAddress: '192.168.1.102',
      status: 'success'
    },
    {
      id: '4',
      timestamp: '2025-11-03 09:30:05',
      user: 'Sarah Williams',
      role: 'Employee',
      action: 'LOGIN',
      module: 'Authentication',
      details: 'User logged into the system',
      ipAddress: '192.168.1.103',
      status: 'success'
    },
    {
      id: '5',
      timestamp: '2025-11-03 09:12:23',
      user: 'David Brown',
      role: 'Finance Manager',
      action: 'DELETE',
      module: 'Payroll',
      details: 'Attempted to delete payroll record - Access Denied',
      ipAddress: '192.168.1.104',
      status: 'failed'
    },
    {
      id: '6',
      timestamp: '2025-11-03 08:55:41',
      user: 'Emily Davis',
      role: 'HR Admin',
      action: 'EXPORT',
      module: 'Reports',
      details: 'Exported employee attendance report for October 2025',
      ipAddress: '192.168.1.105',
      status: 'success'
    },
    {
      id: '7',
      timestamp: '2025-11-03 08:42:18',
      user: 'John Doe',
      role: 'HR Admin',
      action: 'UPDATE',
      module: 'Performance',
      details: 'Updated performance review for employee ID: EMP-2024-012',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: '8',
      timestamp: '2025-11-03 08:20:55',
      user: 'Jane Smith',
      role: 'Payroll Manager',
      action: 'CREATE',
      module: 'Payroll',
      details: 'Generated payroll for November 2025',
      ipAddress: '192.168.1.101',
      status: 'success'
    },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return '#7FBA00';
      case 'UPDATE': return '#00A4EF';
      case 'DELETE': return '#F25022';
      case 'APPROVE': return '#7FBA00';
      case 'REJECT': return '#F25022';
      case 'LOGIN': return '#737373';
      case 'EXPORT': return '#FFB900';
      default: return '#737373';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesModule = filterModule === 'all' || log.module === filterModule;
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesSearch = searchTerm === '' || 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesModule && matchesAction && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Chart data
  const activityChartData = [
    { name: 'Mon', actions: 145 },
    { name: 'Tue', actions: 189 },
    { name: 'Wed', actions: 234 },
    { name: 'Thu', actions: 198 },
    { name: 'Fri', actions: 267 },
    { name: 'Sat', actions: 89 },
    { name: 'Sun', actions: 123 },
  ];

  const actionTypeData = [
    { name: 'CREATE', value: 345, color: '#7FBA00' },
    { name: 'UPDATE', value: 456, color: '#00A4EF' },
    { name: 'DELETE', value: 78, color: '#F25022' },
    { name: 'APPROVE', value: 234, color: '#7FBA00' },
    { name: 'LOGIN', value: 567, color: '#737373' },
    { name: 'EXPORT', value: 132, color: '#FFB900' },
  ];

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setIsDetailsOpen(true);
  };

  const handleExport = () => {
    setIsExportOpen(true);
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'} min-h-screen`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Audit Trail
            </h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Track all system activities and user actions
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsFilterOpen(true)}
              variant="secondary"
              className={`${isDarkMode ? 'bg-[#2d2d2d] border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}
            >
              <FilterIcon size={16} className="mr-2" />
              Filter
            </Button>
            <Button
              onClick={() => setIsChartsOpen(true)}
              variant="secondary"
              className={`${isDarkMode ? 'bg-[#2d2d2d] border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}
            >
              <ChartIcon size={16} className="mr-2" />
              Analytics
            </Button>
            <Button
              onClick={handleExport}
              className="bg-[#0F172A] text-white hover:bg-[#1e293b]"
            >
              <DownloadIcon size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex items-start justify-between`}>
            <div>
              <div className="text-sm font-medium" style={{ color: '#00A4EF' }}>Total Actions</div>
              <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1,245</div>
            </div>
            <div className="p-3 rounded-sm" style={{ backgroundColor: '#E6F4FC' }}>
              <ChartIcon size={24} className="text-[#00A4EF]" />
            </div>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex items-start justify-between`}>
            <div>
              <div className="text-sm font-medium" style={{ color: '#7FBA00' }}>Successful</div>
              <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1,198</div>
            </div>
            <div className="p-3 rounded-sm" style={{ backgroundColor: '#F0F7E6' }}>
              <CheckCircleIcon size={24} className="text-[#7FBA00]" />
            </div>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex items-start justify-between`}>
            <div>
              <div className="text-sm font-medium" style={{ color: '#F25022' }}>Failed</div>
              <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>47</div>
            </div>
            <div className="p-3 rounded-sm" style={{ backgroundColor: '#FEEAE6' }}>
              <XCircleIcon size={24} className="text-[#F25022]" />
            </div>
          </div>
          <div className={`p-4 ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex items-start justify-between`}>
            <div>
              <div className="text-sm font-medium" style={{ color: '#FFB900' }}>Active Users</div>
              <div className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>32</div>
            </div>
            <div className="p-3 rounded-sm" style={{ backgroundColor: '#FFF6E6' }}>
              <UsersIcon size={24} className="text-[#FFB900]" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user or details..."
              className={`w-full pl-10 pr-3 py-2 border rounded-none ${isDarkMode ? 'bg-[#2d2d2d] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className={`${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'} border rounded-none ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Activity Log ({filteredLogs.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDarkMode ? 'bg-[#252525]' : 'bg-gray-100'}>
                <tr>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Timestamp</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>User</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Action</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Module</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Details</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>IP Address</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className={isDarkMode ? 'hover:bg-[#333]' : 'hover:bg-gray-50'}>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      <div className="flex items-center gap-2">
                        <ClockIcon size={16} className="text-gray-400" />
                        {log.timestamp}
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      <div className="flex items-center gap-2">
                        <UserIcon size={16} className="text-gray-400" />
                        {log.user}
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{log.role}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 rounded-none text-xs font-medium text-white" style={{ backgroundColor: getActionColor(log.action) }}>
                        {log.action}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{log.module}</td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{log.details}</td>
                    <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{log.ipAddress}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-none text-xs font-medium ${log.status === 'success' ? 'bg-[#7FBA00]' : 'bg-[#F25022]'} text-white`}>
                        {log.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleViewDetails(log)}
                        className={`${isDarkMode ? 'text-[#00A4EF] hover:text-[#0080c0]' : 'text-[#00A4EF] hover:text-[#0080c0]'}`}
                      >
                        <EyeIcon size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className={`px-4 py-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} entries
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded-none ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80`}
                >
                  <ChevronLeftIcon size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded-none ${
                      currentPage === page
                        ? 'bg-[#0F172A] text-white border-[#0F172A]'
                        : isDarkMode
                        ? 'bg-[#1a1a1a] border-gray-600 text-gray-300 hover:bg-[#2d2d2d]'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded-none ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80`}
                >
                  <ChevronRightIcon size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter Dialog */}
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogContent className={`${isDarkMode ? 'bg-[#2d2d2d]/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-none max-w-2xl rounded-sm`}>
            <DialogHeader>
              <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Filter Audit Logs</DialogTitle>
              <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Apply filters to narrow down the audit trail
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Module
                </label>
                <select
                  value={filterModule}
                  onChange={(e) => setFilterModule(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-none ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value="all">All Modules</option>
                  <option value="Employee Management">Employee Management</option>
                  <option value="Payroll">Payroll</option>
                  <option value="Leave Management">Leave Management</option>
                  <option value="Performance">Performance</option>
                  <option value="Authentication">Authentication</option>
                  <option value="Reports">Reports</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Action
                </label>
                <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-none ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value="all">All Actions</option>
                  <option value="CREATE">Create</option>
                  <option value="UPDATE">Update</option>
                  <option value="DELETE">Delete</option>
                  <option value="APPROVE">Approve</option>
                  <option value="LOGIN">Login</option>
                  <option value="EXPORT">Export</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Start Date
                </label>
                <input
                  type="date"
                  className={`w-full px-3 py-2 border rounded-sm ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  End Date
                </label>
                <input
                  type="date"
                  className={`w-full px-3 py-2 border rounded-none ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  User
                </label>
                <input
                  type="text"
                  placeholder="Enter user name..."
                  className={`w-full px-3 py-2 border rounded-none ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Status
                </label>
                <select
                  className={`w-full px-3 py-2 border rounded-none ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setIsFilterOpen(false)}
                variant="secondary"
                className={isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsFilterOpen(false)}
                className="bg-[#0F172A] text-white hover:bg-[#1e293b]"
              >
                Apply Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className={`${isDarkMode ? 'bg-[#2d2d2d]/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-none max-w-2xl rounded-sm`}>
            <DialogHeader>
              <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Audit Log Details</DialogTitle>
              <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Complete information about this audit entry
              </DialogDescription>
            </DialogHeader>
            {selectedLog && (
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Timestamp
                    </label>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedLog.timestamp}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      User
                    </label>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedLog.user}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Role
                    </label>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedLog.role}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Action
                    </label>
                    <span className="inline-block px-2 py-1 rounded-none text-xs font-medium text-white" style={{ backgroundColor: getActionColor(selectedLog.action) }}>
                      {selectedLog.action}
                    </span>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Module
                    </label>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedLog.module}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      IP Address
                    </label>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedLog.ipAddress}</p>
                  </div>
                  <div className="col-span-2">
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Details
                    </label>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedLog.details}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Status
                    </label>
                    <span className={`inline-block px-2 py-1 rounded-none text-xs font-medium ${selectedLog.status === 'success' ? 'bg-[#7FBA00]' : 'bg-[#F25022]'} text-white`}>
                      {selectedLog.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <Button
                onClick={() => setIsDetailsOpen(false)}
                className="bg-[#0F172A] text-white hover:bg-[#1e293b]"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Export Dialog */}
        <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
          <DialogContent className={`${isDarkMode ? 'bg-[#2d2d2d]/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-none max-w-md rounded-sm`}>
            <DialogHeader>
              <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Export Audit Logs</DialogTitle>
              <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Choose export format for audit trail data
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3">
              <button className={`w-full p-4 border rounded-none text-left ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 hover:border-gray-500' : 'bg-white border-gray-300 hover:border-gray-400'}`}>
                <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Export as CSV</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Download audit logs in CSV format</div>
              </button>
              <button className={`w-full p-4 border rounded-none text-left ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 hover:border-gray-500' : 'bg-white border-gray-300 hover:border-gray-400'}`}>
                <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Export as Excel</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Download audit logs in Excel format</div>
              </button>
              <button className={`w-full p-4 border rounded-none text-left ${isDarkMode ? 'bg-[#1a1a1a] border-gray-600 hover:border-gray-500' : 'bg-white border-gray-300 hover:border-gray-400'}`}>
                <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Export as PDF</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Download audit logs in PDF format</div>
              </button>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsExportOpen(false)}
                variant="secondary"
                className={isDarkMode ? 'bg-[#1a1a1a] border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Analytics/Charts Dialog */}
        <Dialog open={isChartsOpen} onOpenChange={setIsChartsOpen}>
          <DialogContent className={`${isDarkMode ? 'bg-[#2d2d2d]/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-none max-w-5xl rounded-sm`}>
            <DialogHeader>
              <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>Audit Analytics</DialogTitle>
              <DialogDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Visual analytics of system activities
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              {/* Activity Timeline */}
              <div>
                <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Weekly Activity Timeline
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={activityChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#444' : '#e5e7eb'} />
                    <XAxis dataKey="name" stroke={isDarkMode ? '#999' : '#666'} />
                    <YAxis stroke={isDarkMode ? '#999' : '#666'} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
                        border: `1px solid ${isDarkMode ? '#444' : '#e5e7eb'}`,
                        color: isDarkMode ? '#fff' : '#000'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="actions" stroke="#00A4EF" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Action Distribution */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Action Type Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={actionTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {actionTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
                          border: `1px solid ${isDarkMode ? '#444' : '#e5e7eb'}`,
                          color: isDarkMode ? '#fff' : '#000'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Actions by Type
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={actionTypeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#444' : '#e5e7eb'} />
                      <XAxis dataKey="name" stroke={isDarkMode ? '#999' : '#666'} />
                      <YAxis stroke={isDarkMode ? '#999' : '#666'} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
                          border: `1px solid ${isDarkMode ? '#444' : '#e5e7eb'}`,
                          color: isDarkMode ? '#fff' : '#000'
                        }}
                      />
                      <Bar dataKey="value" fill="#00A4EF" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsChartsOpen(false)}
                className="bg-[#0F172A] text-white hover:bg-[#1e293b]"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AuditTrail;
