import { useState } from 'react';
import { Button } from '@/components/Button';
import { useToast } from '@/components/ToastContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { Modal } from '@/components/Modal';
import { 
  PlusIcon, 
  EyeIcon, 
  DownloadIcon,
  XIcon,
  SaveIcon,
  CheckIcon,
  ClockIcon,
  FileIcon,
  TrendingUpIcon
} from '@/components/Icons';
import { Bar, Doughnut } from 'react-chartjs-2';

interface ExitRequest {
  id: number;
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  resignationDate: string;
  lastWorkingDay: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  noticePeriod: string;
  clearanceStatus: 'Pending' | 'In Progress' | 'Completed';
  exitType: 'Resignation' | 'Termination' | 'Retirement' | 'Contract End';
  clearanceItems?: {
    item: string;
    status: 'Pending' | 'Completed';
    completedBy?: string;
    completedDate?: string;
  }[];
}

export const ExitManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showClearanceModal, setShowClearanceModal] = useState(false);
  const [selectedExit, setSelectedExit] = useState<ExitRequest | null>(null);
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    department: '',
    position: '',
    resignationDate: '',
    lastWorkingDay: '',
    reason: '',
    noticePeriod: '30 days',
    exitType: 'Resignation' as const
  });
  const { addToast } = useToast();
  const { theme } = useTheme();

  const [exits, setExits] = useState<ExitRequest[]>([
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      position: 'Senior Developer',
      resignationDate: '2025-10-15',
      lastWorkingDay: '2025-11-15',
      reason: 'Career Advancement',
      status: 'Approved',
      noticePeriod: '30 days',
      clearanceStatus: 'In Progress',
      exitType: 'Resignation',
      clearanceItems: [
        { item: 'IT Equipment Return', status: 'Completed', completedBy: 'IT Dept', completedDate: '2025-11-10' },
        { item: 'Office Keys', status: 'Completed', completedBy: 'Admin', completedDate: '2025-11-10' },
        { item: 'Final Payroll', status: 'Pending' },
        { item: 'Exit Interview', status: 'Pending' },
        { item: 'Knowledge Transfer', status: 'Completed', completedBy: 'Manager', completedDate: '2025-11-08' }
      ]
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP025',
      department: 'Marketing',
      position: 'Marketing Manager',
      resignationDate: '2025-10-20',
      lastWorkingDay: '2025-11-20',
      reason: 'Personal Reasons',
      status: 'Pending',
      noticePeriod: '30 days',
      clearanceStatus: 'Pending',
      exitType: 'Resignation',
      clearanceItems: [
        { item: 'IT Equipment Return', status: 'Pending' },
        { item: 'Office Keys', status: 'Pending' },
        { item: 'Final Payroll', status: 'Pending' },
        { item: 'Exit Interview', status: 'Pending' },
        { item: 'Knowledge Transfer', status: 'Pending' }
      ]
    },
    {
      id: 3,
      employeeName: 'Mike Williams',
      employeeId: 'EMP042',
      department: 'Sales',
      position: 'Sales Executive',
      resignationDate: '2025-09-10',
      lastWorkingDay: '2025-10-10',
      reason: 'Relocation',
      status: 'Completed',
      noticePeriod: '30 days',
      clearanceStatus: 'Completed',
      exitType: 'Resignation',
      clearanceItems: [
        { item: 'IT Equipment Return', status: 'Completed', completedBy: 'IT Dept', completedDate: '2025-10-10' },
        { item: 'Office Keys', status: 'Completed', completedBy: 'Admin', completedDate: '2025-10-10' },
        { item: 'Final Payroll', status: 'Completed', completedBy: 'Finance', completedDate: '2025-10-12' },
        { item: 'Exit Interview', status: 'Completed', completedBy: 'HR', completedDate: '2025-10-09' },
        { item: 'Knowledge Transfer', status: 'Completed', completedBy: 'Manager', completedDate: '2025-10-08' }
      ]
    },
    {
      id: 4,
      employeeName: 'Emily Chen',
      employeeId: 'EMP018',
      department: 'Finance',
      position: 'Accountant',
      resignationDate: '2025-10-25',
      lastWorkingDay: '2025-11-25',
      reason: 'Better Opportunity',
      status: 'Approved',
      noticePeriod: '30 days',
      clearanceStatus: 'In Progress',
      exitType: 'Resignation',
      clearanceItems: [
        { item: 'IT Equipment Return', status: 'Completed', completedBy: 'IT Dept', completedDate: '2025-11-12' },
        { item: 'Office Keys', status: 'Pending' },
        { item: 'Final Payroll', status: 'Pending' },
        { item: 'Exit Interview', status: 'Pending' },
        { item: 'Knowledge Transfer', status: 'Pending' }
      ]
    }
  ]);

  const handleAdd = () => {
    setFormData({
      employeeName: '',
      employeeId: '',
      department: '',
      position: '',
      resignationDate: '',
      lastWorkingDay: '',
      reason: '',
      noticePeriod: '30 days',
      exitType: 'Resignation'
    });
    setShowModal(true);
  };

  const handleViewDetails = (exit: ExitRequest) => {
    setSelectedExit(exit);
    setShowDetailsModal(true);
  };

  const handleViewClearance = (exit: ExitRequest) => {
    setSelectedExit(exit);
    setShowClearanceModal(true);
  };

  const handleSubmit = () => {
    if (!formData.employeeName || !formData.employeeId || !formData.resignationDate || !formData.lastWorkingDay) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    const newExit: ExitRequest = {
      id: exits.length + 1,
      ...formData,
      status: 'Pending',
      clearanceStatus: 'Pending',
      clearanceItems: [
        { item: 'IT Equipment Return', status: 'Pending' },
        { item: 'Office Keys', status: 'Pending' },
        { item: 'Final Payroll', status: 'Pending' },
        { item: 'Exit Interview', status: 'Pending' },
        { item: 'Knowledge Transfer', status: 'Pending' }
      ]
    };
    setExits([newExit, ...exits]);
    addToast('Exit request created successfully', 'success');
    setShowModal(false);
  };

  const handleStatusUpdate = (id: number, status: ExitRequest['status']) => {
    setExits(exits.map(e => e.id === id ? { ...e, status } : e));
    addToast(`Exit status updated to ${status}`, 'success');
  };

  const handleClearanceItemUpdate = (exitId: number, itemIndex: number, status: 'Pending' | 'Completed') => {
    setExits(exits.map(exit => {
      if (exit.id === exitId && exit.clearanceItems) {
        const updatedItems = [...exit.clearanceItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          status,
          ...(status === 'Completed' ? {
            completedBy: 'HR Dept',
            completedDate: new Date().toISOString().split('T')[0]
          } : {})
        };
        const allCompleted = updatedItems.every(item => item.status === 'Completed');
        return {
          ...exit,
          clearanceItems: updatedItems,
          clearanceStatus: allCompleted ? ('Completed' as const) : ('In Progress' as const)
        };
      }
      return exit;
    }));
    addToast('Clearance item updated', 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-[#7FBA00]/20 text-[#7FBA00] border-[#7FBA00]/30';
      case 'Approved': return 'bg-[#00A4EF]/20 text-[#00A4EF] border-[#00A4EF]/30';
      case 'Pending': return 'bg-[#FFB900]/20 text-[#FFB900] border-[#FFB900]/30';
      case 'In Progress': return 'bg-[#00A4EF]/20 text-[#00A4EF] border-[#00A4EF]/30';
      case 'Cancelled': return 'bg-[#F25022]/20 text-[#F25022] border-[#F25022]/30';
      default: return 'bg-gray-200 text-gray-700 border-gray-300';
    }
  };

  const getExitTypeColor = (type: string) => {
    switch (type) {
      case 'Resignation': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
      case 'Termination': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      case 'Retirement': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800';
      case 'Contract End': return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
      default: return 'bg-gray-200 text-gray-700 border-gray-300';
    }
  };

  const stats = {
    total: exits.length,
    pending: exits.filter(e => e.status === 'Pending').length,
    approved: exits.filter(e => e.status === 'Approved').length,
    completed: exits.filter(e => e.status === 'Completed').length,
    clearancePending: exits.filter(e => e.clearanceStatus === 'Pending').length,
    clearanceInProgress: exits.filter(e => e.clearanceStatus === 'In Progress').length
  };

  const exitReasonData = {
    labels: ['Career Advancement', 'Personal Reasons', 'Relocation', 'Better Opportunity', 'Other'],
    datasets: [{
      label: 'Number of Exits',
      data: [1, 1, 1, 1, 0],
      backgroundColor: theme === 'dark' 
        ? ['#00A4EF80', '#7FBA0080', '#FFB90080', '#F2502280', '#73737380']
        : ['#00A4EF', '#7FBA00', '#FFB900', '#F25022', '#737373'],
      borderColor: theme === 'dark'
        ? ['#00A4EF', '#7FBA00', '#FFB900', '#F25022', '#737373']
        : ['#0078D4', '#5A9000', '#D39600', '#D13A13', '#5C5C5C'],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#E5E7EB'
        }
      },
      x: {
        ticks: {
          color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
        },
        grid: {
          display: false
        }
      }
    }
  };

  const exitStatusData = {
    labels: ['Completed', 'Approved', 'Pending', 'Cancelled'],
    datasets: [{
      data: [stats.completed, stats.approved, stats.pending, 0],
      backgroundColor: theme === 'dark'
        ? ['#7FBA0080', '#00A4EF80', '#FFB90080', '#F2502280']
        : ['#7FBA00', '#00A4EF', '#FFB900', '#F25022'],
      borderColor: theme === 'dark'
        ? ['#7FBA00', '#00A4EF', '#FFB900', '#F25022']
        : ['#5A9000', '#0078D4', '#D39600', '#D13A13'],
      borderWidth: 1
    }]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
          padding: 15,
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A4EF] to-[#0078D4] bg-clip-text text-transparent">
              Exit Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage employee exits and clearances</p>
          </div>
          <Button variant="primary" size="lg" onClick={handleAdd} className="flex items-center">
            <PlusIcon size={20} className="mr-2" />
            <span>New Exit Request</span>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Exits</h3>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">All time</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#F25022] to-[#D13A13] flex items-center justify-center">
                <TrendingUpIcon size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Pending Approval</h3>
                <span className="text-2xl font-bold text-[#FFB900]">{stats.pending}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Needs review</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#FFB900] to-[#D39600] flex items-center justify-center">
                <ClockIcon size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">In Progress</h3>
                <span className="text-2xl font-bold text-[#00A4EF]">{stats.approved}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Active clearances</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#00A4EF] to-[#0078D4] flex items-center justify-center">
                <FileIcon size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Completed</h3>
                <span className="text-2xl font-bold text-[#7FBA00]">{stats.completed}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Successfully exited</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#7FBA00] to-[#5A9000] flex items-center justify-center">
                <CheckIcon size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Exit Reasons</h3>
            <div className="h-64">
              <Bar data={exitReasonData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Exit Status Distribution</h3>
            <div className="h-64">
              <Doughnut data={exitStatusData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Exit Requests Table */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Exit Requests</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Exit Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Last Working Day</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Clearance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {exits.map((exit) => (
                  <tr key={exit.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{exit.employeeName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{exit.employeeId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{exit.department}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{exit.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium border ${getExitTypeColor(exit.exitType)}`}>
                        {exit.exitType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{exit.lastWorkingDay}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium border ${getStatusColor(exit.status)}`}>
                        {exit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium border ${getStatusColor(exit.clearanceStatus)}`}>
                        {exit.clearanceStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(exit)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#00A4EF] bg-[#00A4EF]/10 hover:bg-[#00A4EF]/20 border border-[#00A4EF]/30 transition-colors"
                        >
                          <EyeIcon size={14} />
                          <span>Details</span>
                        </button>
                        <button
                          onClick={() => handleViewClearance(exit)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7FBA00] bg-[#7FBA00]/10 hover:bg-[#7FBA00]/20 border border-[#7FBA00]/30 transition-colors"
                        >
                          <FileIcon size={14} />
                          <span>Clearance</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Exit Request" size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Employee Name</label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                  placeholder="Enter employee name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Employee ID</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                  placeholder="Enter employee ID"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                  placeholder="Enter department"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                  placeholder="Enter position"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Exit Type</label>
                <select
                  value={formData.exitType}
                  onChange={(e) => setFormData({ ...formData, exitType: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                >
                  <option value="Resignation">Resignation</option>
                  <option value="Termination">Termination</option>
                  <option value="Retirement">Retirement</option>
                  <option value="Contract End">Contract End</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notice Period</label>
                <select
                  value={formData.noticePeriod}
                  onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                >
                  <option value="15 days">15 days</option>
                  <option value="30 days">30 days</option>
                  <option value="60 days">60 days</option>
                  <option value="90 days">90 days</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resignation Date</label>
                <input
                  type="date"
                  value={formData.resignationDate}
                  onChange={(e) => setFormData({ ...formData, resignationDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Working Day</label>
                <input
                  type="date"
                  value={formData.lastWorkingDay}
                  onChange={(e) => setFormData({ ...formData, lastWorkingDay: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason for Leaving</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
                placeholder="Enter reason for leaving"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit} className="flex items-center">
                <SaveIcon size={16} className="mr-2" />
                <span>Create Exit Request</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedExit && (
        <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} title="Exit Request Details" size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Employee Name</div>
                <div className="text-gray-900 dark:text-white font-medium">{selectedExit.employeeName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Employee ID</div>
                <div className="text-gray-900 dark:text-white font-medium">{selectedExit.employeeId}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Department</div>
                <div className="text-gray-900 dark:text-white">{selectedExit.department}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Position</div>
                <div className="text-gray-900 dark:text-white">{selectedExit.position}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Exit Type</div>
                <span className={`inline-block px-3 py-1 text-xs font-medium border ${getExitTypeColor(selectedExit.exitType)}`}>
                  {selectedExit.exitType}
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Notice Period</div>
                <div className="text-gray-900 dark:text-white">{selectedExit.noticePeriod}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Resignation Date</div>
                <div className="text-gray-900 dark:text-white">{selectedExit.resignationDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Last Working Day</div>
                <div className="text-gray-900 dark:text-white">{selectedExit.lastWorkingDay}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Status</div>
                <span className={`inline-block px-3 py-1 text-xs font-medium border ${getStatusColor(selectedExit.status)}`}>
                  {selectedExit.status}
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Clearance Status</div>
                <span className={`inline-block px-3 py-1 text-xs font-medium border ${getStatusColor(selectedExit.clearanceStatus)}`}>
                  {selectedExit.clearanceStatus}
                </span>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Reason for Leaving</div>
              <div className="text-gray-900 dark:text-white">{selectedExit.reason}</div>
            </div>

            {selectedExit.status === 'Pending' && (
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleStatusUpdate(selectedExit.id, 'Approved')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#7FBA00] hover:bg-[#5A9000] border border-[#7FBA00] transition-colors"
                >
                  <CheckIcon size={16} />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedExit.id, 'Cancelled')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#F25022] hover:bg-[#D13A13] border border-[#F25022] transition-colors"
                >
                  <XIcon size={16} />
                  <span>Reject</span>
                </button>
              </div>
            )}

            <div className="flex items-center gap-3 pt-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#00A4EF] hover:bg-[#0078D4] border border-[#00A4EF] transition-colors">
                <DownloadIcon size={16} />
                <span>Export Details</span>
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Clearance Modal */}
      {showClearanceModal && selectedExit && (
        <Modal isOpen={showClearanceModal} onClose={() => setShowClearanceModal(false)} title="Exit Clearance Checklist" size="lg">
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-sm p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{selectedExit.employeeName}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedExit.employeeId} - {selectedExit.department}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium border ${getStatusColor(selectedExit.clearanceStatus)}`}>
                  {selectedExit.clearanceStatus}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {selectedExit.clearanceItems?.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-sm border border-gray-200 dark:border-gray-600">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 border-2 flex items-center justify-center flex-shrink-0 ${
                        item.status === 'Completed' 
                          ? 'bg-[#7FBA00] border-[#7FBA00]' 
                          : 'bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500'
                      }`}>
                        {item.status === 'Completed' && <CheckIcon size={14} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{item.item}</div>
                        {item.status === 'Completed' && item.completedBy && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Completed by {item.completedBy} on {item.completedDate}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {item.status === 'Pending' && (
                    <button
                      onClick={() => handleClearanceItemUpdate(selectedExit.id, index, 'Completed')}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#7FBA00] hover:bg-[#5A9000] border border-[#7FBA00] transition-colors flex-shrink-0 ml-4"
                    >
                      <CheckIcon size={14} />
                      <span>Mark Complete</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#00A4EF] hover:bg-[#0078D4] border border-[#00A4EF] transition-colors">
                <DownloadIcon size={16} />
                <span>Export Clearance Form</span>
              </button>
              <button
                onClick={() => setShowClearanceModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ExitManagement;
